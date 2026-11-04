# Arquitectura
Este archivo contiene las decisiones y restricciones innegociables para la arquitectura de esta aplicación.
#### Vertical Slice Architecture

* No se estructura por componentes técnicos, sino por funcionalidad.
* No se puede generar dependencias entre capas de distintas funcionalidades, sean peer o no.

```
src/
├── core/
├── feature/      ← server: feature/ · client: features/
└── shared/
```

Las responsabilidades de estas 3 carpetas son:

- feature/ (server) · features/ (client): Contiene codigo relacionado a la funcionalidad en cuestión, puede reutilizar dependencias de shared.
- shared/: Dependencias reutilizables por varias features
- core/: Dependencias transversales de infraestructura.

*El contenido especifico de las carpetas se menciona en `server/docs/architecture.md`, `client/docs/architecture.md`
