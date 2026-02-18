# My Inventory

## Purpose

- Let users select from a previously digitized wardrobe.
- Provide a fast, visual selection interface.

## Route / Surface

- Route: `/my-inventory`
- Mock reference: `client/src/pages/my-inventory.tsx`

## Layout

1. Sticky header:
   - Back arrow → returns to `/inventory-selection`.
   - Title: `MY_DIGITAL_INVENTORY`
   - Desktop-only filter input (“FILTER_ASSETS…”).
2. Inventory grid:
   - Square tiles with image.
   - Small date tag (top-left).
   - Selection indicator (bottom-right).
3. “UPLOAD_NEW” placeholder tile:
   - Returns to `/inventory-selection`.

## Interactions

- Tap/click a tile toggles selection.
- When selection count > 0:
  - A floating action bar appears near the bottom with:
    - selection count
    - `CONFIRM SELECTION` CTA (no navigation in mock)

## States

- No explicit empty state is represented (the mock uses a small static list).

## Intended Behavior (Beyond Mock)

- Confirm should pass selections back into the Asset Manifest in `/inventory-selection`.
- Filter should narrow the grid by type/date/tags.

