Como Administrador o Vendedor,
quiero cotizar en pesos un producto sin opcionales cuyo precio de lista está en pesos,
para obtener su precio completo en ARS y continuar con la elección de formas de pago.

Alcance

Seleccionar proveedor y uno de sus productos con precio de lista ARS y sin opcionales, con un cliente previamente seleccionado.

Trabajar con precio de lista, importe del flete y precio completo expresados en ARS durante todo este caso.

Cargar automáticamente precio de lista, IVA y flete.

Elegir si se incluye flete y mostrar el precio completo en ARS.

Habilitar Producto únicamente después de seleccionar proveedor y limitar sus opciones a los productos de ese proveedor.

Mantener Siguiente deshabilitado hasta completar las selecciones obligatorias.

Mostrar una modal de advertencia antes de regresar al paso 1 — Cliente y limpiar los datos de producto solo si se confirma el regreso.

Mostrar el importe del flete al seleccionar «Flete incluido», según el estado visual correspondiente.

Permisos

Administrador y Vendedor: pueden cotizar con los datos cargados del proveedor.

Precio, IVA e importe del flete son de solo lectura para ambos roles dentro del Cotizador.

Reglas de negocio

El servicio de cálculo valida que el producto pertenezca al proveedor seleccionado. Toma precio, IVA y flete de su lista de precios y devuelve el total en ARS para mostrar en el Cotizador.

En esta historia, la moneda de origen del producto y la moneda de la cotización son ARS. No se requiere selección de moneda ni tipo de cambio para este caso.

Inicialmente Producto está deshabilitado. Al seleccionar un proveedor se habilita y permite filtrar únicamente entre los productos de ese proveedor.

Siguiente permanece deshabilitado hasta seleccionar proveedor, un producto válido y una opción de flete, con una cantidad entera mayor que cero. Los campos de precio, IVA e importe del flete se cargan automáticamente y no requieren selección manual.

Para campos incompletos o texto que no confirma un producto, se mantiene Siguiente deshabilitado; no se incorporan estados de error por falta de selección.

Clic en una opción confirma ese producto. Enter o clic fuera confirma solo una coincidencia exacta y única; no se selecciona automáticamente la primera coincidencia.

El IVA se recupera del producto, configurado con 10,5 % o 21 %. No se selecciona en el Cotizador.

El flete utiliza ARS. «Flete incluido» y «No incluye flete» son opciones obligatorias y ninguna se selecciona inicialmente.

El importe del flete se obtiene del producto, pero se muestra al seleccionar «Flete incluido», en ARS y de solo lectura, según el estado visual correspondiente.

Si el producto no tiene opcionales, se oculta esa sección.

Precio completo = cantidad × [precio de lista × (1 + IVA) + flete incluido por unidad]. IVA se expresa como fracción (0.21 o 0.105 según el porcentaje); flete incluido es 0 cuando no se incluye.

El flete no recibe IVA. Se mantiene precisión en el cálculo y se redondea el monto final hacia arriba al entero.

Al seleccionar Regresar desde Producto, se muestra una modal que advierte que volver al paso Cliente hará perder los cambios realizados en Producto. Abrir la modal no limpia los datos ni cambia de paso.

Si se confirma el regreso, se vuelve a 1 — Cliente y se limpian los datos de producto que se hayan empezado a cargar. Si se cancela el regreso, se permanece en Producto conservando los datos.

Criterios de aceptación

CA1 — Selección válida

Al confirmar un producto sin opcionales con precio de lista en ARS mediante clic en una opción, o mediante Enter/clic fuera con coincidencia exacta y única, se cargan automáticamente su precio de lista en ARS, IVA e importe del flete en ARS, de solo lectura. El precio completo se expresa en ARS.

CA2 — Habilitación de Siguiente

Siguiente se habilita cuando hay proveedor, producto válido, condición de flete elegida y cantidad entera mayor que cero. Si falta alguno de estos requisitos, permanece deshabilitado. Al avanzar, se abre 3 — Formas de pago.

Si el texto del buscador no identifica un producto de forma exacta y única, Enter o clic fuera no confirma la selección y Siguiente permanece deshabilitado, sin mostrar un estado de error por selección incompleta. El usuario puede elegir una opción válida del desplegable.

CA3 — Flete obligatorio

Inicialmente ninguna opción de flete está seleccionada. Mientras no se elija «Flete incluido» o «No incluye flete», Siguiente permanece deshabilitado.

Al seleccionar «Flete incluido», aparece el importe del flete del producto en ARS, de solo lectura, según el estado visual correspondiente, y se incorpora al cálculo. Al seleccionar «No incluye flete», el importe no se incluye en el cálculo.

CA4 — Precio completo

Para una unidad con precio de lista 100 ARS, IVA 21 % y flete incluido 10 ARS, el precio completo es 131 ARS. Sin flete es 121 ARS. Para tres unidades, los totales son 393 ARS con flete y 363 ARS sin flete. Si el cálculo final produce 10,01, se muestra 11; si produce 10,00, se muestra 10.

CA5 — Sin opcionales

Cuando el producto seleccionado no tiene opcionales, la sección Opcionales no se muestra.

CA6 — Cambio de producto

Al cambiar a otro producto sin opcionales con precio de lista en ARS, se actualizan el precio de lista, IVA e importe del flete con los datos del nuevo producto.

Se limpian todos los campos seleccionables posteriores, incluida la elección de flete y las formas de pago. Siguiente queda deshabilitado hasta completar nuevamente las selecciones obligatorias de este paso. Las formas de pago deberán volver a elegirse en el paso correspondiente.

CA7 — Cambio de proveedor

Al cambiar de proveedor se conserva el cliente seleccionado y se limpian el producto y los demás campos de la vista Producto y de los pasos siguientes.

Las opciones de Producto se actualizan para corresponder únicamente al nuevo proveedor. Siguiente vuelve a estar deshabilitado hasta completar nuevamente las selecciones obligatorias.

CA8 — Producto dependiente del proveedor

Mientras no haya un proveedor seleccionado, Producto permanece deshabilitado y no permite buscar ni seleccionar un producto. Al seleccionar un proveedor, el campo se habilita y permite filtrar y elegir únicamente entre los productos de ese proveedor.

CA9 — Regresar al paso Cliente

Cuando el usuario selecciona Regresar desde el paso Producto, se muestra una modal que advierte que, si vuelve a Cliente, perderá los cambios realizados en Producto. Mientras la modal está abierta no se limpian los datos ni se realiza el regreso.

Si confirma el regreso, el sistema vuelve a la pantalla 1 — Cliente y limpia los datos de producto que se hayan empezado a cargar; estos no se recuperan al volver a avanzar al paso Producto.

Si cancela el regreso, la modal se cierra y el usuario permanece en Producto con los datos y selecciones conservados.

CA10 — Cantidad de unidades

Cantidad comienza en 1 y solo admite enteros mayores que cero. Con cantidad vacía, 0, negativa o fraccionaria no se puede avanzar. El total se calcula para todas las unidades antes del redondeo final.

CA11 — Flete sin importe informado

Si no hay flete informado, el importe permanece vacío y de solo lectura. Se puede elegir «Incluye flete» y avanzar si los demás campos son válidos. El cálculo usa 0 por unidad sin completar el campo con un cero.

CA12 — Abandonar la cotización

Al abandonar la cotización en curso por una acción distinta de Regresar, el usuario sale del flujo y pierde todos los datos de esa cotización. Al iniciar otra, no se recuperan. Los registros ya guardados, como el cliente creado desde el Cotizador, se conservan.

Fuera de alcance

Cotizar productos con moneda de origen distinta de ARS o realizar conversiones de moneda.

Aplicar recargos/descuentos de formas de pago, contemplado en otra US.

Resolver proveedores sin formas de pago, contemplado por rol en historias independientes.
