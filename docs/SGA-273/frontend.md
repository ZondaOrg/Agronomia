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

/* Valores del paso guardados en hidratationForm (solo el id del producto, no el objeto) */
interface StepProductValues {
	producto: string            // id del producto
	unidades: number
	moneda: keyof Money
	total: number
}

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
		- Al confirmar un producto: guarda su id en el filtro `producto`, obtiene su detalle por id y calcula con
		  { quantity: 1, optionalIds: [], includeFreight: false }.
		- Ante cada cambio de cantidad válida, opcionales o condición de flete: recalcula con la selección completa vigente
		  (includeFreight = freight === "INCLUDED") y guarda el total en el store.
		- Con cantidad vacía, 0, negativa o fraccionaria no llama al backend y conserva el último total.
		- Al cambiar proveedor o producto, descarta el estado local (detalle, flete, cantidad, opcionales) y el total, y limpia el paso Formas de pago.
		- Informa el estado del form con `setEstadoForm`: `formCompleto` es true solo si hay producto confirmado, flete elegido y cantidad entera mayor que cero
		  (el flete y la cantidad son estado local, por eso el hook es quien calcula la completitud para el store).
		- Al recibir la señal de guardado (`guardadoNonce`), persiste `{ producto, total }` con `guardarValores`.
	PRECONDICIÓN: El paso Cliente debe estar completo.
*/
useStepProduct(stepId: string)
	-> { detail, freight, quantity, optionalIds, total, nextDisabled, onSelectProvider, onSelectProduct, onFreightChange, onQuantityChange, onToggleOptional, ... }

/*
	Estado local del hook (no se guarda en el store):
		detail: QuoteProduct | null    // se obtiene con getQuoteProduct(productId)
		freight: Freight | null
		quantity: number | null        // inicia en 1
		optionalIds: number[]          // inicia en []
*/

Store (slices existentes de features/cotizar/store; no se crea un slice nuevo, stepId "2"):
filterChain:
	filtros del paso (initStep), en este orden, ambos required, ids como string:
		proveedor  (autocomplete)  -> id del proveedor
		producto   (autocomplete)  -> id del producto
	/*
		PROPÓSITO: setFilterValue(proveedor) guarda el id del proveedor y limpia el producto.
		PRECONDICIÓN: Producto solo está habilitado si hay proveedor (selectIsFilterEnabled).
	*/
	/*
		PROPÓSITO: Limpia los valores de todos los filtros del paso dado.
		PRECONDICIÓN: El paso debe estar inicializado. (Acción nueva `clearStep(stepId)`.)
	*/
hidratationForm:
	obligatorios: ["producto"]
	valores: StepProductValues = { producto: string, total: number }   // solo el id del producto, no el objeto
	Acciones reutilizadas: initForm, setEstadoForm, solicitarGuardado, guardarValores, clearForm.
	/*
		PROPÓSITO: Describe si el paso permite avanzar: form completo, flete elegido y cantidad entera mayor que cero.
		(`useStepProduct` lo calcula con el estado local y lo guarda con `setEstadoForm`; `useCotizador` lo lee con `selectFormCompleto` y deriva `nextDisabled`.)
	*/

Pages:
StepProduct({ stepId }: { stepId: string })

Components:
interface FilterProductProps {
	stepId: string
	providers: ProviderOption[]
	products: ProductOption[]
	onSearchProvider: (text: string) => void
	onSearchProduct: (text: string) => void
	onSelectProvider: (providerId: string | null) => void
	onSelectProduct: (productId: string | null) => void
}
FilterProduct(props: FilterProductProps)

interface ProductPriceFieldsProps {
	listPrice: number
	iva: Iva
}
ProductPriceFields({ listPrice, iva }: ProductPriceFieldsProps)

interface CurrencySelectProps {
	value: keyof Money | null   // null = sin moneda seleccionada
	onChange: (value: keyof Money | null) => void
}
CurrencySelect({ value, onChange }: CurrencySelectProps)

interface ProductFormProps {
	detail: QuoteProduct | undefined   // undefined = producto aún no confirmado
	moneda: keyof Money | null
	freight: Freight | null
	quantity: number | null
	total: number | null
	onMonedaChange / onFreightChange / onQuantityChange
}
/*
	PROPÓSITO: Compone el formulario del paso.
		- Sin producto: solo QuantityInput y FreightSelector (deshabilitados).
		- Con producto: agrega CurrencySelect y TotalPrice.
		- Con moneda elegida: agrega ProductPriceFields (precio neto e IVA de solo lectura).
*/
ProductForm(props: ProductFormProps)

interface FreightSelectorProps {
	value: Freight | null
	disabled?: boolean
	onChange: (value: Freight) => void
}
// CardCheckInput variant "CardSimple", selección única: "Incluir flete" / "No incluir flete"
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
	PROPÓSITO: En el paso Producto, Anterior abre la modal de regreso (hoy `handleCancel` retrocede directo salvo en el paso 0). Al confirmar,
		limpia el paso Producto (`clearStep("2")` y `clearForm("2")`) y vuelve a Cliente; al cancelar, cierra la modal y conserva los datos.
		Expone `nextDisabled = !formCompleto` del paso actual (`selectFormCompleto`), que `CotizarPanel` pasa a `StepManager`.
		En el paso Producto Siguiente no usa `mostrarFaltantes` ni estados de error por falta de selección.
*/
useCotizador(totalSteps: number)
	-> { ..., nextDisabled: boolean }
/*
	PROPÓSITO: Limpia todos los datos de la cotización al desmontar el panel (abandono), con `clearStep` y `clearForm` de cada paso.
*/
CotizarPanel()

Shared (cambios):
/*
	PROPÓSITO: Variante "autocomplete" de FilterFieldConfig/FilterField. Al escribir invoca onSearch con el texto.
		Clic en una opción la confirma. Enter o blur confirman solo si el texto coincide de forma exacta y única con una opción; en otro caso no se confirma ni se muestra error.
	PRECONDICIÓN: Si el campo está deshabilitado, no permite buscar ni seleccionar.
	Cambios requeridos:
		- `filter-chain.ts`: agregar `AutocompleteFilterFieldConfig` a la unión `FilterFieldConfig`.
		- `FilterField.tsx`: hoy solo renderiza `<select>` o `<input type="text">`. Agregar la rama "autocomplete": input con lista de opciones,
		  `onSearch` al escribir, y confirmación por clic, Enter o blur. El valor que informa `onChange` es el `value` (id) de la opción, o `null` si no hay coincidencia.
		- `FilterChain.tsx` no cambia (sigue siendo controlado por `filters`, `values`, `enabled` y `onChange`).
*/
interface AutocompleteFilterFieldConfig extends BaseFilterFieldConfig {
	variant: "autocomplete"
	options: { value: string; label: string }[]
	onSearch: (text: string) => void
}

/*
	PROPÓSITO: Deshabilita el botón Siguiente cuando es true.
	Cambios requeridos: pasar `disabled={nextDisabled}` al `Button` de Siguiente (el `Button` ya reenvía `disabled` al `<button>`).
*/
StepManager({ ..., nextDisabled?: boolean })

/*
	PROPÓSITO: Muestra el botón deshabilitado de forma distinguible y sin efecto hover.
	Cambios requeridos: agregar `_disabled` (color apagado, cursor not-allowed, sin hover) en `button/button.styles`,
	porque hoy el `Button` genérico deshabilitado se ve igual que uno activo.
*/
Button({ ..., disabled?: boolean })
```

## Desing
- La lógica vive en `StepProduct` mediante `useStepProduct`. `FilterProduct`, `ProductPriceFields`, `FreightSelector`, `QuantityInput`, `OptionalsSelector` y `TotalPrice` son componentes sin lógica.
- No se crea un slice nuevo. El proveedor y el producto viven en `filterChain` (solo ids) y `{ producto, total }` en `hidratationForm`, ambos ya registrados en `core/store`. El detalle, flete, cantidad y opcionales son estado local de `useStepProduct`. Producto está deshabilitado mientras no hay proveedor en `filterChain`.
- El store guarda solo el id del producto, nunca el objeto completo; el detalle se obtiene por id con `getQuoteProduct`.
- Al recibir `guardadoNonce`, el paso debe guardar `valores` con referencia nueva mediante `guardarValores`: `useCotizador` avanza de paso cuando cambian los `valores`.
- El front no calcula: siempre envía la selección completa vigente (`productId`, `quantity`, `optionalIds`, `includeFreight`) a un único `POST api/v1/quote/calculate` y muestra el `total` devuelto.
- Sin condición de flete elegida se calcula con `includeFreight: false`.
- `freight = 0` se muestra como campo vacío de solo lectura.
- La sección Opcionales (`OptionalsSelector`) se oculta cuando `optionals` está vacía.
- `nextDisabled` = `!formCompleto` del paso. `useStepProduct` calcula la completitud (producto confirmado, flete elegido y cantidad entera mayor que cero) y la guarda con `setEstadoForm`; `useCotizador` la lee del store. No se usan estados de error por falta de selección.
- Al cambiar producto o proveedor se limpian también los datos del paso Formas de pago.

## Shared
- components: `FilterChain`/`FilterField` (nueva variante autocomplete; cambia `FilterField` y el tipo, no `FilterChain`), `StepManager` (nuevo prop `nextDisabled`), `Button` (estilo `_disabled`), `Step` (sin cambios), `NotifyHandler`/`ConfirmModal` (modal de regreso; reutilizar la advertencia existente de `CotizarPanel` si encaja), `CardCheckInput` (opciones de flete), `DataField` (precio, IVA y flete de solo lectura)
- domain: `Money`, `Iva`
- hooks: `useFetch`
- store de la feature: `filterChain` (nueva acción `clearStep`), `hidratationForm`; `validateStepSchema` y el patrón de `FormClient`
