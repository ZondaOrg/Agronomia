# SGA-273 — Backend

## Feature `quote` (nueva, sin persistencia)

```
Domain:
class Quote
/*
	PROPÓSITO: Crea una cotización con los datos del producto y la selección del usuario.
	PRECONDICIÓN:
		- Si el precio de lista, el IVA, el flete o algún precio de opcional es negativo, se lanza NegativeAmountException.
		- Si la cantidad es menor que 1, se lanza InvalidQuantityException.
*/
Quote(BigDecimal listPrice, BigDecimal ivaRate, BigDecimal freight, List<BigDecimal> optionalPrices, Integer quantity)

/*
	PROPÓSITO: Describe el precio completo redondeado hacia arriba al entero (RoundingMode.CEILING):
		quantity × ((listPrice + Σ optionalPrices) × (1 + ivaRate) + freight)
	El flete no recibe IVA. El redondeo se aplica una única vez sobre el total de todas las unidades.
*/
BigDecimal getTotal()

Service:
interface QuoteService
/*
	PROPÓSITO: Describe la cotización del producto para la selección dada.
	PRECONDICIÓN:
		- Si el producto no existe, se lanza EntityNotFoundException.
		- Si algún id de opcional no pertenece al producto, se lanza InvalidOptionalException.
		- Si la cantidad es menor que 1, se lanza InvalidQuantityException en la capa de dominio.
*/
Quote calculate(Long productId, Integer quantity, List<Long> optionalIds, boolean includeFreight)

Controller:
/*
	PROPÓSITO: Describe el precio completo de la selección del usuario.
	PRECONDICIÓN:
		- Si el request es inválido, se responde 400 (ErrorResponse[]).
		- Si algún opcional no pertenece al producto o está repetido, se responde 400 (BuisnessErrorResponse).
		- Si el producto no existe, se responde 404.
*/
@PostMapping(Api.QUOTE + "/calculate")
@VendedorOrOwnerEndpoint
ResponseEntity<CalculateQuoteResponse> calculate(@Valid CalculateQuoteRequest request)

Dto:
dtos/calculate/request:
record CalculateQuoteRequest(
	@NotNull Long productId,
	@NotNull @Positive Integer quantity,
	@NotNull List<Long> optionalIds,
	@NotNull Boolean includeFreight
)
dtos/calculate/response:
record CalculateQuoteResponse(BigDecimal total)
CalculateQuoteMapper:
	CalculateQuoteResponse toResponse(Quote quote)

ExceptionHandlers:
	NegativeAmountException -> 400
	InvalidQuantityException -> 400
	InvalidOptionalException -> 400
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
Domain:
enum IVA { GENERAL, REDUCIDA }
/*
	PROPÓSITO: Describe la fracción del IVA (GENERAL → 0.21, REDUCIDA → 0.105).
*/
BigDecimal rate()

Contracts:
interface ProductQuoteDataService
/*
	PROPÓSITO: Describe el precio de lista, la fracción de IVA, el flete y los precios de los opcionales del producto cuyos ids están en la lista dada.
		Los ids que no pertenecen al producto no se incluyen; los repetidos se incluyen una sola vez.
	PRECONDICIÓN: Si el producto no existe, se lanza EntityNotFoundException.
*/
ProductQuoteData findForQuote(Long productId, List<Long> optionalIds)

record ProductQuoteData(BigDecimal listPrice, BigDecimal ivaRate, BigDecimal freight, List<BigDecimal> optionalPrices)

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
- Fórmula directa en `Quote.getTotal()`: un único endpoint recibe la selección completa vigente y siempre aplica el mismo cálculo. `Quote` es inmutable, usa `BigDecimal` para conservar precisión y redondea con `CEILING` solo al final.
- `QuoteServiceImpl` obtiene los datos con el contrato `ProductQuoteDataService` (no depende del dominio de `product`). El flag `includeFreight` se resuelve en el servicio: si es `false`, construye `Quote` con `freight = BigDecimal.ZERO`; `Quote` no conoce el flag. Si la cantidad de `optionalPrices` devueltos difiere de `optionalIds.size()`, algún id es ajeno al producto o está repetido → `InvalidOptionalException`.
- `ProductQuoteDataServiceImpl` (en `product`) reutiliza `ProductService.findByIdWithinOptionals` y filtra `product.getOptionals()` por id. Convierte `Double` a `BigDecimal` con `BigDecimal.valueOf`.
- La pertenencia del producto al proveedor no se valida en el cálculo: la garantiza la cadena de filtros del frontend (los productos se buscan por proveedor).
- `searchByProvider` valida la existencia del proveedor con `ProviderDataService.existProvider`, igual que `ProductServiceImpl.add`.
- `ProviderService.search` obtiene la compañía con `UserDataService`, igual que `getProviders`.
- `QuoteProductResponse.optionals` reutiliza `OptionalResponseDTO(id, name, price)` de `feature/product/dtos` (misma feature). La moneda de los opcionales es la del producto. Sin opcionales se devuelve `[]`; los opcionales se cargan con `findByIdWithinOptionals`.
- Agregar `Api.QUOTE = MAIN_NAME + V + "/quote"` en `core/api/Api`.

## Shared Dependencies
- annotations: `@VendedorOrOwnerEndpoint`
- dto de error: `ErrorResponse`
- manejo global de `EntityNotFoundException` (404) y de validación (400) en `core/handlers`
