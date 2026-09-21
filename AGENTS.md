# AGENTS.md

This repository is a Next.js-based school management platform called EduSphere. Use these instructions when working with AI coding agents in this project.

## Project overview

- Stack: Next.js 16, React 19, TypeScript, Prisma, PostgreSQL
- Primary app entry: `src/app`
- Database schema: `prisma/`
- Auth and tenant rules: `src/lib/auth/` and `src/lib/tenant/`
- Project docs: `README.md`, `prisma/README.md`, and `src/doc/`

## Installed skill rules

- This repo currently includes installed skill packs under `.agents/skills`.
- Use the relevant skill only when the task matches its domain; do not force unrelated skills into every request.
- For authentication and user/session work, prefer the `clerk` router and the specific Clerk sub-skills it points to (for example: setup, CLI, Next.js patterns, orgs, billing, webhooks, testing, or custom UI).
- For Sanity content/schema work, prefer `sanity-best-practices` and related Sanity skills for schema design, GROQ, Portable Text, image handling, migration, and studio configuration.
- If a task involves a framework-specific integration, use the dedicated pattern skill instead of generic advice.
- Do not modify or reinstall the skills package as part of normal app work unless the user explicitly asks to change tool configuration.
- Keep skill usage aligned with the project’s actual architecture: this repository is a multi-tenant school management system, not a generic SaaS or CMS app.

## Development workflow

- Use the dev server for iteration: `npm run dev`
- Do not run production builds during agent sessions unless explicitly requested
- Use the project scripts in `package.json` instead of inventing custom commands
- Keep changes scoped to the task and avoid unrelated refactors

## Database and Prisma rules

- If Prisma schema changes, validate with `npm run db:validate`
- Regenerate the client with `npm run db:generate` when needed
- Prefer Prisma models and server-side queries over ad-hoc SQL
- Do not commit secrets or local environment files containing credentials

## Security and tenant constraints

- Never trust a client-provided `schoolId`
- Resolve the authenticated tenant from the server-side session and database user
- Enforce school-scoped access for every read/write operation involving tenant data
- Follow the authorization primitives in `src/lib/auth/` and `src/lib/tenant/`

## Coding conventions

- Prefer TypeScript and framework-native patterns used by the existing app
- Follow the Next.js App Router structure under `src/app`
- Keep modules organized by domain and feature area
- Reuse existing shared UI and auth helpers before creating new abstractions
- Keep API responses consistent with the project’s standard envelope and patterns

## Validation before completion

- Run `npm run lint` after code changes when feasible
- Run targeted validation for changed functionality
- If Prisma models changed, validate the schema before finishing
- Verify the change matches the task and does not introduce unwanted side effects

## Safety rules

- Do not add production credentials, demo school data, or fake user records
- Do not change auth/session logic without preserving tenant isolation
- Do not overwrite existing project conventions unless the task explicitly requires it
- Keep the repo aligned with the documented school management system requirements

## Useful commands

```bash
npm install
npm run dev
npm run lint
npm run db:validate
npm run db:generate
npm run db:push
npm run db:migrate
```

## PR expectations

- Keep commit scope focused on the requested task
- Explain any schema or auth changes clearly
- Ensure lint and schema validation pass before finalizing work
