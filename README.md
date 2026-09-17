# EduSphere

EduSphere is a multi-tenant school management platform for primary and secondary schools. The architecture is based on a single hosted Next.js application serving independent school tenants with isolated data and configurable academic and fee settings.

## Phase 1 — Foundation

This branch establishes the application foundation described by the EduSphere SRS and development plan. The repository currently uses Next.js App Router, TypeScript, and Tailwind CSS. The existing repository is a fresh Next.js application, so Phase 1 replaces the starter UI with the agreed foundation without implementing business workflows.

### Foundation structure

```text
.
├── prisma/                         # Database/Prisma foundation; implemented in Phase 2
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Authentication routes; Phase 3
│   │   ├── dashboard/              # Shared dashboard shell
│   │   ├── students/               # Phase 7
│   │   ├── teachers/               # Phase 8
│   │   ├── parents/                # Phase 8
│   │   ├── classes/                # Phase 6
│   │   ├── subjects/               # Phase 6
│   │   ├── academics/              # Phase 6
│   │   ├── attendance/             # Phase 9
│   │   ├── examinations/           # Phase 10
│   │   ├── results/                # Phase 11
│   │   ├── finance/                # Phase 12
│   │   ├── library/                # Phase 13
│   │   ├── inventory/              # Phase 14
│   │   ├── notifications/          # Phase 15
│   │   ├── reports/                # Phase 16
│   │   ├── settings/               # Administration/settings phases
│   │   └── api/
│   │       └── health/             # Initial infrastructure health endpoint
│   ├── components/
│   │   ├── forms/                  # Shared form components
│   │   ├── layout/                 # Root/dashboard layout components
│   │   ├── shared/                 # Cross-module components
│   │   └── ui/                     # Reusable UI primitives
│   ├── config/                     # Application configuration
│   ├── hooks/                      # Shared React hooks
│   ├── lib/
│   │   ├── api/                    # API contracts/helpers
│   │   └── db/                     # Database access layer; Phase 2
│   └── types/                      # Shared TypeScript types
├── .env.example
└── README.md
```

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

See `src/lib/api/README.md` for the foundation rules. The first endpoint is `GET /api/health` and performs no database or business operation.

## Environment

Copy `.env.example` to `.env.local` for local development. Real secrets must never be committed. Database and authentication variables are intentionally placeholders for their later phases.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Phase 1 scope boundary

Phase 1 does **not** implement authentication, authorization, tenant management, students, teachers, parents, academics, attendance, examinations, results, finance, library, inventory, notifications, reporting, or other business workflows. Those modules have only been scaffolded so later phases have stable route boundaries.

The foundation also does not create fake records, mock dashboards, placeholder business metrics, or simulated workflows.
