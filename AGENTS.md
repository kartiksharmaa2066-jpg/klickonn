<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

> **Project:** Klick ONN Finvest & Air Travels
>
> This document is the single source of truth for every AI coding agent, developer, designer, or contributor working on this repository.
>
> Before writing, modifying, refactoring, or deleting any code, this document **must** be read completely.
>
> This repository is designed to be AI-first. Every architectural decision, implementation, and documentation update should align with the rules defined here.

---

# Read This First

Before implementing **any** feature, read the project documentation in the following order.

1. AGENTS.md
2. context/project-overview.md
3. context/architecture.md
4. context/build-plan.md
5. context/code-standards.md
6. context/ui-tokens.md
7. context/ui-rules.md
8. context/ui-registry.md
9. context/library-docs.md
10. context/progress-tracker.md

Never skip documents.

If information is missing or conflicts with another document, stop implementation and ask for clarification instead of making assumptions.

---

# Purpose

This project is more than a company website.

It is the digital representation of **Klick ONN Finvest & Air Travels**, a consultancy firm that assists individuals, families, professionals, students, business travellers, and investors with financial and travel-related services.

The objective is not simply to display information.

The objective is to establish trust, educate visitors, simplify communication, and generate qualified enquiries.

Every feature, page, animation, interaction, and component should contribute to those goals.

---

# Project Identity

Project Name

Klick ONN Finvest & Air Travels

Business Type

Financial & Travel Consultancy

Primary Platform

Multi-Page Application (MPA)

Current Phase

Version 1 (Business Website)

Repository Type

Full-stack web application with an initial focus on public-facing pages and business operations.

---

# Business Context

Klick ONN is a consultancy business.

It is **not** a stock trading platform.

It is **not** an online investment platform.

It is **not** an airline booking engine.

It is **not** an e-commerce platform.

The company provides consultation and assistance for services such as:

- Mutual Funds
- SIP Investments
- Gold ETFs
- Silver Investments
- Life Insurance
- Health Insurance
- General Insurance
- Retirement Planning
- Flight Bookings
- Hotel Reservations
- Visa Assistance
- Tour Packages
- Group & Corporate Travel

The website exists to communicate these services professionally and encourage potential clients to contact the consultancy.

---

# Mission

Create a premium digital experience that reflects the professionalism, trust, and expertise of Klick ONN.

The platform should make visitors feel confident enough to contact the company for financial or travel consultation.

The website should remove confusion, answer common questions, and guide users toward meaningful actions such as calling, sending a WhatsApp message, requesting a consultation, or submitting an enquiry.

---

# Vision

Build a scalable digital platform that grows with the business.

Version 1 focuses on establishing credibility and generating enquiries.

Future versions may introduce business tools, content management, appointment scheduling, document uploads, customer dashboards, or additional services.

The architecture should support growth without requiring a complete rebuild.

---

# Core Goals

The project must prioritize the following goals.

## Build Trust

The interface should communicate professionalism and reliability.

Visitors should immediately understand that Klick ONN is a consultancy firm, not a generic travel agency.

---

## Increase Enquiries

Every important page should naturally guide users toward contacting the business.

Examples include:

- Phone calls
- WhatsApp conversations
- Consultation requests
- Contact form submissions

---

## Educate Visitors

Users should clearly understand each service before contacting the company.

Avoid vague marketing language.

Explain services simply and honestly.

---

## Maintain Accuracy

Business information must always be factual.

Never fabricate information to improve appearance.

Accuracy is more valuable than impressive-looking content.

---

## Long-Term Maintainability

The codebase should remain modular, scalable, and easy to understand.

Avoid unnecessary complexity.

Future developers and AI agents should understand the project quickly.

---

# Non-Goals

The following are intentionally outside the scope of Version 1 unless explicitly requested by the business owner.

- Stock trading platform
- Investment portfolio management
- Client investment dashboards
- Airline booking engine
- Online payment gateway
- Customer authentication
- Mobile application
- Real-time trading
- Cryptocurrency features
- Financial return calculators requiring regulated advice

These features should not be implemented without updated business requirements.

---

# Project DNA

Every contributor should understand the identity of this project before making technical decisions.

This project is built around trust.

It represents a consultancy business whose value comes from professional guidance rather than selling products directly.

The website should feel calm, premium, informative, and reliable.

If a proposed feature does not improve trust, clarity, usability, or enquiry generation, its necessity should be questioned.

Technology exists to support the business.

The business should never be reshaped simply to fit a technical preference.

---

# Golden Rules

These rules apply to every contributor and AI agent working on this repository.

- Never invent business information.
- Never create fake testimonials.
- Never create fake customer statistics.
- Never fabricate certifications or awards.
- Never display partner logos without confirmation.
- Never promise financial returns.
- Never guarantee visa approval.
- Never assume legal or regulatory approvals.
- Never replace factual content with marketing hype.
- Never sacrifice accessibility for visual effects.
- Never implement features that have not been approved.
- Keep documentation synchronized with implementation.
- Prefer simplicity over unnecessary abstraction.
- Optimize for long-term maintainability.
- Every decision should benefit the end user first.

---
# AI Development Workflow

Every AI agent working on this repository must follow the same workflow regardless of the model being used.

Do not immediately begin writing code after receiving a request.

Always understand the problem before proposing a solution.

The expected workflow is:

Understand Business Requirement

↓

Read Required Documentation

↓

Understand Existing Architecture

↓

Determine Scope

↓

Plan Implementation

↓

Implement Feature

↓

Verify Functionality

↓

Update Documentation

↓

Mark Progress

Skipping any of these steps creates technical debt and documentation drift.

---

# Technology Stack

The project intentionally uses a modern, lightweight, scalable stack.

Every dependency exists because it solves a real problem.

Avoid adding libraries without approval.

## Framework

- Next.js 16
- React 19
- TypeScript

App Router is the standard.

Server Components should be preferred whenever client-side interactivity is unnecessary.

---

## Styling

- Tailwind CSS v4

Styling should rely on utility classes.

Avoid writing large custom CSS files unless absolutely necessary.

---

## UI Components

- shadcn/ui
- Radix UI
- Lucide React

Reusable components should always be preferred over page-specific implementations.

---

## Animations

- Motion

Animations should enhance usability.

Avoid animations that distract users from important information.

Performance always takes priority over visual effects.

---

## Database

- Neon PostgreSQL

Primary relational database.

---

## ORM

- Drizzle ORM
- Drizzle Kit

Database schema changes must always be reflected through migrations.

Never manually modify production database structures.

---

## Data Fetching

- TanStack Query

Use for client-side server state only.

Avoid unnecessary global state.

---

## Forms

- React Hook Form
- Zod
- @hookform/resolvers

Every form should have validation.

Validation must exist both on the client and the server whenever applicable.

---

## Email

- Resend
- React Email

Emails should use reusable templates.

Never hardcode HTML email strings inside route handlers.

---

## Analytics

- PostHog
- Vercel Analytics
- Vercel Speed Insights

Analytics should improve product decisions rather than collect unnecessary user data.

Respect user privacy.

---

## Notifications

- Sonner

Used for temporary UI feedback.

---

## Deployment

- Vercel

Deployment configuration should remain as simple as possible.

---

# Folder Philosophy

Every folder has a clear responsibility.

Avoid mixing unrelated concerns.

The project should remain understandable without opening dozens of files.

Pages display content.

Components build interfaces.

Hooks contain reusable logic.

Utilities contain pure helper functions.

Database contains schema and queries.

Context contains documentation.

Public contains static assets.

Configuration belongs in configuration files rather than application logic.

---

# Development Philosophy

Every implementation should answer three questions.

Why does this feature exist?

Who benefits from it?

How does it improve the business?

If these questions cannot be answered clearly, reconsider the implementation.

---

# Architecture Principles

Keep modules independent.

Prefer composition over inheritance.

Prefer reusable components over duplicated code.

Prefer server rendering whenever possible.

Keep client components as small as possible.

Never create abstractions before they are needed.

Build for long-term maintainability rather than short-term convenience.

---

# Component Philosophy

Every component should have one responsibility.

Avoid components that attempt to solve multiple unrelated problems.

When a component becomes difficult to understand, split it into smaller reusable pieces.

Reusable components belong inside the shared component library.

Business-specific components should remain inside feature folders.

---

# State Management

Avoid global state unless absolutely necessary.

Use:

Server Components

↓

Props

↓

Local State

↓

TanStack Query

Only introduce additional state management libraries after demonstrating a genuine need.

---

# Data Philosophy

The application should display real business information.

Never fabricate:

- statistics
- awards
- testimonials
- certifications
- partnerships
- customer numbers

If data is unavailable, design around the absence of data instead of inventing it.

---

# Error Handling

Errors should never expose internal implementation details.

Users should receive clear, helpful messages.

Developers should receive meaningful logs.

Every network request should anticipate failure.

Every form submission should handle validation errors gracefully.

---

# Security Philosophy

Validate every input.

Never trust client-side validation.

Sanitize user input.

Protect sensitive environment variables.

Never expose secrets in the frontend.

Apply the principle of least privilege whenever permissions are introduced.

---

# Performance Philosophy

Performance is a feature.

Every implementation should minimize:

- JavaScript
- Layout shifts
- Network requests
- Bundle size

Prefer server rendering.

Lazy load heavy assets.

Optimize images.

Avoid unnecessary animations.

Accessibility and performance should never be sacrificed for visual appeal.

---

# Definition of Done

A feature is considered complete only when all of the following are true.

✓ Business requirement satisfied

✓ Responsive

✓ Accessible

✓ Type-safe

✓ Error handling complete

✓ Loading states implemented

✓ Empty states implemented

✓ Documentation updated

✓ Progress tracker updated

✓ Ready for production

Writing code alone does not complete a feature.

Documentation is part of the implementation.
---

# AI Decision Framework

This repository is designed for autonomous AI-assisted development.

Every AI agent should make decisions using the following framework before implementing any feature.

Never optimize only for code.

Always optimize for the business.

---

# Decision Tree — Before Writing Code

Ask yourself the following questions.

Does this feature solve a real business problem?

↓

Does it improve the user experience?

↓

Does it align with the project scope?

↓

Does similar functionality already exist?

↓

Can the existing implementation be extended instead?

↓

If all answers support implementation, proceed.

Otherwise stop and ask for clarification.

---

# Decision Tree — Creating Components

Before creating a new component ask:

Can an existing component be reused?

↓

If YES

Extend the existing component.

↓

If NO

Determine whether the component is reusable.

↓

If reusable

Place it inside the shared components directory.

↓

If business specific

Keep it inside the appropriate feature folder.

Avoid creating reusable components that are only used once.

Avoid duplicate UI.

---

# Decision Tree — Client vs Server Components

Default choice:

Server Component.

Only use a Client Component when required.

Client Components are justified for:

- Forms
- Interactive UI
- Event listeners
- Local state
- Browser APIs
- Motion animations
- TanStack Query
- Theme switching

Everything else should remain a Server Component.

Reducing unnecessary client JavaScript improves performance.

---

# Decision Tree — Data Fetching

Can the data be rendered on the server?

↓

YES

Fetch inside the Server Component.

↓

NO

Use TanStack Query.

Never fetch identical data twice.

Never create unnecessary API layers.

---

# Decision Tree — Database Changes

Before modifying the database ask:

Is this schema required?

↓

Can an existing table support it?

↓

Will it affect existing features?

↓

Create migration

↓

Update schema documentation

↓

Test migration

Never edit production schemas manually.

---

# Decision Tree — Adding Dependencies

Before installing any package ask:

Can this be solved with native APIs?

↓

YES

Do not install a dependency.

↓

NO

Can an existing dependency solve it?

↓

YES

Reuse existing libraries.

↓

NO

Evaluate

- Maintenance
- Bundle size
- Community support
- Documentation
- Long-term stability

Only then install it.

Every dependency increases project complexity.

Keep the stack intentionally small.

---

# Decision Tree — Adding Features

Every proposed feature must satisfy at least one of these goals.

✓ Builds trust

✓ Educates visitors

✓ Improves accessibility

✓ Improves usability

✓ Generates enquiries

✓ Improves maintainability

✓ Improves SEO

✓ Improves performance

If none apply, question the feature before implementation.

---

# Decision Tree — Content

Business content must always be factual.

If business information is unavailable

DO NOT

- invent numbers
- invent testimonials
- invent reviews
- invent certifications
- invent partners
- invent statistics

Instead

Leave placeholders only if approved by the developer.

Request the information.

Design around missing data.

Truth always takes priority over aesthetics.

---

# Documentation Responsibilities

Documentation is part of the codebase.

Whenever implementation changes, documentation must remain synchronized.

Every completed feature should update the relevant files.

progress-tracker.md

Record implementation progress.

---

architecture.md

Update if project structure changes.

---

build-plan.md

Update roadmap progress.

---

ui-registry.md

Register every reusable component.

---

ui-tokens.md

Update if new design tokens are introduced.

---

ui-rules.md

Update if new design patterns are established.

---

library-docs.md

Document newly introduced libraries.

---

project-overview.md

Update if business scope changes.

Never allow documentation drift.

---

# Communication Style

AI should communicate professionally.

When uncertainty exists

Ask.

Never guess.

Never fabricate.

Never assume business requirements.

When multiple solutions exist

Explain trade-offs.

Recommend one.

Allow the developer to make the final decision.

---

# Code Review Checklist

Before considering any implementation complete verify:

□ Requirement satisfied

□ Code readable

□ Type safe

□ Accessible

□ Responsive

□ Performance acceptable

□ No duplicated logic

□ Components reusable

□ No unnecessary dependencies

□ Documentation updated

□ Progress tracker updated

□ Ready for production

If any checkbox fails

The feature is not complete.

---

# Repository Philosophy

This repository should remain understandable years from now.

Future contributors should be able to understand the architecture without asking the original developer.

Optimize for clarity.

Optimize for consistency.

Optimize for maintainability.

Every file should have a purpose.

Every component should have a responsibility.

Every dependency should justify its existence.

Every decision should improve the product rather than simply increasing technical sophistication.

Software quality is measured by long-term maintainability, not by the number of technologies used.
# North Star

Whenever multiple implementation choices are possible, choose the option that best balances:

1. Business value
2. User experience
3. Simplicity
4. Performance
5. Accessibility
6. Maintainability

Technology is a tool.

The success of this project is measured by how effectively it helps Klick ONN build trust and generate qualified enquiries—not by how many frameworks, libraries, or animations it contains.
