# Agro

## Tecnologías

### Backend (`server/`)
- Java 21, Spring Boot 4.1, Maven
- Spring Web MVC, Spring Security, Spring Validation
- Spring Data JPA, PostgreSQL, Flyway
- JWT (jjwt), MapStruct, Lombok
- Thymeleaf (templates de email), Resend (email), Cloudinary (imágenes)
- springdoc-openapi, Spring REST Docs
- Tests: JUnit 5, Spring Boot Test, Testcontainers (PostgreSQL)

### Frontend (`client/`)
- React 19, TypeScript, Vite, pnpm
- React Router, Redux Toolkit
- Axios
- React Hook Form + Zod
- Panda CSS
- ESLint, TypeDoc

@docs/architecture.md

## Restricciones
- Antes de crear código, revisar el módulo existente de la feature y `shared/` para reutilizar.
- No ejecutar tests: los ejecuta el usuario.
