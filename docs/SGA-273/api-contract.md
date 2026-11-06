# SGA-273 — API Contract

Todos los endpoints requieren rol DUENIO o VENDEDOR (`@VendedorOrOwnerEndpoint`).

```
url: api/v1/provider/search [search]
verb: GET
response: 200
[
	{
		id: number
		name: string        // tradeName
	}
]
errors:
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
> Busca los proveedores de la compañía del usuario cuyo `tradeName` o `legalName` coincide con `search`. Sin paginación.

```
url: api/v1/product/provider/{providerId}/search [search]
verb: GET
response: 200
[
	{
		id: number
		name: string
	}
]
errors:
	404: BuisnessErrorResponse
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
> Busca los productos del proveedor cuyo nombre coincide con `search`. Sin paginación. 404 si el proveedor no existe.

```
url: api/v1/product/{productId}/quote
verb: GET
response: 200
{
	id: number
	name: string
	money: "ARS" | "USD"
	listPrice: number
	iva: "GENERAL" | "REDUCIDA"
	freight: number          // 0 = sin flete informado
	optionals: [             // [] = sin opcionales
		{
			id: number
			name: string
			price: number    // en la moneda del producto
		}
	]
}
errors:
	404: BuisnessErrorResponse
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```

```
url: api/v1/quote/calculate
verb: POST
request:
{
	amount: number
	operation: "SUM" | "MULTIPLY"
	operand: number
}
response: 200
{
	amount: number      // monto preciso, se usa para seguir encadenando operaciones
	total: number       // monto redondeado hacia arriba al entero, se muestra
}
errors:
	400: ErrorResponse[]
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```

```
ErrorResponse { field: string, message: string }
BuisnessErrorResponse { title: string, message: string, path: string, id: string, timestamp: Date }
```
