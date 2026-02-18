# Global Search (Global Item Database)

## Purpose

- Let users find items they own in a global index, without photographing them.
- Support quick multi-selection and add-to-wardrobe actions.

## Route / Surface

- Route: `/global-search`
- Mock reference: `client/src/pages/global-search.tsx`

## Layout

1. Sticky search header:
   - Back arrow → returns to `/inventory-selection`.
   - Search input with placeholder examples (“Levis 501”, “Zara Linen Shirt”).
2. Filter chips row:
   - BRAND, CATEGORY, COLOR, YEAR (not functional in mock).
3. Results grid:
   - Portrait tiles with image, brand, name.
   - Selection check indicator top-right.
4. Floating action bar:
   - Appears when selection count > 0.
   - Shows count and `ADD TO WARDROBE` CTA (no action in mock).

## Interactions

- Tap/click a result toggles selection.
- CTA is shown only when at least one item is selected.

## Intended Behavior (Beyond Mock)

- Selecting items should add them to the Asset Manifest in `/inventory-selection`.
- Filters should apply structured constraints to search results.

