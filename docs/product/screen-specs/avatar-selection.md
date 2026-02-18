# Avatar Selection (Target Acquisition)

## Purpose

- Let users pick *what categories* of apparel the system should generate/recommend next.
- Keep the interaction visual and playful while remaining “technical.”

## Route / Surface

- Route: `/avatar-selection`
- Mock reference: `client/src/pages/avatar-selection.tsx`

## Layout

1. Header:
   - Module title: `-TARGET_ACQUISITION`
   - Subtitle: “Select target apparel categories for generation”
   - Total targets counter (`TOTAL_TARGETS`)
2. Main area:
   - Abstract “avatar” with four zones: head, upper, lower, feet.
   - Each zone displays a small badge with selected count.
3. Right-side selection panel (overlay)
   - Appears when a zone is selected.
   - Lists categories for that zone.
   - `CONFIRM SELECTION` closes panel.
4. Continue CTA:
   - `INITIATE_GENERATION` → navigates to `/style-discovery`.
   - Disabled if no category selections exist.

## Interactions

- Clicking a body zone opens the selection panel for that zone.
- Clicking a category toggles selection.
- Counts update:
  - per-zone badge
  - total targets in header

## Product Rules (Implied)

- Target categories are used as constraints for the subsequent generation steps and/or feed filtering.

