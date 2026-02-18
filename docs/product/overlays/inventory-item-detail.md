# Inventory Item Detail

## Purpose

- Treat an owned item as an “asset” with history, condition, and actions.
- Provide contextual maintenance: usage, capsules, lifecycle workflows.

## Trigger(s)

- From the shortlist drawer’s `INVENTORY` tab: click an item.

## Dismissal

- Back button returns to the inventory grid in the drawer.

## Layout

Two-column detail view:

### Left: Media Gallery

- Main image area with carousel controls (hover revealed).
- Actions:
  - Delete current image (disabled if last image).
  - Add media (mock adds an image).
- Pagination dots and media count label.

### Right: Data & Management

1. **Stale check-in prompt**
   - “Long time no see — do you still own it?”
   - Yes → adds a verification usage event.
   - No → triggers disposal options (placeholder).
2. **Metadata grid**
   - Acquired date
   - Purchase location
   - Price
   - Condition dropdown (mint/good/fair/broken)
3. **Smart capsules**
   - List of capsule recommendations with match score.
   - Expands to show reasoning + “VIEW FULL CAPSULE”.
4. **Usage history timeline**
   - Events (worn/placed/verified)
   - Optional thumbnail for AI-detected wear
   - “LOG USE” adds a new event (mock)
5. **User notes**
6. **Discovery & styling**
   - “Find compliments”
   - “Expand collection”
7. **Related links**
   - Add/remove links
8. **Lifecycle actions**
   - Return, repair, replace, trade, sell, donate/recycle

## Data & Rules (Product-Level)

- Item condition influences lifecycle recommendations (implied).
- Usage events should be sorted by date descending (mock inserts “Today” at top).
- Capsule list is a recommendation surface; can seed deeper capsule detail.

## Known Mock Gap

- Artifact/document tracking types exist in state but are not rendered in the UI yet.

