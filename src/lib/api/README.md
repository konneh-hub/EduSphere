# API conventions

EduSphere uses Next.js App Router Route Handlers under `src/app/api`.

## URL convention

- Base path: `/api`
- Resource paths use plural nouns and lowercase kebab-case.
- Health/readiness endpoints live under `/api/health`.
- Versioning is introduced only when a breaking API contract requires it; do not add `/v1` prematurely.

## Response convention

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

## Rules

- Validate input on the server.
- Keep secrets and database access server-side.
- Authorization must be enforced server-side before protected operations.
- Tenant-scoped queries must carry tenant context once multi-tenancy is implemented.
- Use appropriate HTTP status codes.
- Do not return passwords, session secrets, or internal stack traces.
- Business logic belongs in `src/lib`, not directly in route handlers.
