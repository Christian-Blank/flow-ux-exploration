# Shortlist & Inventory Drawer

## Purpose

- Provide a dedicated workspace for decisions (shortlist) and ownership (inventory).
- Allow deep actions (compare, buy feedback, item detail, capsules) without leaving the main flow.

## Trigger(s)

- Sidebar: “Active Shortlist”
- Sidebar: “My Inventory” (opens the inventory tab)
- Mobile header shopping bag icon

## Dismissal

- Close button in header (when not in comparison mode).
- Backdrop click closes the drawer.

## Layout

### Drawer Container

- Right-aligned full-height drawer with a blurred backdrop.
- Contains:
  - Header with tabs + controls
  - Main content region (switches between views)
  - Optional sticky footer action bars
  - Post-purchase modal overlay (when active)

### Header

Tabs:

- `SHORTLIST`
- `INVENTORY`

Header also shows:

- Item count badge (`N ITEMS`)
- Context description:
  - Shortlist: “Select items to compare nuances”
  - Comparing: “Analyzing 3-way vector compatibilities”
  - Inventory: “Digital twin assets you own”

Inventory tab includes a **selection mode toggle**:

- `SELECT ITEMS` → enables capsule seeding selection
- `CANCEL SELECTION` → clears selected items

### Content Modes

The drawer can render:

1. **Grid list** (default)
2. **Comparison matrix** (when comparing)
3. **Inventory item detail** (when selecting an owned item)
4. **Capsule detail view** (when opening a capsule)

## Interactions

### Shortlist Tab (Decision Workspace)

- Selecting items toggles compare selection (max 3).
- Hover overlay actions on each card:
  - Remove item
  - `BUY_NOW`
- Footer CTA appears when selection count > 0:
  - `RUN_COMPARISON_MATRIX` (requires at least 2 selected)

### Inventory Tab (Owned Workspace)

- Default click opens **Inventory item detail**.
- Selection mode click toggles selection for capsule creation.
- Footer CTA appears when selection mode has selection:
  - `CREATE CAPSULE`

### Post-Purchase Feedback (Modal)

Triggered by `BUY_NOW`:

1. Opens an external link (placeholder).
2. Shows a modal: “Did you acquire this asset?”
3. Outcomes update the product status:
   - purchased → `bought`
   - still deciding → `considering`
   - failed/problem → `problem`

## Data & Rules (Product-Level)

- Shortlist and inventory use a status model to determine list membership.
- Comparison selection limit: 3 items.
- Inventory selection mode creates a “seed set” for capsules.

## Intended Enhancements (Beyond Mock)

- Filters/sorting within shortlist and inventory tabs.
- Search within drawer.
- Clear separation between “owned” and “bought” semantics.
- Real purchase links + attribution.

