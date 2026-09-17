# EduSphere

EduSphere is a multi-school school management system built with Next.js, TypeScript, PostgreSQL, and Prisma. The repository combines the SRS-driven platform definition with the completed application foundation and security primitives required for a production-ready multi-tenant school system.

## Completed foundation phases

- **Phase 1:** Next.js application foundation, layouts, shared UI structure, API conventions and application states.
- **Phase 2:** PostgreSQL/Prisma relational database covering the SRS domain model.
- **Phase 3:** Password authentication, signed HTTP-only sessions, login/logout auditing and dashboard protection.
- **Phase 4:** Live RBAC enforcement and tenant-isolation primitives.

## Project purpose

The system supports a modern school platform for primary and secondary institutions, covering:

- school administration and tenant structure
- user roles and permissions
- student and parent management
- academic structure and enrollments
- attendance and assessments
- examinations and results
- finance and invoicing
- library and inventory
- notifications and communication
- reports and system administration

## SRS and project documentation

This repository includes the core planning and requirements material for the system:

- [src/doc/EduSphere-SRS-v2.0.docx](src/doc/EduSphere-SRS-v2.0.docx) — the main software requirements specification for the school management system
- [src/doc/School_Management_System_Development_Plan.html](src/doc/School_Management_System_Development_Plan.html) — the implementation roadmap derived from the SRS
- [prisma/README.md](prisma/README.md) — database foundation and Prisma-specific setup notes

## Database coverage

The database includes schools, users, roles, permissions, students, parents/guardians, teachers, departments, classes, streams, subjects, academic years, terms, admissions, attendance, timetables, assessments, examinations, marks, results, report cards, grading policies, promotion, transfer, withdrawal, fees, discounts, scholarships, invoices, payments, receipts, library, inventory, announcements, notifications, settings, documents and audit logs.

## Security architecture

The authenticated school is always derived from the server-side session and verified against the live database user. The security layer provides:

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
├── audit.ts
└── auth/
```

Available primitives include `getCurrentUser`, `hasPermission`, `requirePermission`, `requireRole`, `requireApiUser`, `requireApiPermission`, `requireSchoolScope`, `schoolScopeFilter`, `assertSameSchool` and `writeAuditLog`.

### Tenant-isolation rule

Never trust a `schoolId` sent by a client. For models with direct `schoolId`, derive the tenant from the authenticated user and include it in every read/write filter. For child models without a direct `schoolId`, scope through their school-owned parent relation before access.

## API health check

The application exposes a real database connectivity check at:

- `GET /api/health`

Behavior:

- returns `503` if `DATABASE_URL` is missing
- returns `503` if PostgreSQL is unavailable
- otherwise returns a healthy response payload

API Route Handlers live under `src/app/api` and return the standard envelope used by the project.

## Environment and database

Copy `.env.example` to `.env.local` and configure `DATABASE_URL` plus a cryptographically random `AUTH_SECRET` of at least 32 characters.

```bash
npm install
npm run db:validate
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:studio
```

The repository contains no production credentials, fake business records or demo users.

## Current boundary

The foundation is ready for the first business service layer. The next implementation should be **school and user administration**, using these security primitives on every server-side read/write operation. Admissions, academics, attendance, results, finance, library, inventory, notifications and reporting should follow the same protected service pattern as they are implemented.

## Notes

- no production secrets or credentials should be committed
- no demo school/user records are included in this foundation phase
- this project is intentionally structured so later modules can be added in planned, dependency-safe phases
