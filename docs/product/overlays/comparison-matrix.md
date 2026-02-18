# Comparison Matrix

## Purpose

- Enable high-confidence decisions by comparing 2–3 items on the dimensions the user cares about.
- Provide “dense information only when requested.”

## Trigger(s)

- From shortlist drawer:
  - Select 2–3 items
  - Tap `RUN_COMPARISON_MATRIX`

## Dismissal

- Return to shortlist list via `BACK_TO_LIST`.

## Layout

The matrix is a multi-row table with up to three columns:

1. **Header row**
   - Product image + status tint
   - Brand/name/price
   - Controls (top-right):
     - Hide column
     - Swap item
     - Remove from compare
2. **AI Analysis row**
   - Short narrative insights per item
3. **Attribute rows**
   - Formality
   - Material
   - Fit

## Interactions

### Hide/Show Column

- Collapses a column into a narrow strip with vertical text.
- Expands on click.

### Swap Item

- Opens an in-column overlay listing candidates not currently in compare.
- Selecting a candidate replaces the item in that slot.

### Remove / Add

- Removing an item empties a slot.
- Empty slot shows an “ADD ITEM” control, which opens a candidate list.

### Buy

- Each column has a `BUY` button.

## Product Rules (Implied)

- Compare slots are treated as fixed positions (1–3).
- Candidate lists exclude items already selected in the matrix.

