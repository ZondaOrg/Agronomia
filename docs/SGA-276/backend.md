# SGA-276 — Backend

## Feature `quote` (existente)

```
Domain:
interface TotalStrategy
/*
	PROPÓSITO: Describe el monto resultante de aplicar la estrategia al total en dólares sin redondear.
*/
BigDecimal convert(BigDecimal usdTotal)

class NetPriceStrategy implements TotalStrategy
/*
	PROPÓSITO: Describe el total en dólares sin conversión (devuelve el mismo valor).
*/
BigDecimal convert(BigDecimal usdTotal)

class UsdToArsStrategy implements TotalStrategy
/*
	PROPÓSITO: Crea la estrategia de conversión de dólares a pesos con el dólar oficial dado.
	PRECONDICIÓN: Si el dólar es menor o igual a cero, se lanza NegativeAmountException.
*/
UsdToArsStrategy(BigDecimal dolarPrice)
/*
	PROPÓSITO: Describe el total en pesos (usdTotal × dolarPrice).
*/
BigDecimal convert(BigDecimal usdTotal)

class Quote (se modifica)
/*
	PROPÓSITO: Establece la estrategia con la que se calcula el total. Por defecto, NetPriceStrategy.
*/
void setStrategy(TotalStrategy strategy)

/*
	PROPÓSITO: Describe el total redondeado hacia arriba al entero (RoundingMode.CEILING) una única vez.
	Delega en la estrategia vigente la conversión del total en dólares sin redondear.
	El total en pesos nunca se calcula a partir del total en dólares ya redondeado.
	La firma no cambia; con NetPriceStrategy el resultado es el actual.
*/
BigDecimal getTotal()

/*
	PROPÓSITO: Describe el precio de lista convertido a pesos con el dólar oficial dado.
	PRECONDICIÓN: Si el dólar es menor o igual a cero, se lanza NegativeAmountException.
*/
BigDecimal toArs(BigDecimal dolarPrice)

class NotDolarPrice (se modifica)
/*
	PROPÓSITO: Describe el total en dólares de la cotización que no pudo convertirse.
*/
BigDecimal getTotal()

Service:
interface DolarPriceService
/*
	PROPÓSITO: Describe el dólar oficial. Si el valor está en la caché (expira a los 30 minutos) lo devuelve sin consultar el servicio externo.
	PRECONDICIÓN: Si falla la petición al servicio externo (RestClientException y sus subclases
	HttpClientErrorException, HttpServerErrorException, ResourceAccessException), se lanza NotDolarPrice con el total en dólares de la cotización.
*/
BigDecimal get(Quote quote)
// @Cacheable(cacheNames = CacheConfig.DOLAR_OFICIAL, key = "'oficial'", sync = true)
// La clave es constante: el dólar oficial es un único valor global (hoy la clave es el Quote, por lo que nunca acierta).

interface QuoteService
// Sin cambios: Quote calculate(Long productId, Integer quantity, List<Long> optionalIds, boolean includeFreight)

Controller:
/*
	PROPÓSITO: Describe los totales en pesos y en dólares de la selección, con el dólar oficial obtenido del servicio externo.
	PRECONDICIÓN:
		- Si el request es inválido, se responde 400 (ErrorResponse[]).
		- Si algún opcional no pertenece al producto o está repetido, se responde 400 (BuisnessErrorResponse).
		- Si el producto no existe, se responde 404.
		- Si falla el servicio externo del dólar, se lanza NotDolarPrice (atrapada por NotDolarPriceHandler).
*/
@PostMapping(Api.QUOTE + "/calculate-ars")
@VendedorOrOwnerEndpoint
ResponseEntity<CalculateArsResponse> calculateArs(@Valid CalculateArsRequest request)

/*
	PROPÓSITO: Describe los totales en pesos y en dólares de la selección, con el dólar ingresado manualmente.
	PRECONDICIÓN:
		- Si el request es inválido o dolarPrice es menor o igual a cero, se responde 400 (ErrorResponse[]).
		- Si algún opcional no pertenece al producto o está repetido, se responde 400 (BuisnessErrorResponse).
		- Si el producto no existe, se responde 404.
*/
@PostMapping(Api.QUOTE + "/calculate-ars/manual")
@VendedorOrOwnerEndpoint
ResponseEntity<CalculateArsManualResponse> calculateArsManual(@Valid CalculateArsManualRequest request)

Dto:
dtos/calculateArs/request:
record CalculateArsRequest(
	@NotNull Long productId,
	@NotNull @Positive Integer quantity,
	@NotNull List<Long> optionalIds,
	@NotNull Boolean includeFreight
)
dtos/calculateArs/response:
record CalculateArsResponse(BigDecimal totalArs, BigDecimal totalUsd, BigDecimal dolarPrice, BigDecimal listPriceArs)
CalculateArsMapper:
	CalculateArsResponse toResponse(BigDecimal totalArs, BigDecimal totalUsd, BigDecimal dolarPrice, BigDecimal listPriceArs)

dtos/calculateArsManual/request:
record CalculateArsManualRequest(
	@NotNull Long productId,
	@NotNull @Positive Integer quantity,
	@NotNull List<Long> optionalIds,
	@NotNull Boolean includeFreight,
	@NotNull @Positive BigDecimal dolarPrice
)
dtos/calculateArsManual/response:
record CalculateArsManualResponse(BigDecimal totalArs, BigDecimal totalUsd, BigDecimal dolarPrice, BigDecimal listPriceArs)
CalculateArsManualMapper:
	CalculateArsManualResponse toResponse(BigDecimal totalArs, BigDecimal totalUsd, BigDecimal dolarPrice, BigDecimal listPriceArs)

ExceptionHandlers:
	NotDolarPrice -> 206 con CalculateQuoteResponse(total) (mismo cuerpo que calculate), NotDolarPriceHandler en exceptionHandlers/

Design:
Strategy pattern en Quote (la estrategia se setea en Quote y getTotal() delega en ella):
	TotalStrategy (interfaz)
	├── NetPriceStrategy
	└── UsdToArsStrategy(dolarPrice)
	Quote -> TotalStrategy (campo seteado con setStrategy)
Flujo del controller: quote = quoteService.calculate(...); dolar = dolarPriceService.get(quote) (solo en calculate-ars);
	quote.setStrategy(new NetPriceStrategy()); totalUsd = quote.getTotal();
	quote.setStrategy(new UsdToArsStrategy(dolar)); totalArs = quote.getTotal();
	listPriceArs = quote.toArs(dolar).
Ejemplo: 3 u × 100 USD, IVA 10,5 %, flete 10 USD, dólar 1.000 → sin redondear 361,50 USD → totalUsd 362, totalArs 361.500.
Ejemplo: 108,01 USD sin redondear, dólar 1.000 → totalUsd 109, totalArs 108.010.

Shared Dependencies:
	Ninguna nueva. Se reutilizan Api.QUOTE, @VendedorOrOwnerEndpoint, BuisnessHandlerException, NegativeAmountException.
```
