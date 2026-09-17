# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The application uses a single Next.js full-stack application with PostgreSQL and Prisma, with school ownership represented explicitly in the data model.

## Completed foundation phases

- **Phase 1:** Next.js application foundation, layouts, shared UI structure, API conventions and application states.
- **Phase 2:** PostgreSQL/Prisma relational database covering the SRS domain model.
- **Phase 3:** Password authentication, signed HTTP-only sessions, login/logout auditing and dashboard protection.
- **Phase 4:** Live RBAC enforcement and tenant-isolation primitives.

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
└── audit.ts
```

Available primitives include `getCurrentUser`, `hasPermission`, `requirePermission`, `requireRole`, `requireApiUser`, `requireApiPermission`, `requireSchoolScope`, `schoolScopeFilter`, `assertSameSchool` and `writeAuditLog`.

### Tenant-isolation rule

Never trust a `schoolId` sent by a client. For models with direct `schoolId`, derive the tenant from the authenticated user and include it in every read/write filter. For child models without a direct `schoolId`, scope through their school-owned parent relation before access.

## API convention

API Route Handlers live under `src/app/api` and return:

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

Authentication endpoints follow the same envelope.

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
