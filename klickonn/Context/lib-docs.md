
# Library Documentation

> This document is the central index for every external library used in this project.
>
> AI coding agents should read this file before opening any library-specific documentation.
>
> Each library has its own dedicated documentation file inside `context/libraries/`.

---

# Purpose

These documents exist because AI coding agents may rely on outdated training data or deprecated implementation patterns.

The documentation in this directory provides:

- Current project conventions
- Library-specific best practices
- Preferred APIs
- Anti-patterns to avoid
- Official documentation
- Migration notes (when required)

Always follow the project documentation first, then consult the official documentation if additional clarification is required.

---

# Library Index

| Library | Local Documentation | Official Documentation |
|----------|---------------------|------------------------|
| Next.js 16 | `context/libraries/nextjs.md` | [Next.js Documentation](https://reference-url-citation.invalid/0) |
| React 19 | `context/libraries/react.md` | [React Documentation](https://reference-url-citation.invalid/1) |
| Tailwind CSS v4 | `context/libraries/tailwind.md` | [Tailwind CSS Documentation](https://reference-url-citation.invalid/2) |
| shadcn/ui | `context/libraries/shadcn.md` | [shadcn/ui Documentation](https://reference-url-citation.invalid/3) |
| Motion | `context/libraries/motion.md` | [Motion Documentation](https://reference-url-citation.invalid/4) |
| TanStack Query | `context/libraries/tanstack-query.md` | [TanStack Query Documentation](https://reference-url-citation.invalid/5) |
| Drizzle ORM | `context/libraries/drizzle.md` | [Drizzle ORM Documentation](https://reference-url-citation.invalid/6) |
| Neon PostgreSQL | `context/libraries/neon.md` | [Neon Documentation](https://reference-url-citation.invalid/7) |
| Zod | `context/libraries/zod.md` | [Zod Documentation](https://reference-url-citation.invalid/8) |
| React Hook Form | `context/libraries/react-hook-form.md` | [React Hook Form Documentation](https://reference-url-citation.invalid/9) |
| Resend | `context/libraries/resend.md` | [Resend Documentation](https://reference-url-citation.invalid/10) |
| React Email | `context/libraries/react-email.md` | [React Email Documentation](https://reference-url-citation.invalid/11) |
| Lucide React | `context/libraries/lucide.md` | [Lucide Documentation](https://reference-url-citation.invalid/12) |
| PostHog | `context/libraries/posthog.md` | [PostHog Documentation](https://reference-url-citation.invalid/13) |
| Sonner | `context/libraries/sonner.md` | [Sonner Documentation](https://reference-url-citation.invalid/14) |
| Radix UI | `context/libraries/radix.md` | [Radix UI Documentation](https://reference-url-citation.invalid/15) |
| CVA | `context/libraries/cva.md` | [Class Variance Authority Documentation](https://reference-url-citation.invalid/16) |
| clsx | `context/libraries/clsx.md` | [clsx Documentation](https://reference-url-citation.invalid/17) |
| tailwind-merge | `context/libraries/tailwind-merge.md` | [tailwind\-merge Documentation](https://reference-url-citation.invalid/18) |
| date-fns | `context/libraries/date-fns.md` | [date\-fns Documentation](https://reference-url-citation.invalid/19) |
| Vercel | `context/libraries/vercel.md` | [Vercel Documentation](https://reference-url-citation.invalid/20) |

---

# Required Reading

When implementing a feature:

1. Read `AGENTS.md`
2. Read the required context documents.
3. Open this file.
4. Identify every library involved.
5. Read the corresponding library documentation inside `context/libraries/`.
6. Implement the feature using the documented project conventions.

Never assume APIs or patterns based solely on prior knowledge.

---

# Updating Library Documentation

Whenever a dependency receives a major update:

- Review the official release notes.
- Update the corresponding library document.
- Record breaking changes.
- Update recommended implementation patterns.
- Remove deprecated APIs.
- Update project-specific conventions if necessary.

Library documentation should evolve alongside the codebase and remain synchronized with the versions used in this repository.