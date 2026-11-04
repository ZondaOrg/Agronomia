# Arquitectura frontend
#### Vertical Slice Architecture

```
src/
├── core/
│   ├── auth/
│   ├── routes/
│   ├── server/
│   ├── store/
│   └── styles/
├── features/
│   └── <feature-name>/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── domain/
│       ├── types/
│       ├── context/
│       └── adapters/
│           ├── request/
│           └── response/
├── shared/
│   ├── adapters/
│   ├── components/
│   ├── domain/
│   ├── hooks/
│   ├── styles/
│   └── types/
└── views/
```

#### Las responsabilidades de las carpetas son: 

* /feature-name: Contiene el nombre de la operación en concreto sobre una abstracción, por ejemplo: edit-specialist, por ende, se aplica que ==edit-specialist != add-specialist== 
	* /domain: Contiene interfaces de las abstracciones de dominio.
	* /services: Contiene funciones que hacen peticiones con un cliente http como axios, no manejan excepciones con try/catch. 
	* /adapters: Contiene funciones que mapean objetos de dominio a adaptadores de request o de adaptadores de response a dominio, los adaptadores de request o response se definen en sus respectivas carpetas.
	* /pages: Contiene componentes asociados a una ruta.
	* /types: Contiene objetos que siguen contratos especificos de otros componentes reutilizados de shared, por ejemplo: un schema zod de un formulario o un contrato con la información para renderizar inputs.
	* /context: Contiene contextos para la funcionalidad.
	* /hooks: Contiene lógica para los componentes, son intermediaros entre los componentes y los servicios.
* /core:
	* /server: Contiene dependencias para gestionar las respuestas del backend de forma transveral para las features
	* /routes: Contiene las rutas del frontend.
	* /styles: Contiene tokens o utilidades para panda css.
	* /auth: Contiene dependencias para gestionar la autenticación.
	* /store: Contiene el store global (Redux Toolkit) y sus hooks tipados.
* /shared:
	* /adapters: Contiene adapters reutilizables por otras features.
	* /components: Contiene componentes reutilizables por otras feautres.
	* /hooks: Contiene hooks reutilizables por otras features.
	* /styles: Contiene contratos para panda css.
	* /domain: Contiene tipos relacionado a abstracciones del dominio que son compartidos, pueden ser interfaces. types.
	* /types: Contiene tipos reutilizables por otras features.
* /views: Contiene componentes de sección asociados a rutas (layout con `Outlet` y paneles) que agrupan páginas de varias features.

##### Las dependencias de una feature son: 
feature     -> shared -> Park-UI 
        ->  hooks -> service
##### El flujo para implementar una feature es: 

1. Si se requiere recibir datos del backend al inicio
	 * Se obtiene información del backend mediante un servicio, este utiliza una instancia de axios definida en core.
2. Un custom hook envuelve la la función del servicio con el hook pertiente.
3. La feature (un componente) consume los datos del custom hook.
4. La feature (un componente) reutiliza otros componentes de shared.
5. Opcionalmente, los datos desencadenados por eventos de los componentes de shared llegan al componente de la feature.
6. Si se requiere enviar datos al backend:
	* Se obtienen los datos cuando sucede el evento de shared o del componente en la feature.
	* Desde el componente de la feature se envian los datos a una dependencia del custom hook.
	* El custom hook utiliza como dependencia un servicio.
	* El servicio utiliza un adaptador antes de enviar la request.
	* El servicio envia la request
	* El servicio utiliza un adaptador para mapear la respuesta a un objeto de dominio.
