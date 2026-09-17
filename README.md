# EduSphere

EduSphere is a multi-school school management system built with Next.js, TypeScript, PostgreSQL, and Prisma. The repository currently implements the project foundation and the database model required by the system requirements specification (SRS), while leaving business workflows, authentication, and module-specific APIs for later implementation phases.

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

## Current implementation status

This repository is at the foundation/database phase and intentionally does not yet include complete business workflows.

### Implemented in this repository

- Next.js App Router project structure
- TypeScript configuration and app shell
- Dashboard and landing pages
- shared layout and route boundaries
- Prisma multi-file schema foundation
- PostgreSQL schema modeling for the core SRS entities
- health check endpoint for database connectivity
- API response conventions

### Not yet implemented

- authentication and session management
- role-based authorization enforcement
- school onboarding workflows
- student admissions workflows
- attendance processing workflows
- examination/result processing
- fee payment workflows
- notification delivery
- reporting APIs and analytics
- production-ready seed data or demo data

## Tech stack

- Next.js 16
- React 19
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS

## Repository structure

```text
.
├── prisma/
│   ├── schema.prisma
│   ├── core.prisma
│   ├── academic.prisma
│   ├── finance.prisma
│   ├── library-inventory.prisma
│   ├── system.prisma
│   └── README.md
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── doc/
│   ├── lib/
│   └── types/
├── .env.example
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

## Environment setup

1. Copy `.env.example` to `.env.local`
2. Set `DATABASE_URL` to your PostgreSQL connection string
3. Install the required dependencies:

```bash
npm install
```

4. Generate Prisma client:

```bash
npm run db:generate
```

5. Apply the current schema locally:

```bash
npm run db:push
```

For versioned development migrations:

```bash
npm run db:migrate
```

To open Prisma Studio:

```bash
npm run db:studio
```

To validate the Prisma schema:

```bash
npm run db:validate
```

## API health check

The application exposes a real database connectivity check at:

- `GET /api/health`

Behavior:

- returns `503` if `DATABASE_URL` is missing
- returns `503` if PostgreSQL is unavailable
- otherwise returns a healthy response payload

## Security and data boundary

The system follows the SRS direction that school ownership is explicit and tenant-aware. The data model keeps `School` as the top-level ownership boundary, and future authentication and authorization layers must enforce school-scoped access on the server side rather than trusting client-supplied school IDs.

## Development principle

The repository follows the SRS-driven development sequence:

1. foundation and architecture
2. database and Prisma modeling
3. authentication and authorization
4. academic and operational modules
5. reporting, security, and deployment readiness

## Notes

- no production secrets or credentials should be committed
- no demo school/user records are included in this foundation phase
- this project is intentionally structured so later modules can be added in planned, dependency-safe phases
