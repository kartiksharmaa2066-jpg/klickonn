
# Code Standards

> This document defines the coding standards for the Klick ONN Finvest & Air Travels platform.
>
> Every developer and AI coding agent must follow these standards to ensure consistency, maintainability, scalability, and production-quality code.
>
> These rules are not suggestions. They are the project's coding conventions.

---

# Philosophy

Good code is:

- Readable
- Predictable
- Type-safe
- Modular
- Maintainable
- Consistent

The project should be understandable by a developer joining months later.

Optimize for readability over cleverness.

---

# General Principles

Write code for humans first.

Avoid unnecessary abstraction.

Avoid premature optimization.

Prefer explicit code over implicit behavior.

Every file should have one responsibility.

Every function should have one purpose.

---

# TypeScript

TypeScript is mandatory.

Never disable type checking.

Avoid `any`.

Prefer:

- `type`
- `interface`
- Generics
- Union Types
- Utility Types

When unsure, create a proper type instead of using `unknown` or `any`.

---

# Naming Conventions

## Components

PascalCase

Examples

Button.tsx

Navbar.tsx

ServiceCard.tsx

InvestmentSection.tsx

---

## Hooks

camelCase

Always begin with `use`

Examples

useScroll.ts

useMediaQuery.ts

useContactForm.ts

---

## Utility Functions

camelCase

Examples

formatCurrency.ts

cn.ts

slugify.ts

formatPhone.ts

---

## Constants

UPPER_SNAKE_CASE

Examples

DEFAULT_PAGE_SIZE

MAX_UPLOAD_SIZE

---

## Database Tables

snake_case

Examples

contact_requests

blog_posts

service_categories

---

## Environment Variables

UPPER_SNAKE_CASE

Examples

DATABASE_URL

POSTHOG_KEY

RESEND_API_KEY

---

# Folder Structure

Keep folders shallow.

Avoid deeply nested directories.

Feature-related code should remain together.

Shared logic belongs in shared folders.

Business logic should never be placed inside UI components.

---

# Import Order

Always organize imports.

1.

React / Next

2.

Third-party packages

3.

Internal aliases

4.

Relative imports

Example

```tsx
import Link from "next/link";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
```

---

# Component Standards

One component.

One responsibility.

Avoid components longer than approximately 250–300 lines.

Split large components into smaller reusable pieces.

Prefer composition over inheritance.

---

# Server Components

Server Components are the default.

Only convert to Client Components when required.

Examples requiring client components:

- Forms
- Local state
- Browser APIs
- Motion
- Event listeners

---

# Client Components

Only add:

```tsx
"use client";
```

when necessary.

Never mark an entire page as client-side unless absolutely required.

---

# Props

Always define props explicitly.

Example

```tsx
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};
```

Avoid implicit props.

---

# Functions

Functions should:

Do one thing.

Have descriptive names.

Avoid side effects.

Remain small.

---

# Comments

Write self-documenting code.

Avoid unnecessary comments.

Comment only when explaining:

- Business logic
- Complex algorithms
- Important decisions

Never comment obvious code.

---

# Styling

Use Tailwind CSS.

Avoid inline styles.

Avoid large custom CSS files.

Use reusable utility classes.

Extract repeated patterns into reusable components.

---

# Error Handling

Every async operation should handle failure.

Provide meaningful user feedback.

Never expose internal implementation details.

---

# Forms

Every form should include:

Client validation

Server validation

Loading state

Success state

Error state

Disabled submit button while processing

---

# Data Fetching

Prefer Server Components.

Use TanStack Query only for client-side server state.

Avoid duplicate requests.

---

# Database

Every schema change requires:

Migration

Type updates

Documentation update

Never modify production schema manually.

---

# Accessibility

Every component should support:

Semantic HTML

Keyboard navigation

Visible focus states

ARIA attributes where required

Accessible labels

---

# Performance

Prefer:

Server rendering

Optimized images

Lazy loading

Minimal JavaScript

Avoid unnecessary re-renders.

---

# Reusability

Before creating new code ask:

Can something similar be reused?

If yes

Reuse it.

If no

Create a reusable implementation if appropriate.

Avoid duplicate code.

---

# Security

Validate every input.

Never trust the client.

Never expose secrets.

Protect environment variables.

Sanitize user input.

---

# Documentation

Every completed feature should update:

- progress-tracker.md

Update when necessary:

- architecture.md
- ui-registry.md
- build-plan.md
- library-docs.md

Documentation is part of development.

A feature is not complete until documentation is synchronized.

---

# Pull Request Checklist

Before considering any implementation complete verify:

- Code compiles successfully
- No TypeScript errors
- No ESLint errors
- Responsive
- Accessible
- Performance acceptable
- No duplicated logic
- Documentation updated
- Progress tracker updated
- Production-ready

---

# Final Principle

Write code that your future self can understand without additional explanation.

Clarity is more valuable than cleverness.

Consistency is more valuable than personal preference.

Long-term maintainability is the primary objective of this repository.