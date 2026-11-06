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

interface QuoteAmount {
	amount: number              // preciso, para encadenar
	total: number               // redondeado hacia arriba, para mostrar
}

type Operation = "SUM" | "MULTIPLY"
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
	PROPÓSITO: Describe el monto resultante de aplicar la operación con el operando dado.
	PRECONDICIÓN: El monto y el operando no deben ser negativos.
*/
calculate(amount: number, operation: Operation, operand: number): Promise<QuoteAmount>

Adapters:
response/
type OptionResponse = { id: number, name: string }
type QuoteOptionalResponse = { id: number, name: string, price: number }
type QuoteProductResponse = { id: number, name: string, money: "ARS" | "USD", listPrice: number, iva: "GENERAL" | "REDUCIDA", freight: number, optionals: QuoteOptionalResponse[] }
type CalculateResponse = { amount: number, total: number }
/*
	PROPÓSITO: Describe las opciones de búsqueda a partir de la respuesta.
*/
optionsAdapter(response: OptionResponse[]): ProviderOption[] | ProductOption[]
/*
	PROPÓSITO: Describe el producto a cotizar, con sus opcionales, a partir de la respuesta.
*/
quoteProductAdapter(response: QuoteProductResponse): QuoteProduct
/*
	PROPÓSITO: Describe el monto a partir de la respuesta.
*/
quoteAmountAdapter(response: CalculateResponse): QuoteAmount

request/
type CalculateRequest = { amount: number, operation: Operation, operand: number }
/*
	PROPÓSITO: Describe la request de cálculo.
*/
calculateRequestAdapter(amount: number, operation: Operation, operand: number): CalculateRequest

Hooks:
useSearchProviders()  -> { data, loading, search(text) }          // useFetch
useSearchProducts()   -> { data, loading, search(providerId, text) }
useQuoteProduct()     -> { data, loading, get(productId) }
useCalculateQuote()   -> { loading, calculate(amount, operation, operand) }

/*
	PROPÓSITO: Coordina la selección y el cálculo del paso Producto.
		- Al confirmar un producto: obtiene su detalle y calcula MULTIPLY (1 + ivaRate) sobre listPrice → unitWithoutFreight.
		- «Flete incluido» con freight > 0: SUM freight sobre unitWithoutFreight → unitWithFreight.
		- «No incluye flete» (o freight = 0): usa unitWithoutFreight sin llamar al backend.
		- Cantidad: MULTIPLY quantity sobre el unitario vigente → quote (total para mostrar).
	PRECONDICIÓN: El paso Cliente debe estar completo.
*/
useStepProduct(stepId: string)

Store (features/cotizar/store/quoteProduct/):
interface QuoteProductState {
	provider: ProviderOption | null
	product: ProductOption | null
	detail: QuoteProduct | null
	freight: Freight | null
	quantity: number | null           // inicia en 1
	unitWithoutFreight: QuoteAmount | null
	unitWithFreight: QuoteAmount | null
	quote: QuoteAmount | null
}
/*
	PROPÓSITO: Selecciona el proveedor y limpia el producto y los campos posteriores del paso y de los pasos siguientes.
*/
selectProvider(provider: ProviderOption | null)
/*
	PROPÓSITO: Selecciona el producto y limpia detalle, flete, cantidad, montos y formas de pago.
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
	PROPÓSITO: Guarda los montos unitarios y el total calculados.
*/
setUnitWithoutFreight(amount: QuoteAmount) / setUnitWithFreight(amount: QuoteAmount) / setQuote(amount: QuoteAmount)
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

/*
	PROPÓSITO: Describe la fracción de IVA del enum (GENERAL → 0.21, REDUCIDA → 0.105).
*/
ivaRate(iva: Iva): number      // shared/domain/iva
```

## Desing
- La lógica vive en `StepProduct` mediante `useStepProduct`. `FilterProduct`, `ProductPriceFields`, `FreightSelector`, `QuantityInput` y `TotalPrice` son componentes sin lógica.
- Todo el estado del paso vive en el slice `quoteProduct` (registrado en `core/store`). `FilterChain` se usa solo como vista, alimentada desde el slice; Producto está deshabilitado mientras `provider` es null.
- El monto se calcula de forma incremental contra `api/v1/quote/calculate`: precio de lista → MULTIPLY (1 + IVA) → SUM flete (solo si «Flete incluido» y freight > 0) → MULTIPLY cantidad. Se muestra siempre `total`; para encadenar se usa `amount`.
- No llaman al backend: elegir «No incluye flete» y elegir «Flete incluido» con freight = 0.
- `freight = 0` se muestra como campo vacío de solo lectura.
- La sección Opcionales se oculta cuando `optionals` está vacía.
- `nextDisabled = !selectIsStepComplete`; no se usan estados de error por falta de selección.
- Al cambiar producto o proveedor se limpian también los datos del paso Formas de pago.

## Shared
- components: `FilterChain`/`FilterField` (nueva variante autocomplete), `StepManager` (nuevo prop `nextDisabled`), `Step`, `ConfirmModal` (modal de regreso), `CardCheckInput` (opciones de flete), `DataField` (precio, IVA y flete de solo lectura)
- domain: `Money`, `Iva`, `ivaRate` (nuevo)
- hooks: `useFetch`
