
# UI Tokens

> This document defines the official design system tokens for the Klick ONN Finvest & Air Travels platform.
>
> Every page, component, animation, and interaction must follow these tokens.
>
> These values are the single source of truth for visual consistency.
>
> Never introduce new tokens without updating this document.

---

# Design Philosophy

The design system should communicate:

- Trust
- Professionalism
- Premium Quality
- Simplicity
- Reliability
- Confidence
- Modern Consultancy

The interface should never resemble a cluttered travel agency website.

Instead, it should feel closer to premium consulting firms, modern fintech products, and enterprise SaaS platforms.

Examples of the desired experience:

- Stripe
- Apple
- Linear
- Vercel
- Mercury
- Brex

The objective is clarity before decoration.

---

# Brand Colors

## Primary

Primary Blue

HEX

#0B3C91

Purpose

- Brand identity
- Primary buttons
- Active navigation
- Primary actions

---

## Secondary

Royal Blue

HEX

#2563EB

Purpose

- Links
- Interactive states
- Icons
- Highlights

---

## Accent

Accent Red

HEX

#D62828

Purpose

- Small highlights
- CTA emphasis
- Notifications

Never overuse this color.

---

# Neutral Palette

Background

#F8FAFC

Surface

#FFFFFF

Muted Surface

#F1F5F9

Border

#E2E8F0

Divider

#CBD5E1

---

# Text Colors

Primary

#0F172A

Secondary

#475569

Muted

#64748B

Disabled

#94A3B8

Inverse

#FFFFFF

---

# Semantic Colors

Success

#22C55E

Warning

#F59E0B

Error

#EF4444

Info

#0EA5E9

These colors should only communicate status.

Never use them as branding colors.

---

# Typography

Primary Font

Inter

Headings

Font Weight

700–800

Body

400–500

Letter spacing should remain minimal.

Avoid decorative fonts.

---

# Font Scale

Display

60px

Hero Heading

48px

H1

40px

H2

32px

H3

24px

H4

20px

Body Large

18px

Body

16px

Small

14px

Caption

12px

Use fluid typography where appropriate.

---

# Border Radius

Small

8px

Medium

12px

Large

16px

XL

24px

Full

9999px

Rounded corners should feel modern but not exaggerated.

---

# Spacing Scale

4

8

12

16

20

24

32

40

48

64

80

96

128

Use consistent spacing.

Never introduce arbitrary values.

---

# Shadows

Small

Cards

Medium

Dropdowns

Large

Floating Panels

Extra Large

Hero Elements

Shadows should remain soft and subtle.

Avoid heavy dark shadows.

---

# Borders

Default

1px

Strong

2px

Use borders sparingly.

Spacing should define layouts more than borders.

---

# Icons

Library

Lucide React

Standard Sizes

16

20

24

32

48

Icons should always match surrounding typography.

---

# Buttons

Primary

Solid Blue

Secondary

Outline

Ghost

Minimal

Destructive

Red

Icon Button

Square

Loading Button

Built-in loading state

Every button must have hover, active, disabled, and focus states.

---

# Cards

Default

White background

Soft border

Small shadow

Large padding

Hover

Subtle elevation

Slight border emphasis

No aggressive scaling.

---

# Forms

Inputs

Textarea

Select

Checkbox

Radio

Switch

Every form component must share:

- Border radius
- Border color
- Focus ring
- Typography
- Error styling

---

# Motion

Animations should feel intentional.

Default Duration

200ms–300ms

Page Transitions

300ms–500ms

Hover

150ms

Never use bounce animations.

Never use excessive motion.

Respect reduced motion preferences.

---

# Z-Index Scale

Navigation

100

Dropdown

200

Drawer

300

Modal

400

Toast

500

Tooltip

600

Avoid arbitrary z-index values.

---

# Breakpoints

Mobile

<640px

Tablet

640px–1024px

Laptop

1024px–1280px

Desktop

1280px+

Wide

1536px+

Layouts should adapt naturally without breaking hierarchy.

---

# Token Rules

Never hardcode colors.

Never hardcode spacing.

Never hardcode typography.

Always use design tokens.

When introducing a new token:

- Update this document.
- Ensure consistency across the project.
- Avoid duplicate values.

The design system should evolve deliberately rather than organically.