# States & Statuses

This mock uses “status” as a primary mechanism for reducing cognitive load. Statuses drive visual tinting, grouping, and the user’s sense of progress.

## Recommendation Vote Status (Product Feed)

Used inside the product feed queue.

- `pending`: not evaluated yet
- `liked`: positive signal, “keep generating more like this”
- `disliked`: negative signal, “stop generating like this”
- `shortlisted`: saved for comparison/decision
- `owned`: user already owns the item (or wants to mark as owned)

**UX implications:**
- Queue thumbnails show status icons (heart / X / bookmark / box).
- Current item shows a transient confirmation overlay after voting.

### Intended Side Effects (MLP Spec)

| User action | Vote status | Intended side effect |
|---|---|---|
| `LIKE` | `liked` | Strengthen preference model; generate more similar items |
| `NO` | `disliked` | Suppress similar items; optionally ask “why?” later |
| `SHORTLIST` | `shortlisted` | Add to shortlist workspace for later comparison/decision |
| `OWN IT` | `owned` | Add or link an inventory item record (“I own this”) |

## Product Status (Shortlist & Inventory Drawer)

Used inside shortlist/inventory management.

- `shortlisted`: actively considering
- `considering`: decision paused pending more info
- `bought`: acquisition confirmed
- `owned`: already owned / verified
- `problem`: acquisition failed / something went wrong

**List membership rules in the mock:**
- Inventory tab shows items with status `owned` or `bought`.
- Shortlist tab shows everything except purely `owned`.

### Transition Rules (Proposed)

Shortlist items often evolve through a decision lifecycle:

- `shortlisted` → `bought` (acquired)  
- `shortlisted` → `considering` (needs more info / delayed)  
- `shortlisted` → removed (no longer interested)  
- `considering` → `bought` (resolved)  
- `considering` → `problem` (failed attempt)  

Inventory items typically represent “done” states:

- `owned` is a stable “this exists in my wardrobe” marker.
- `bought` is a recent acquisition that should generally become `owned` once verified/digitized.

### Mapping Between Feed Votes and Shortlist Status

The mock uses two status systems. For productization, define an explicit mapping:

- Feed `shortlisted` → Shortlist `shortlisted`
- Feed `owned` → Inventory `owned`
- Feed `liked`/`disliked` → preference signals (not list membership by default)

## Inventory Condition

Displayed in inventory item detail.

- `mint`
- `good`
- `fair`
- `broken`

**UX implication:** condition is a dropdown inside the metadata grid, styled as a “primary” control.

### Condition-Driven UX (Implied)

- `mint/good`: recommend “care” and “wear” actions; resale value high.
- `fair/broken`: surface repair/replacement/donate/recycle flows more prominently.

## Selection States (Common Pattern)

Many screens share the same structural pattern:

- A grid of items
- Tap/click to select
- Visual selection feedback (ring, border, check)
- A floating bottom action bar appears when selection count > 0

Examples:
- Global search select → “ADD TO WARDROBE”
- My inventory select → “CONFIRM SELECTION”
- Style discovery select → “FINALIZE_STYLE_PROFILE”
- Shortlist select → “RUN_COMPARISON_MATRIX”

## Chat Bar States

The AI assistant has two primary UI states:

- **Collapsed** (~80px): input + minimal context
- **Expanded** (~70vh): conversation + input

It also has a **thinking** state (“PROCESSING_DATA…”) that visually changes the status indicator.
