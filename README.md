# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The application uses a single Next.js full-stack application with PostgreSQL and Prisma, with school ownership represented explicitly in the data model.

## Phase 1 — Foundation

The `phase-1-foundation` branch establishes the Next.js App Router foundation, shared layouts, UI directories, route boundaries, API conventions and application states without implementing business workflows.

## Phase 2 — Full database foundation

The database layer has now been expanded to cover the SRS core scope. The SRS defines PostgreSQL as the relational database and Prisma as the ORM, and requires centralized school data, secure role-based access and relational data integrity.

### Prisma organization

The Prisma schema is now organized into multiple `.prisma` files under `prisma/` while keeping `prisma/schema.prisma` as the main generator/datasource file. Prisma supports multi-file schemas in current Prisma 6 releases.

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

The database now includes:

- Schools and school configuration
- Users, roles, permissions and role-permission mapping
- Students, parents, guardians and parent/student relationships
- Student documents and admission records
- Teachers, qualifications and employee records
- Departments, classes and streams
- Subjects and teacher/class assignments
- Academic years, terms and academic calendar
- Timetables
- Student and teacher attendance
- Assessments and marks
- Examinations and examination schedules
- Result calculation data, approval states and publication states
- Grading policies and report cards
- Student enrollment, promotion, transfer and withdrawal records
- Fee categories and fee structures
- Discounts and scholarships
- Invoices, payments and receipts
- Library categories, authors, books, book copies and borrowings
- Inventory categories, suppliers, inventory items, purchases and stock movements
- Announcements and notifications
- School settings
- Documents
- Audit logs

These areas correspond to the SRS scope covering admissions, student/teacher/parent management, academics, attendance, examinations, results, finance, library, inventory, communication, reports and system administration.

### Tenant/data isolation foundation

`School` is the top-level school ownership boundary. School-owned records carry a direct school relationship or belong to a school-owned parent record. The future authentication and authorization layers must derive the active school from the authenticated server-side context and must not trust arbitrary school IDs supplied by clients.

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

`.github/workflows/database.yml` validates the Prisma schema and generates Prisma Client on relevant pushes and pull requests. This gives the database foundation an automated schema check before later business logic is added.

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

## Environment

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a PostgreSQL connection string. Never commit real credentials or secrets.

## Current scope boundary

This phase establishes the complete relational database foundation, not the business application itself. It deliberately does **not** implement authentication, session management, authorization enforcement, CRUD service actions, admissions workflows, attendance workflows, examination processing, result approval workflows, payment processing, notification delivery or reporting APIs.

There is intentionally no fake business data, demo users, fake schools, fake students or simulated dashboard statistics.
