# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The application uses a single Next.js full-stack application with PostgreSQL and Prisma, with school ownership represented explicitly in the data model.

## Phase 1 — Foundation

The `phase-1-foundation` branch establishes the Next.js App Router foundation, shared layouts, UI directories, route boundaries, API conventions and application states without implementing business workflows.

## Phase 2 — Full database foundation

The database layer covers the SRS core scope using PostgreSQL and Prisma.

### Prisma organization

```text
prisma/
├── schema.prisma
├── core.prisma
├── academic.prisma
├── finance.prisma
├── library-inventory.prisma
├── system.prisma
└── README.md
```

### Database coverage

The database includes schools, users, roles, permissions, students, parents/guardians, teachers, departments, classes, streams, subjects, academic years, terms, admissions, attendance, timetables, assessments, examinations, marks, results, report cards, grading policies, promotion, transfer, withdrawal, fees, discounts, scholarships, invoices, payments, receipts, library, inventory, announcements, notifications, settings, documents and audit logs.

### Tenant/data isolation foundation

`School` is the top-level school ownership boundary. School-owned records carry a direct school relationship or belong to a school-owned parent record. Authentication and authorization derive the active school from authenticated server-side context rather than accepting an arbitrary client-provided school ID.

## Phase 3 — Authentication and session security

The same branch contains the authentication foundation:

- bcrypt password hashing and verification.
- Signed HTTP-only, same-site session cookies using `jose`.
- School-scoped login using school code + email + password.
- Account status enforcement before session creation.
- Protected dashboard server layout.
- Login/logout audit events.
- Last-login timestamp updates.
- Authenticated-user endpoint at `GET /api/auth/me`.
- No public registration, password reset workflow, demo credentials or fake users.

## Phase 4 — RBAC and tenant-isolation foundation

Authorization now uses the live database user record rather than trusting role/status values stored only inside the session token.

### Server authorization helpers

```text
src/lib/auth/
├── authorization.ts
├── current-user.ts
├── api.ts
├── password.ts
└── session.ts

src/lib/tenant/
└── scope.ts

src/lib/
└── audit.ts
```

The security layer provides:

- `getCurrentUser()` — resolves the authenticated active user inside their authenticated school.
- `hasPermission(resource, action)` — checks the database `RolePermission` mapping.
- `requirePermission()` / `requirePermissionOrThrow()` — server-side permission enforcement.
- `requireRole()` — explicit role enforcement where a workflow requires it.
- `requireApiUser()` — standardized 401 handling for API routes.
- `requireApiPermission()` — standardized 401/403 handling for protected API routes.
- `requireSchoolScope()` — obtains the authenticated tenant boundary.
- `schoolScopeFilter()` — supplies the server-derived `schoolId` filter for school-owned models.
- `assertSameSchool()` — rejects cross-school entity access.
- `writeAuditLog()` — records authenticated user and school context in `AuditLog`.

### Tenant-isolation rule

Server code must never use a school ID supplied by a browser request as the authority for tenant selection. For any model with a direct `schoolId`, queries and mutations must derive the school ID from the authenticated server-side user/session and combine it with the requested entity identifier.

For child records that do not have a direct `schoolId`, the service layer must scope through their school-owned parent relation before reading or mutating them.

## Database and CI commands

```bash
npm install
npm run db:validate
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:studio
```

`.github/workflows/database.yml` validates the Prisma schema and generates Prisma Client on relevant pushes and pull requests.

## Environment

Copy `.env.example` to `.env.local` and set `DATABASE_URL` and a cryptographically random `AUTH_SECRET` of at least 32 characters. Never commit real credentials or secrets.

## API convention

API Route Handlers live under `src/app/api`. Responses use a consistent envelope:

```json
{ "success": true, "data": {} }
```

or:

```json
{
  "success": false,
  "error": { "code": "ERROR_CODE", "message": "Human-readable message" }
}
```

## Current scope boundary

The current implementation establishes the application foundation, relational database, authentication/session security, RBAC helpers and tenant-isolation primitives. It does **not** yet implement school/user CRUD services, admissions workflows, attendance workflows, examination processing, result approval workflows, payment processing, notification delivery or reporting APIs.

There is intentionally no fake business data, demo users, fake schools, fake students or simulated dashboard statistics.
