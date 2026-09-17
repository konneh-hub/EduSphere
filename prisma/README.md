# EduSphere Database Foundation

EduSphere uses PostgreSQL through Prisma. The schema is intentionally a foundation: it defines the relational model and integrity boundaries without creating seed records or implementing module workflows.

## Database model

The schema covers the entities defined by the School Management System SRS:

- School and tenant boundary
- Users, roles, permissions and role-permission mapping
- Students, parents and student-parent relationships
- Teachers and teacher assignments
- Classes and subjects
- Academic years, terms and enrollments
- Attendance
- Assessments, marks and results
- Fees, invoices and payments
- Library books and borrowings
- Notifications
- Audit logs

Every school-owned operational entity carries a `schoolId` relationship where appropriate. Application services must use the authenticated school context when querying or mutating tenant-owned data.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL` to a PostgreSQL database.
3. Install dependencies:

```bash
npm install
```

4. Generate the Prisma client:

```bash
npm run db:generate
```

5. During local development, apply the current schema:

```bash
npm run db:push
```

For a versioned production migration history, use:

```bash
npm run db:migrate
```

Do not run `db:push` against production databases as a substitute for reviewed migrations.

## No seed data

There is deliberately no `prisma/seed.ts` in this phase. Roles, permissions, schools, users and all other records will be introduced through their proper application workflows in later phases.
