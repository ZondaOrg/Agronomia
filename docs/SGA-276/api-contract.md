# SGA-276 — API Contract

Todos los endpoints requieren rol DUENIO o VENDEDOR (`@VendedorOrOwnerEndpoint`).

```
url: api/v1/quote/calculate-ars
verb: POST
request:
{
	productId: number
	quantity: number            // entero > 0
	optionalIds: number[]       // [] = sin opcionales
	includeFreight: boolean
}
response: 200
{
	totalArs: number            // total en pesos, redondeado hacia arriba al entero
	totalUsd: number            // total en dólares, redondeado hacia arriba al entero
	dolarPrice: number          // valor del dólar oficial utilizado
}
response: 206
{
	total: number               // mismo cuerpo que calculate: total en dólares
}
errors:
	400: ErrorResponse[]            // validación del request
	400: BuisnessErrorResponse      // opcional que no pertenece al producto o repetido
	404: BuisnessErrorResponse      // producto inexistente
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
> El servidor obtiene el dólar oficial (caché de 30 minutos). Si el servicio externo falla, responde `206` con `{ total }` en dólares y el frontend habilita el ingreso manual.

```
url: api/v1/quote/calculate-ars/manual
verb: POST
request:
{
	productId: number
	quantity: number            // entero > 0
	optionalIds: number[]       // [] = sin opcionales
	includeFreight: boolean
	dolarPrice: number          // dólar oficial ingresado manualmente, > 0
}
response: 200
{
	totalArs: number
	totalUsd: number
	dolarPrice: number
}
errors:
	400: ErrorResponse[]            // validación del request (incluye dolarPrice <= 0)
	400: BuisnessErrorResponse      // opcional que no pertenece al producto o repetido
	404: BuisnessErrorResponse      // producto inexistente
	401: BuisnessErrorResponse
	403: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
> No consulta el servicio externo: convierte con el `dolarPrice` recibido.

```
ErrorResponse { field: string, message: string }
BuisnessErrorResponse { title: string, message: string, path: string, id: string, timestamp: Date }
```
