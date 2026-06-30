
# UI Registry

> This document is the central registry for every reusable UI component in the Klick ONN Finvest & Air Travels platform.
>
> It serves as the design system inventory and implementation reference for both developers and AI coding agents.
>
> Before creating a new component, always consult this document to determine whether an existing component can be reused or extended.
>
> Avoid duplicate components. Prefer extending existing ones whenever possible.

---

# Purpose

The UI Registry exists to:

- Prevent duplicate components.
- Maintain a consistent user experience.
- Document reusable UI patterns.
- Improve maintainability.
- Help AI understand the component ecosystem.
- Keep the design system organized.

Every reusable component should be documented here.

---

# Component Lifecycle

Every component belongs to one of four stages.

🟡 Planned

The component has been identified but has not been implemented.

---

🟠 In Development

The component is actively being built.

---

🟢 Completed

The component is production ready.

---

🔴 Deprecated

The component should no longer be used.

---

# Component Template

Every component should follow this template.

---

## Component Name

Status

Category

Purpose

Location

Used By

Dependencies

Props

Variants

Accessibility Notes

Responsive Behaviour

Related Components

Future Improvements

Last Updated

---

# Component Categories

## Layout

- PageContainer
- Section
- Container
- Grid
- Stack
- Divider

---

## Navigation

- Navbar
- Mobile Menu
- Navigation Link
- Breadcrumb
- Footer
- Pagination

---

## Hero

- Hero
- Hero Badge
- Hero Actions
- Hero Statistics

---

## Buttons

- Button
- Icon Button
- CTA Button
- Floating Action Button

---

## Cards

- Service Card
- Feature Card
- Destination Card
- Testimonial Card
- Team Card
- Blog Card

---

## Forms

- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Contact Form
- Consultation Form

---

## Feedback

- Toast
- Alert
- Skeleton
- Empty State
- Error State
- Loading Spinner

---

## Content

- Section Heading
- FAQ Accordion
- Timeline
- Testimonial Carousel
- Logo Cloud

---

## Media

- Image
- Gallery
- Video
- Map
- Avatar

---

## Overlays

- Dialog
- Drawer
- Sheet
- Tooltip
- Popover

---

# Registry

---

## Navbar

Status

🟡 Planned

Category

Navigation

Purpose

Primary navigation for the public website.

Location

components/layout/navbar.tsx

Used By

All public pages.

Dependencies

- shadcn/ui
- Motion
- Lucide

Variants

Desktop

Mobile

Transparent

Scrolled

Accessibility

Keyboard navigation required.

ARIA labels required.

Current page should be announced.

---

## Button

Status

🟡 Planned

Category

Buttons

Purpose

Primary reusable button component.

Location

components/ui/button.tsx

Used By

Entire application.

Variants

Primary

Secondary

Outline

Ghost

Destructive

Link

Loading

Icon

Sizes

Small

Medium

Large

Accessibility

Keyboard accessible.

Visible focus state.

Loading state announced correctly.

---

## Service Card

Status

🟡 Planned

Category

Cards

Purpose

Display business services.

Used By

Home

Services

Investment

Travel

Insurance

Visa

Variants

Default

Featured

Compact

Future

Interactive version.

---

## Contact Form

Status

🟡 Planned

Category

Forms

Purpose

Generate customer enquiries.

Dependencies

React Hook Form

Zod

Resend

Variants

General

Consultation

Callback

Accessibility

Every input must have a label.

Error messages must be announced.

Submit button must have loading state.

---

# Component Rules

Before creating a component ask:

Does a similar component already exist?

↓

YES

Reuse it.

↓

NO

Can an existing component be extended?

↓

YES

Extend it.

↓

NO

Create a new reusable component.

Document it immediately.

---

# Registry Rules

Every reusable component must be documented.

Every component should have one responsibility.

Avoid generic components that attempt to solve unrelated problems.

Prefer composition over configuration.

Never allow undocumented reusable components to exist inside the project.

---

# Updating This File

Update this registry whenever:

- A reusable component is created.
- A component is removed.
- A component is renamed.
- A component is deprecated.
- New variants are introduced.
- Component responsibilities change.

This document should always reflect the current design system.

---

# Final Principle

The UI Registry is the single source of truth for reusable components.

If a component is not documented here, it should not be considered part of the project's design system.

Every reusable component should be discoverable, understandable, and maintainable without reading its implementation.