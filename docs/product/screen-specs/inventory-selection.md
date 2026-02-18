# Inventory Selection (Asset Digitization)

## Purpose

- Build an **Asset Manifest**: the list of items the system should consider as owned constraints and anchors.
- Provide multiple ways to add assets with minimal friction.

## Route / Surface

- Route: `/inventory-selection`
- Mock reference: `client/src/pages/inventory-selection.tsx`

## Layout

Two-column layout:

### Left: Input Methods

1. **SEARCH_MY_INVENTORY**
   - Opens `/my-inventory`.
2. **GLOBAL_ITEM_DATABASE**
   - Opens `/global-search`.
3. **DIRECT_UPLOAD**
   - Drag-and-drop zone for item photos.

### Right: ASSET_MANIFEST

- List view of selected/added assets.
- Shows total count: `ASSET_MANIFEST (inventory + uploads)`.
- Each entry shows:
  - thumbnail
  - brand label (monospace, uppercase)
  - item name
  - remove button (`X`)

## Primary Action

- **CONFIRM_MANIFEST**
  - Navigates to `/avatar-selection`.
  - Disabled when manifest is empty (no inventory items and no uploads).

## Secondary Actions

- Remove inventory items from manifest.
- Remove uploaded items from manifest.
- Add uploaded items by dropping into upload zone.

## States

- Empty manifest state: “NO ASSETS INDEXED” with an icon.
- Upload zone highlights while dragging.

## Product Rules (Implied)

- The manifest is treated as a constraint set for recommendation matching (“compatibility analysis”).
- The UI suggests three ingestion paths:
  1) known items (inventory),
  2) found items (global database),
  3) raw evidence (uploads).

