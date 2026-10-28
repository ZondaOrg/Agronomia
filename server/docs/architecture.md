# Arquitectura backend
#### Vertical Slice Architecture

```
src/main/java/com/agro/
├── core/
│   ├── api/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   └── handlers/
├── feature/
│   └── <module-name>/
│       ├── controllers/
│       ├── contracts/
│       ├── services/
│       │   └── impl/
│       ├── orchestrator/
│       ├── domain/
│       ├── dtos/
│       │   ├── add/
│       │   │   ├── request/
│       │   │   └── response/
│       │   └── edit/
│       │       ├── request/
│       │       └── response/
│       ├── persistence/
│       │   └── dao/
│       ├── exceptionHandlers/
│       └── valueObjects/
└── shared/
    ├── annotations/
    ├── dtos/
    ├── entities/
    ├── exceptions/
    ├── persistence/
    ├── service/
    └── valueObjects/
```

#### Las responsabilidades de las carpetas son: 

* /module-name: Contiene el nombre de la abstracción a la que están asociadas las funcionalidades, por ejemplo: especialista, especialidad o estudio.
	* /controllers: Contiene las clases que implementan los endpoints.
	* /dtos: Contiene dtos para los endpoints, debe existir un dto diferente para cada endpoint definido en algún controller. Por cada operación se define una carpeta, en todas se distingue entre request o response, cada operación tiene una clase mapper que transforma de modelo a dto y de dto a modelo.
	* /domain: Contiene las clases con todas las reglas de negocio. Está estrictamente prohibido que tenga dependencias de otras capas.
	* /persistence: Contiene una carpeta /dao que define interfaces que extienden de JpaRepository.
	* /services: Define las interfaces para cada servicio, la carpeta /impl contiene las clases que implementan dichas interfaces
	* /contracts: Define interfaces para que sean utilizadas por otras features que necesiten datos de esta feature, en ningún contrato se puede devolver un objeto o entidad de dominio.
	* /valueObjects: Objetos que encapsulan validación.
	* /exceptionHandlers: Manejo de respuestas de error de excepciones que ocurren únicamente dentro de la feature.
	* /orchestrator: Coordina varios servicios o contratos de otras features en una operación.
* /core: Contiene dependencias de infraestructura y transversal.
	* /handlers: Manejo global de excepciones, define `ErrorResponse` y `BuisnessErrorResponse`.
	* /config: Configuración transversal.
	* /data: Seeders e inicialización de datos.
* /shared: Contiene dependencias reutilizables por otras features.

Las dependencias de una feature son:
**controller --> services --> dao** 
##### El flujo para implementar una feature es: 

1. Filter chain de Spring Security valida la petición.
2. Controller procesa la petición: toma el dto del body y lo pasa a modelo, luego delega al servicio.
3. Los métodos del servicio solo reciben por parámetro datos primitivos o objetos de dominio.
4. El servicio delega al modelo y/o a la capa de persistencia.
