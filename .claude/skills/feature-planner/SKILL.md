---
name: feature-planner
description: Genera spec.md, api-contract.md, backend.md y frontend.md en docs/<id-feature>/ a partir de una historia de usuario de Jira. Usar al iniciar una historia de usuario, en modo plan.
---
**PROPÓSITO**: Generar los contratos de una historia de usuario para backend y frontend.
**PARÁMETROS**: El id de la historia y la US copiada de Jira por prompt.
**RETORNA**: La carpeta `docs/<id-feature>/`.

```
docs/<id-feature>/
├── spec.md
├── api-contract.md
├── backend.md
└── frontend.md
```
#### Restricciones
- Antes de empezar, lee `server/docs/architecture.md` y `client/docs/architecture.md`.
- `spec.md` = copia textual de la US. No se modifica.
- Los contratos de `backend.md` y `frontend.md` tienen solo PROPÓSITO y PRECONDICIÓN.
- Las precondiciones se redactan en texto y pueden derivarse de los criterios de aceptación de `spec.md`.
- Todo criterio de aceptación queda cubierto por al menos un contrato o una precondición.
- Orden: `api-contract.md` → `backend.md` → `frontend.md`. Cada archivo se aprueba antes de generar el siguiente.
- Solo se incluyen las precondiciones, patrones y dependencias de shared aceptados por el usuario.
- No crea, edita ni elimina código. Si no está en modo plan, pregunta antes de continuar.

#### Comportamiento
- Consulta aspectos funcionales no cubiertos por los criterios de aceptación.
- Consulta cómo se comunican frontend y backend.
- Consulta seguridad si el endpoint está protegido.
- Propone precondiciones, patrones y dependencias de shared antes de generar cada archivo.

#### api-contract.md
- Endpoints precedidos por `api/v1/`.
- Verbo HTTP: GET, POST, PUT, DELETE, PATCH.
- Query params entre `[]` y parámetros de url entre `{}`.
- Body de request y de response en JSON con `nombre: tipo`.
- `errors`: status code → tipo del cuerpo de error.
- Headers, si son necesarios.

```
url: api/v1/specialists/{id}
verb: GET
response: 200
{
	id: number
	name: string
	surname: string
}
errors:
	404: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
```
url: api/v1/specialists
verb: POST
request:
{
	name: string
	surname: string
}
response: 201
{
	id: number
	name: string
	surname: string
}
errors:
	400: ErrorResponse[]
	409: BuisnessErrorResponse
HEADERS:
	Authorization: Bearer
```
```
ErrorResponse { field: string, message: string }
BuisnessErrorResponse { title: string, message: string, path: string, id: string, timestamp: Date }
```

#### backend.md
- Orden: dominio → persistencia → servicio → controller → dto + mapper.
- Contrato: PROPÓSITO y PRECONDICIÓN. El propósito empieza con un verbo si modifica estado, o con "Describe" si devuelve un valor. La precondición indica en qué condiciones el que usa la función debe abstenerse de llamarla.
- Patrones de diseño aceptados, con jerarquía de clases, dependencias y contratos.
- Dependencias de shared aceptadas.

```
Domain:
/*
	PROPÓSITO: Agrega una especialidad.
	PRECONDICIÓN: Si la especialidad ya está asociada al especialista, se lanza excepción.
*/
void addSpecial(Special special)

Persistence:
interface SpecialistDAO extends JpaRepository<Specialist, Long>
/*
	PROPÓSITO: Describe si existe un especialista con el cuit dado.
*/
boolean existsByCuit(String cuit)

Service:
/*
	PROPÓSITO: Agrega una especialidad al especialista dado.
	PRECONDICIÓN:
		- Si el id de la especialidad no existe, se lanza excepción.
		- La especialidad no debe estar asociada al especialista.
*/
Specialist add(Specialist specialist, Long idSpecial)

Controller:
/*
	PROPÓSITO: Describe el especialista creado.
	PRECONDICIÓN: Si ya existe un especialista con el mismo CUIT, se lanza excepción.
*/
@PostMapping("/api/v1/specialists")
ResponseEntity<AddSpecialistResponse> add(AddSpecialistRequest request)

Dto:
record AddSpecialistRequest(String name, String surname)
record AddSpecialistResponse(Long id, String name, String surname)
AddSpecialistMapper:
	Specialist toModel(AddSpecialistRequest request)
	AddSpecialistResponse toResponse(Specialist specialist)

Desing:
Strategy pattern in Specialist

Shared Dependencies:
	Specialist -> value objects: cuit, phone, full name
	exceptions: DuplicatedMailException
```

#### frontend.md
- Orden: domain → service → adapters → pages → feature-component → types.
	1. Estructura de los objetos de dominio con sus tipos.
	2. Contratos y firmas de las funciones de los servicios.
	3. Contratos y firmas de los adapters, con sus tipos de request y response.
	4. Firma del componente de la página asociado a la url, sin contrato.
	5. Firmas de los componentes de la feature, sin contrato.
- La lógica está en los componentes superiores del árbol. El resto son componentes sin lógica.
- Componentes, hooks, estilos y entidades de shared a reutilizar, si se aceptan.
- Contrato: PROPÓSITO y PRECONDICIÓN, con la misma regla que en backend.md.
- Siempre se crea una carpeta nueva en `client/src/features/` por cada operación.

```
Domain:
interface Specialist {
	id: number
	name: string
}

Service:
/*
	PROPÓSITO: Agrega un especialista.
	PRECONDICIÓN: El especialista no debe tener id.
*/
add(specialist: Specialist): Promise<Specialist>

Components:
interface SpecialistFormProps {
	specialist: Specialist
}
SpecialistForm({specialist}: SpecialistFormProps)

Desing: Lógica en la página utilizando un hook de la feature. En SpecialistForm se reutilizan Form y Container junto al hook useActive.

Shared:
	components: Form, Container
	hooks: useActive
```

