# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The application uses a single hosted Next.js full-stack application with PostgreSQL and Prisma, with school ownership represented explicitly in the data model.

## Phase 1 — Foundation

The `phase-1-foundation` branch establishes the Next.js App Router foundation, shared layouts, UI directories, route boundaries, API conventions and application states without implementing business workflows.

## Phase 2 — PostgreSQL + Prisma database foundation

Phase 2 adds the relational database foundation described by the School Management System SRS. The SRS specifies Next.js as the full-stack framework, PostgreSQL as the database and Prisma as the ORM. fileciteturn56file1L60-L71

### Database coverage

The Prisma schema includes the SRS database areas: schools, users, roles, permissions, students, parents, teachers, classes, subjects, academic years, terms, enrollments, attendance, assessments, marks, results, fees, invoices, payments, books, borrowings, notifications and audit logs. The SRS database design explicitly associates users and operational records with a school boundary. fileciteturn56file1L76-L83 fileciteturn63file0L12-L46 fileciteturn61file0L21-L104

### Phase 2 files

```text
prisma/
├── schema.prisma
└── README.md

src/lib/db/
├── index.ts
└── prisma.ts

src/lib/env.ts
src/app/api/health/route.ts
```

### Tenant boundary

`School` is the top-level school boundary. School-owned records reference the owning school directly or through a school-owned parent entity. Later service and authorization layers must always derive the school context from the authenticated user rather than accepting an arbitrary school identifier from the client.

### API health check

`GET /api/health` now performs a real PostgreSQL connectivity check. It returns `503` when `DATABASE_URL` is missing or the database cannot be reached; it does not fabricate a healthy database state.

## Database commands

```bash
npm install
npm run db:validate
npm run db:generate
npm run db:push
```

For versioned migrations:

```bash
npm run db:migrate
```

For Prisma Studio:

```bash
npm run db:studio
```

No seed script or fake records are included.

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

## Environment

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a PostgreSQL connection string. Never commit real credentials or secrets.

## Current scope boundary

Phase 2 defines the database structure and access foundation only. It does **not** implement authentication, authorization, admissions, student workflows, teacher workflows, attendance workflows, examination processing, result publication, finance operations, library workflows, reporting, notifications delivery, or other business operations.

There is intentionally no mock data, demo seed, fake dashboard metrics or simulated workflow.
