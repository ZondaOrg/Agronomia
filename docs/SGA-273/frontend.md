# SGA-273 — Frontend

Carpeta: `client/src/features/cotizar/step-product/` (mismo patrón que `step-client`).

```
Domain:
interface ProviderOption {
	id: number
	name: string
}

interface ProductOption {
	id: number
	name: string
}

interface QuoteProduct {
	id: number
	name: string
	money: keyof Money          // shared/domain/money
	listPrice: number
	iva: Iva                    // shared/domain/iva
	freight: number             // 0 = sin flete informado
	optionals: QuoteOptional[]  // [] = sin opcionales
}

interface QuoteOptional {
	id: number
	name: string
	price: number               // en la moneda del producto
}

interface QuoteSelection {
	productId: number
	quantity: number            // entero > 0
	optionalIds: number[]       // [] = sin opcionales
	includeFreight: boolean
}

interface QuoteTotal {
	total: number               // redondeado hacia arriba, para mostrar
}

type Freight = "INCLUDED" | "NOT_INCLUDED"

Service:
/*
	PROPÓSITO: Describe los proveedores de la compañía que coinciden con el criterio de búsqueda.
*/
searchProviders(search: string): Promise<ProviderOption[]>

/*
	PROPÓSITO: Describe los productos del proveedor que coinciden con el criterio de búsqueda.
	PRECONDICIÓN: Debe haber un proveedor seleccionado.
*/
searchProducts(providerId: number, search: string): Promise<ProductOption[]>

/*
	PROPÓSITO: Describe los datos del producto necesarios para cotizarlo.
	PRECONDICIÓN: El producto debe haber sido confirmado en el buscador.
*/
getQuoteProduct(productId: number): Promise<QuoteProduct>

/*
	PROPÓSITO: Describe el precio completo de la selección dada.
	PRECONDICIÓN: El producto debe estar confirmado y la cantidad debe ser un entero mayor que cero.
*/
calculate(selection: QuoteSelection): Promise<QuoteTotal>

Adapters:
response/
type OptionResponse = { id: number, name: string }
type QuoteOptionalResponse = { id: number, name: string, price: number }
type QuoteProductResponse = { id: number, name: string, money: "ARS" | "USD", listPrice: number, iva: "GENERAL" | "REDUCIDA", freight: number, optionals: QuoteOptionalResponse[] }
type CalculateResponse = { total: number }
/*
	PROPÓSITO: Describe las opciones de búsqueda a partir de la respuesta.
*/
optionsAdapter(response: OptionResponse[]): ProviderOption[] | ProductOption[]
/*
	PROPÓSITO: Describe el producto a cotizar, con sus opcionales, a partir de la respuesta.
*/
quoteProductAdapter(response: QuoteProductResponse): QuoteProduct
/*
	PROPÓSITO: Describe el total a partir de la respuesta.
*/
quoteTotalAdapter(response: CalculateResponse): QuoteTotal

request/
type CalculateRequest = { productId: number, quantity: number, optionalIds: number[], includeFreight: boolean }
/*
	PROPÓSITO: Describe la request de cálculo a partir de la selección.
*/
calculateRequestAdapter(selection: QuoteSelection): CalculateRequest

Hooks:
useSearchProviders()  -> { data, loading, search(text) }          // useFetch
useSearchProducts()   -> { data, loading, search(providerId, text) }
useQuoteProduct()     -> { data, loading, get(productId) }
useCalculateQuote()   -> { loading, calculate(selection) }

/*
	PROPÓSITO: Coordina la selección y el cálculo del paso Producto.
		- Al confirmar un producto: obtiene su detalle y calcula con { quantity: 1, optionalIds: [], includeFreight: false }.
		- Ante cada cambio de cantidad válida, opcionales o condición de flete: recalcula con la selección completa vigente
		  (includeFreight = freight === "INCLUDED") y guarda el total.
		- Con cantidad vacía, 0, negativa o fraccionaria no llama al backend y conserva el último total.
	PRECONDICIÓN: El paso Cliente debe estar completo.
*/
useStepProduct(stepId: string)

Store (features/cotizar/store/quoteProduct/):
interface QuoteProductState {
	provider: ProviderOption | null
	product: ProductOption | null
	detail: QuoteProduct | null
	freight: Freight | null
	quantity: number          // inicia en 1
	optionalIds: number[]             // inicia en []
	total: number
}
/*
	PROPÓSITO: Selecciona el proveedor y limpia el producto y los campos posteriores del paso y de los pasos siguientes.
*/
selectProvider(provider: ProviderOption | null)
/*
	PROPÓSITO: Selecciona el producto y limpia detalle, flete, cantidad, opcionales, total y formas de pago.
	PRECONDICIÓN: Debe haber un proveedor seleccionado.
*/
selectProduct(product: ProductOption | null)
/*
	PROPÓSITO: Guarda el detalle del producto.
	PRECONDICIÓN: Debe haber un producto seleccionado.
*/
setDetail(detail: QuoteProduct)
/*
	PROPÓSITO: Guarda la condición de flete elegida.
	PRECONDICIÓN: Debe haber un producto con detalle cargado.
*/
setFreight(freight: Freight)
/*
	PROPÓSITO: Guarda la cantidad ingresada.
*/
setQuantity(quantity: number | null)
/*
	PROPÓSITO: Agrega el opcional a la selección si no está, o lo quita si ya está.
	PRECONDICIÓN: El opcional debe pertenecer al detalle del producto cargado.
*/
toggleOptional(optionalId: number)
/*
	PROPÓSITO: Guarda el total calculado.
*/
setTotal(total: number)
/*
	PROPÓSITO: Limpia todos los datos del paso Producto.
*/
clear()
/*
	PROPÓSITO: Describe si el paso está completo: proveedor, producto, flete elegido y cantidad entera mayor que cero.
*/
selectIsStepComplete(state: RootState): boolean

Pages:
StepProduct({ stepId }: { stepId: string })

Components:
interface FilterProductProps {
	providers: ProviderOption[]
	products: ProductOption[]
	provider: ProviderOption | null
	product: ProductOption | null
	onSearchProvider: (text: string) => void
	onSearchProduct: (text: string) => void
	onSelectProvider: (provider: ProviderOption | null) => void
	onSelectProduct: (product: ProductOption | null) => void
}
FilterProduct(props: FilterProductProps)

interface ProductPriceFieldsProps {
	listPrice: number
	iva: Iva
}
ProductPriceFields({ listPrice, iva }: ProductPriceFieldsProps)

interface FreightSelectorProps {
	value: Freight | null
	freight: number
	onChange: (value: Freight) => void
}
FreightSelector({ value, freight, onChange }: FreightSelectorProps)

interface QuantityInputProps {
	value: number | null
	onChange: (value: number | null) => void
}
QuantityInput({ value, onChange }: QuantityInputProps)

interface OptionalsSelectorProps {
	optionals: QuoteOptional[]
	selected: number[]
	onToggle: (optionalId: number) => void
}
OptionalsSelector({ optionals, selected, onToggle }: OptionalsSelectorProps)

interface TotalPriceProps {
	total: number | null
}
TotalPrice({ total }: TotalPriceProps)

View (views/cotizar):
/*
	PROPÓSITO: En el paso Producto, Anterior abre la modal de regreso. Al confirmar, limpia el paso Producto y vuelve a Cliente; al cancelar, cierra la modal y conserva los datos.
*/
useCotizador(totalSteps: number)
/*
	PROPÓSITO: Limpia todos los datos de la cotización al desmontar el panel (abandono).
*/
CotizarPanel()

Shared (cambios):
/*
	PROPÓSITO: Variante "autocomplete" de FilterFieldConfig/FilterField. Al escribir invoca onSearch con el texto.
		Clic en una opción la confirma. Enter o blur confirman solo si el texto coincide de forma exacta y única con una opción; en otro caso no se confirma ni se muestra error.
	PRECONDICIÓN: Si el campo está deshabilitado, no permite buscar ni seleccionar.
*/
interface AutocompleteFilterFieldConfig extends BaseFilterFieldConfig {
	variant: "autocomplete"
	options: { value: string; label: string }[]
	onSearch: (text: string) => void
}

/*
	PROPÓSITO: Deshabilita el botón Siguiente.
*/
StepManager({ ..., nextDisabled?: boolean })
```

## Desing
- La lógica vive en `StepProduct` mediante `useStepProduct`. `FilterProduct`, `ProductPriceFields`, `FreightSelector`, `QuantityInput`, `OptionalsSelector` y `TotalPrice` son componentes sin lógica.
- Todo el estado del paso vive en el slice `quoteProduct` (registrado en `core/store`). `FilterChain` se usa solo como vista, alimentada desde el slice; Producto está deshabilitado mientras `provider` es null.
- El front no calcula: siempre envía la selección completa vigente (`productId`, `quantity`, `optionalIds`, `includeFreight`) a un único `POST api/v1/quote/calculate` y muestra el `total` devuelto.
- Sin condición de flete elegida se calcula con `includeFreight: false`.
- `freight = 0` se muestra como campo vacío de solo lectura.
- La sección Opcionales (`OptionalsSelector`) se oculta cuando `optionals` está vacía.
- `nextDisabled = !selectIsStepComplete`; no se usan estados de error por falta de selección.
- Al cambiar producto o proveedor se limpian también los datos del paso Formas de pago.

## Shared
- components: `FilterChain`/`FilterField` (nueva variante autocomplete), `StepManager` (nuevo prop `nextDisabled`), `Step`, `ConfirmModal` (modal de regreso), `CardCheckInput` (opciones de flete), `DataField` (precio, IVA y flete de solo lectura)
- domain: `Money`, `Iva`
- hooks: `useFetch`
