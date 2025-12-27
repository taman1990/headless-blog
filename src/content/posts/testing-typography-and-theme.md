---
title: "Testing Typography, Themes, and Layout"
description: "A full-coverage test post to validate typography, dark/light themes, spacing, code blocks, lists, tables, and content rhythm."
date: "2025-03-27"
tags: ["testing", "typography", "tailwind", "nextjs", "design"]
---

## Why This Post Exists

This post is **not content** — it’s a **stress test**.

If this page looks good in:
- dark mode 🌑
- light mode ☀️
- mobile 📱
- desktop 🖥️  

Then your design system is solid.

---

## Headings Hierarchy

### H3 — Section Heading
#### H4 — Subsection
##### H5 — Minor heading

Typography should:
- scale naturally
- maintain rhythm
- not feel cramped or floaty

---

## Paragraphs & Emphasis

This is a normal paragraph. It should be readable, calm, and balanced.  
Line length matters. Contrast matters.

**Bold text** should feel strong, not aggressive.  
*Italic text* should be subtle, not decorative.  
Inline code like `npm run dev` should stand out without screaming.

---

## Links

Here’s a normal inline link to  
[Next.js documentation](https://nextjs.org/docs).

Hover color, underline behavior, and contrast should all feel intentional.

---

## Lists

### Unordered list

- Fast
- Minimal
- Developer-friendly
- Dark-mode first

### Ordered list

1. Design tokens
2. Typography
3. Layout
4. Content
5. Polish

Spacing between items matters more than you think.

---

## Blockquotes

> Good typography is invisible.  
> Bad typography makes people leave.

Blockquotes should feel calm and intentional — not like a warning box.

---

## Code Blocks

### JavaScript

```js
export function themeToggle(theme) {
  if (theme === "dark") {
    return "light";
  }
  return "dark";
}
