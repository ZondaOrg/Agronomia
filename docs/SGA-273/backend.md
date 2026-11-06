# SGA-273 — Backend

## Feature `quote` (nueva, sin persistencia)

```
Domain:
class Quote
/*
	PROPÓSITO: Crea una cotización con el monto dado.
	PRECONDICIÓN: Si el monto es nulo o negativo, se lanza NegativeAmountException.
*/
Quote(BigDecimal amount)

/*
	PROPÓSITO: Describe la cotización resultante de aplicar la operación con el operando dado sobre el monto actual, sin redondear.
	PRECONDICIÓN: Si el operando es nulo o negativo, se lanza NegativeAmountException.
*/
Quote apply(Operation operation, BigDecimal operand)

/*
	PROPÓSITO: Describe el monto preciso de la cotización.
*/
BigDecimal getAmount()

/*
	PROPÓSITO: Describe el monto de la cotización redondeado hacia arriba al entero (RoundingMode.CEILING).
*/
BigDecimal getTotal()

enum Operation { SUM, MULTIPLY }
/*
	PROPÓSITO: Describe el resultado de operar el monto con el operando según la operación.
*/
abstract BigDecimal apply(BigDecimal amount, BigDecimal operand)

Service:
interface QuoteService
/*
	PROPÓSITO: Describe la cotización resultante de aplicar la operación con el operando dado.
	PRECONDICIÓN: Si el operando es negativo, se lanza excepción.
*/
Quote calculate(Quote quote, Operation operation, BigDecimal operand)

Controller:
/*
	PROPÓSITO: Describe el monto preciso y el total redondeado tras aplicar la operación.
	PRECONDICIÓN: Si el monto, la operación o el operando son inválidos, se responde 400.
*/
@PostMapping(Api.QUOTE + "/calculate")
@VendedorOrOwnerEndpoint
ResponseEntity<CalculateQuoteResponse> calculate(CalculateQuoteRequest request)

Dto:
dtos/calculate/request:
record CalculateQuoteRequest(
	@NotNull @PositiveOrZero BigDecimal amount,
	@NotNull Operation operation,
	@NotNull @PositiveOrZero BigDecimal operand
)
dtos/calculate/response:
record CalculateQuoteResponse(BigDecimal amount, BigDecimal total)
CalculateQuoteMapper:
	Quote toModel(CalculateQuoteRequest request)
	CalculateQuoteResponse toResponse(Quote quote)

ExceptionHandlers:
	NegativeAmountException -> 400
```

## Feature `provider`

```
Persistence:
interface ProviderDAO extends JpaRepository<Provider, Long>
/*
	PROPÓSITO: Describe los proveedores de la compañía cuyo tradeName o legalName contiene el criterio dado (sin distinguir mayúsculas), ordenados por tradeName.
*/
List<Provider> searchAllByCompanyId(Long companyId, String search)

Service:
/*
	PROPÓSITO: Describe los proveedores de la compañía del usuario que coinciden con el criterio de búsqueda.
	PRECONDICIÓN: Si el usuario no existe, se lanza excepción.
*/
List<Provider> search(Long userId, String search)

Controller:
/*
	PROPÓSITO: Describe los proveedores de la compañía del usuario que coinciden con el criterio de búsqueda.
*/
@GetMapping("/search")
@VendedorOrOwnerEndpoint
ResponseEntity<List<SearchProviderResponse>> search(@RequestAttribute Long userId, @RequestParam(defaultValue = "") String search)

Dto:
dtos/search/response:
record SearchProviderResponse(Long id, String name)
SearchProviderMapper:
	SearchProviderResponse toResponse(Provider provider)     // name = tradeName
	List<SearchProviderResponse> toResponses(List<Provider> providers)
```

## Feature `product`

```
Persistence:
interface ProductDAO extends JpaRepository<Product, Long>
/*
	PROPÓSITO: Describe los productos del proveedor cuyo nombre contiene el criterio dado (sin distinguir mayúsculas), ordenados por nombre.
*/
List<Product> searchAllByProvider(Long providerId, String search)

Service:
/*
	PROPÓSITO: Describe los productos del proveedor que coinciden con el criterio de búsqueda.
	PRECONDICIÓN: Si el proveedor no existe, se lanza EntityNotFoundException.
*/
List<Product> searchByProvider(Long providerId, String search)

/*
	(Existente, se reutiliza)
	PROPÓSITO: Describe el producto con el id dado.
	PRECONDICIÓN: Si el producto no existe, se lanza EntityNotFoundException.
*/
Product findByIdWithinOptionals(Long id)

Controller:
/*
	PROPÓSITO: Describe los productos del proveedor que coinciden con el criterio de búsqueda.
	PRECONDICIÓN: Si el proveedor no existe, se responde 404.
*/
@GetMapping("/provider/{providerId}/search")
@VendedorOrOwnerEndpoint
ResponseEntity<List<SearchProductResponse>> search(@PathVariable Long providerId, @RequestParam(defaultValue = "") String search)

/*
	PROPÓSITO: Describe los datos del producto necesarios para cotizarlo.
	PRECONDICIÓN: Si el producto no existe, se responde 404.
*/
@GetMapping("/{productId}/quote")
@VendedorOrOwnerEndpoint
ResponseEntity<QuoteProductResponse> getForQuote(@PathVariable Long productId)

Dto:
dtos/search/response:
record SearchProductResponse(Long id, String name)
SearchProductMapper:
	SearchProductResponse toResponse(Product product)
	List<SearchProductResponse> toResponses(List<Product> products)

dtos/quote/response:
record QuoteProductResponse(Long id, String name, Money money, Double listPrice, IVA iva, Double freight, List<OptionalResponseDTO> optionals)
QuoteProductMapper:
	QuoteProductResponse toResponse(Product product)
	OptionalResponseDTO toOptionalResponse(Optional optional)
```

## Desing
- Strategy pattern en `Operation`: enum cuyas constantes `SUM` y `MULTIPLY` implementan `apply(BigDecimal, BigDecimal)`. `Quote.apply` delega en la operación. Agregar una operación (por ejemplo, para opcionales) implica agregar una constante.
- `Quote` es inmutable: `apply` devuelve una nueva cotización. Usa `BigDecimal` para conservar precisión; el redondeo hacia arriba se hace solo en `getTotal()`.
- La pertenencia del producto al proveedor no se valida en el cálculo: la garantiza la cadena de filtros del frontend (los productos se buscan por proveedor).
- `searchByProvider` valida la existencia del proveedor con `ProviderDataService.existProvider`, igual que `ProductServiceImpl.add`.
- `ProviderService.search` obtiene la compañía con `UserDataService`, igual que `getProviders`.
- `QuoteProductResponse.optionals` reutiliza `OptionalResponseDTO(id, name, price)` de `feature/product/dtos` (misma feature). La moneda de los opcionales es la del producto. Sin opcionales se devuelve `[]`; los opcionales se cargan con `findByIdWithinOptionals`.
- Agregar `Api.QUOTE = MAIN_NAME + V + "/quote"` en `core/api/Api`.

## Shared Dependencies
- annotations: `@VendedorOrOwnerEndpoint`
- dto de error: `ErrorResponse`
- manejo global de `EntityNotFoundException` (404) y de validación (400) en `core/handlers`
