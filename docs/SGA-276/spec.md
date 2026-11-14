**Puntos de Complejidad**: 5.

**ID**: 1

**Titulo:** Cotizar producto de dólares a pesos.

**Descripción**: Como administrador o vendedor, necesito cotizar un producto de dólares a pesos para ofrecer montos en pesos a clientes argentinos.

**Criterios de Aceptación**: Se solicita un formulario que muestre datos de solo lectura del producto, y que por el otro permita seleccionar opciones para modificar el monto de la cotización.
Al no seleccionar el producto, se muestran: el input de las unidades, los checks del flete como desactivados y el contenedor del monto sin valor y con el símbolo "-".
Una vez seleccionado un producto en dólares de proveedor especificado se muestra el monto de la cotización inicial con los checks del flete activados, y se muestra un selector para la moneda.

* Si se elije USD del selector de monedas, se muestran los siguientes inputs de solo lectura: precio de lista del producto e IVA aplicado.
* Si se elije ARS del selector de monedas, se muestran los siguientes inputs de solo lectura: 
  - Valor de la cotización del dólar oficial junto con un loader de carga al lado derecho que dura hasta que se muestre el valor del dólar oficial
  - Valor del precio de lista en dólares
  - Valor de precio de lista en pesos.
  - Iva aplicado
Los últimos 3 inputs deben estar uno del lado del otro.
Además, se debe modificar el contenido del contenedor del monto para incluir el valor del monto en dólares debajo del valor obtenido en pesos.
Si se obtiene correctamente el valor del dólar oficial, se muestra el mensaje "Valor obtenido" en la ubicación del loader, en caso contrario se habilita el input de lectura del precio del dólar oficial y se reemplaza el loader por un botón cuyo nombre es "Ingreso manual". Al apretar dicho botón, se debe calcular el monto de la cotización con el valor del dólar ingresado en el input.

### Subtasks:

**ID:** 1
**Titulo:** Contenedor de inputs de lectura dinámico 
**Descripción:** El contenedor debe mostrar inicialmente el selector de monedas, inicialmente sin ningún valor seleccionado, si se selecciona USD se muestran los dos input de lectura debajo del selector, si se selecciona ARS se muestran dos inputs al lado y luego los 3 inputs restantes debajo.

**ID:** 2
**Titulo:** Crear loader
**Descripción:** Crear el loader como el de figma para obtener el valor, luego, agregar el valor al input de lectura del dólar oficial.

**ID**: 3
**Titulo**: Crear un botón de ingreso manual
**Descripción**: Crear un input para ingresar el dólar oficial con un botón que diga "ingreso manual", los cuales se muestran en el caso de que no se haya podido recuperar el precio del dólar oficial del servicio externo.

ID: 4
Titulo: Crear endpoint de calculo para la conversión de dólares a pesos
Descripción: Debe recibir los mismos datos del endpoint calcúlate, pero debe devolver el monto de la cotización en pesos y en dólares.

ID: 4
Titulo: Crear controller de calculo para la conversión de dólares a pesos 
Descripción: Debe recuperar primero instancia Quote y luego intentar recuperar el valor del dólar oficial para realizar el calculo del monto con ambas estrategias (en la respuesta exitosa), si la respuesta falla se debe calcular solo el monto con la estrategia sin conversión desde el Exception Handler (se debe guardar el monto de la cuota en la excepción desde el servicio que usa el rest client). 

**ID**: 5
**Titulo**: Implementar un mensaje en Quote para calcular precio de USD a ARS
**Descripción**: El método debe convertir el precio de lista en dólares a pesos recibiendo por parámetro el valor oficial del dólar.

**ID**: 6
**Titulo**: Guardar en caché el valor del dólar oficial
**Descripción**: Crear un servicio con el proveedor Caffeine para guardar el precio del dólar oficial en cache, cuyo tiempo de expiración inicialmente es de 30 minutos. Si el valor expiro, se vuelve a consultar, sino se devuelve el valor de la caché. 

**ID**: 7
**Titulo**: Crear un manejador de excepciones para el fallo del servicio externo
**Descripción**: Desde el servicio que tiene como dependencia el cliente para buscar el precio del dólar, se debe lanzar una excepción en el caso de fallar la petición, el manejador debe atrapar esta excepción y devolver la misma respuesta que devuelve el endpoint calculate. En el contenedor del monto total se debe mostrar únicamente el precio en dólares. Las excepciones a atrapar deben ser las que lance RestClient (HttpClientErrorException, HttpServerErrorException, ResourceAccessException, RestClientException).

**ID**: 8
**Titulo**: Crear un strategy para calcular el total del monto.
**Descripción**: Hacer una estrategia para calcular directamente con el precio de lista neto y otra para aplicar la conversión de dólares a pesos sobre el precio de lista, la estrategia de conversión de USD a ARS recibe por parámetro el precio del dólar oficial. 

**ID**: 9
**Titulo**: Crear un endpoint de calculo de monto que reciba el precio del dólar oficial en el body de la request.
**Descripción**: El endpoint recibe todos los datos que recibe el endpoint de calculate, pero además recibe el precio del dólar oficial, también devuelve el monto en dólares y el monto en pesos.
