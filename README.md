# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The application uses a single Next.js full-stack application with PostgreSQL and Prisma, with school ownership represented explicitly in the data model.

## Phase 1 — Foundation

The `phase-1-foundation` branch establishes the Next.js App Router foundation, shared layouts, UI directories, route boundaries, API conventions and application states without implementing business workflows.

## Phase 2 — Full database foundation

The database layer has now been expanded to cover the SRS core scope. The SRS defines PostgreSQL as the relational database and Prisma as the ORM, and requires centralized school data, secure role-based access and relational data integrity.

### Prisma organization

The Prisma schema is organized into multiple `.prisma` files under `prisma/` while keeping `prisma/schema.prisma` as the main generator/datasource file.

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

`School` is the top-level school ownership boundary. School-owned records carry a direct school relationship or belong to a school-owned parent record. Authentication and authorization must derive the active school from the authenticated server-side context and must not trust arbitrary school IDs supplied by clients.

### Database commands

```bash
npm install
npm run db:validate
npm run db:generate
npm run db:push
```

For versioned development migrations:

```bash
npm run db:migrate
```

For Prisma Studio:

```bash
npm run db:studio
```

No production database credentials or seed records are committed.

### CI validation

`.github/workflows/database.yml` validates the Prisma schema and generates Prisma Client on relevant pushes and pull requests.

## Phase 3 — Authentication and authorization foundation

The same branch now contains the initial security foundation:

- Password hashing and verification with bcrypt.
- Signed, HTTP-only, same-site session cookies using `jose`.
- School-scoped login using school code + email + password.
- Account status enforcement before session creation.
- Server-side dashboard protection that redirects unauthenticated users to `/login`.
- Server-side permission lookup through the existing `RolePermission` model.
- Login and logout audit events through the existing `AuditLog` model.
- Last-login timestamp updates.
- No public registration, password reset workflow, demo credentials or fake users have been added.

### Authentication environment

`.env.example` contains `AUTH_SECRET`. Set a cryptographically random value of at least 32 characters in `.env.local` before using authentication.

Example PowerShell command:

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

The generated value should be assigned to `AUTH_SECRET`; do not commit it.

## API health check

`GET /api/health` performs a real PostgreSQL connectivity check. It returns `503` when the database is not configured or unavailable; it does not fabricate a healthy database state.

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

The current implementation establishes the foundation, relational database and authentication/session security layers. It does **not** yet implement school/user CRUD services, admissions workflows, attendance workflows, examination processing, result approval workflows, payment processing, notification delivery or reporting APIs.

There is intentionally no fake business data, demo users, fake schools, fake students or simulated dashboard statistics.
