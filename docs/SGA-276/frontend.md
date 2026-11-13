# SGA-276 — Frontend

Carpeta: `client/src/features/cotizar/step-product/` (es la misma operación que ya existe; no se crea una carpeta nueva en `features/`).

Cambio estructural: el formulario actual (`ProductForm`) pasa a ser `ArsProductForm`, solo para productos en ARS. Se agrega `UsdProductForm` para productos en USD. `FormProduct` elige cuál renderizar según `detail.money`.

```
Domain:
interface QuoteArs {
	totalArs: number
	totalUsd: number
	dolarPrice: number
	listPriceArs: number        // precio de lista convertido a pesos
}

interface QuoteArsFallback {
	totalUsd: number            // solo hay monto en dólares
}

type ArsQuoteResult =
	| ({ source: "OFFICIAL" } & QuoteArs)
	| ({ source: "FALLBACK" } & QuoteArsFallback)

interface ManualQuoteSelection extends QuoteSelection {
	dolarPrice: number          // > 0
}

type DolarStatus = "LOADING" | "OBTAINED" | "MANUAL"

Service:
/*
	PROPÓSITO: Describe los montos en pesos y en dólares de la selección con el dólar oficial.
	Si el servicio externo falló (status 206), describe solo el monto en dólares (source "FALLBACK").
	PRECONDICIÓN:
		- El producto debe estar confirmado y estar en dólares.
		- La cantidad debe ser un entero mayor que cero.
*/
calculateArs(selection: QuoteSelection): Promise<ArsQuoteResult>

/*
	PROPÓSITO: Describe los montos en pesos y en dólares de la selección con el dólar ingresado manualmente.
	PRECONDICIÓN:
		- El producto debe estar confirmado y estar en dólares.
		- La cantidad debe ser un entero mayor que cero.
		- El dólar debe ser mayor que cero.
*/
calculateArsManual(selection: ManualQuoteSelection): Promise<QuoteArs>

Urls (core/server/urls/quote.ts):
	QUOTE_CALCULATE_ARS = `${MAIN}/quote/calculate-ars`
	QUOTE_CALCULATE_ARS_MANUAL = `${MAIN}/quote/calculate-ars/manual`

Adapters:
request/
	/*
		PROPÓSITO: Describe el body de calculate-ars a partir de la selección.
	*/
	calculateArsRequestAdapter(selection: QuoteSelection): CalculateArsRequest
	/*
		PROPÓSITO: Describe el body de calculate-ars/manual a partir de la selección y el dólar.
	*/
	calculateArsManualRequestAdapter(selection: ManualQuoteSelection): CalculateArsManualRequest
	type CalculateArsRequest = { productId: number, quantity: number, optionalIds: number[], includeFreight: boolean }
	type CalculateArsManualRequest = CalculateArsRequest & { dolarPrice: number }
response/
	type CalculateArsResponse = { totalArs: number, totalUsd: number, dolarPrice: number, listPriceArs: number }
	type CalculateArsFallbackResponse = { total: number }
	/*
		PROPÓSITO: Describe el resultado de dominio según el status: 200 → OFFICIAL, 206 → FALLBACK.
	*/
	arsQuoteAdapter(status: number, data: CalculateArsResponse | CalculateArsFallbackResponse): ArsQuoteResult
	/*
		PROPÓSITO: Describe el QuoteArs de dominio a partir de la respuesta del endpoint manual.
	*/
	quoteArsAdapter(response: CalculateArsResponse): QuoteArs

Hooks:
/*
	PROPÓSITO: Describe el resultado de la última conversión a pesos y expone las acciones que la piden.
	calculate usa el dólar oficial; calculateManual usa el dólar aplicado y queda como modo vigente.
	PRECONDICIÓN: calculate y calculateManual no deben llamarse sin producto confirmado y con cantidad inválida.
*/
useCalculateArs(): { data: ArsQuoteResult | undefined, loading: boolean, calculate(selection), calculateManual(selection), reset() }

/*
	PROPÓSITO: Describe el detalle del producto y los montos (ARS y USD) de la selección, y recalcula ante cambios de
	unidades, flete u opcionales usando el último modo pedido (USD, oficial o manual).
	PRECONDICIÓN: La primera petición a pesos no la dispara este hook, la dispara el selector de moneda (evento).
*/
useProductQuote(...)   // se amplía el hook existente

Pages (sin contrato):
StepProduct({ stepId }: StepProductProps)
	// Sin cambios de firma. useStepProduct expone además: onSelectMoneda(moneda), onApplyDolar(dolarPrice), ars.

Components (sin contrato):
interface FormProductProps {
	stepId: string
	form: UseFormReturn<StepProductFormValues>
	detail: QuoteProduct | undefined
	total: number | null
	totalUsd: number | null
	ars: ArsQuoteResult | undefined
	arsLoading: boolean
	onSelectMoneda: (moneda: keyof Money | null) => void
	onApplyDolar: (dolarPrice: number) => void
}
FormProduct(props: FormProductProps)       // elige ArsProductForm o UsdProductForm según detail.money

interface ArsProductFormProps {            // ex ProductForm, solo productos en ARS
	control: Control<StepProductFormValues>
	detail: QuoteProduct | undefined
	total: number | null
}
ArsProductForm(props: ArsProductFormProps)

interface UsdProductFormProps {
	control: Control<StepProductFormValues>
	detail: QuoteProduct | undefined
	total: number | null
	totalUsd: number | null
	ars: ArsQuoteResult | undefined
	arsLoading: boolean
	onSelectMoneda: (moneda: keyof Money | null) => void
	onApplyDolar: (dolarPrice: number) => void
}
UsdProductForm(props: UsdProductFormProps)  // inicialmente solo CurrencySelect; luego flete, opcionales y total

interface ArsReadOnlyFieldsProps {
	listPriceUsd: number
	listPriceArs: number | null             // null hasta que llega la respuesta
	iva: Iva
	dolarPrice: number | null
	status: DolarStatus
	onApply: (dolarPrice: number) => void
}
ArsReadOnlyFields(props: ArsReadOnlyFieldsProps)  // dólar oficial + estado arriba; lista USD, lista ARS e IVA (a la derecha) en una fila

interface DolarPriceFieldProps {
	value: number | null
	editable: boolean                       // true solo con status MANUAL
	onApply: (dolarPrice: number) => void   // botón "Aplicar" dentro del input, al extremo derecho
}
DolarPriceField(props: DolarPriceFieldProps)

interface DolarStatusProps { status: DolarStatus }
DolarStatus(props: DolarStatusProps)        // LOADING: loader · OBTAINED: "Valor obtenido" · MANUAL: nada (el botón está en DolarPriceField)

interface TotalPriceProps {
	total: number | null
	totalUsd?: number | null                // se muestra debajo del monto en pesos
	moneda: keyof Money | null
}
TotalPrice(props: TotalPriceProps)          // sin totalArs (fallback) muestra solo el monto en dólares

Design:
	Lógica en useStepProduct / useProductQuote / useCalculateArs (componentes superiores). FormProduct, ArsProductForm,
	UsdProductForm y los campos son componentes sin lógica, salvo el estado del input manual, que vive en useStepProduct.
	Peticiones por eventos: CurrencySelect.onChange("ARS") → onSelectMoneda → calculate (oficial);
	botón "Aplicar" → onApplyDolar → calculateManual. Seleccionar USD usa el calculate existente.
	El estado del dólar se deriva: LOADING mientras arsLoading; OBTAINED si source = OFFICIAL; MANUAL si source = FALLBACK
	(o si se aplicó un valor manual, pasa a OBTAINED con el dólar aplicado).
	Con fallback: total (ARS) = null y TotalPrice muestra solo USD; el paso queda incompleto hasta aplicar el dólar.
	Al cambiar de producto o de moneda se descarta el dólar manual y el resultado a pesos.

Shared:
	components: Spinner (loader; si el de Figma difiere, se ajusta con estilos), Button, CurrencySelect/ProductPriceFields (de la feature)
	hooks: useFetch
	domain: Money, Iva
	styles: los de ProductPriceFields (row, field, label, control)
```
