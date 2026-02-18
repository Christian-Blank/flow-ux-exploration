# UI Patterns

This mock relies on consistent patterns to keep the experience “learn-once, use everywhere.”

## Pattern: System Module Headers

Screens use:

- A leading hyphen module title (e.g., `-CONTEXT_ANALYSIS`)
- A short, monospace subtitle describing what to do
- A right-aligned “phase” or status badge (desktop)

Purpose: each screen feels like a step in a controlled workflow.

## Pattern: Tech Card Framing

Cards frequently have:

- Thin borders
- Chamfered corners (clip-path)
- A “tech header” area with an ID and small indicator dots
- Decorative lines/corners/grids

Purpose: reinforce the “instrument panel” metaphor.

## Pattern: Two-Column “Understand + Input”

Used in Context Upload and Inventory Selection:

- Left: “understandable” outputs (analysis cards, summaries)
- Right: inputs (uploads, selection methods, buffers)

Purpose: users see system outputs while continuing to feed it evidence.

## Pattern: Selection-Driven Floating CTA

When the user has selected at least one item:

- A floating bar appears near the bottom.
- It shows selected count + a single “next” action.

Purpose: prevent CTA hunting; support fast progression.

## Pattern: Drawer as Workspace (Shortlist / Inventory)

The shortlist overlay is a drawer that behaves like a “workspace”:

- Tabs change meaning and available actions.
- The drawer can switch into deep detail views (inventory item, capsule detail).

Purpose: keep “management” tasks separate from the linear flow.

## Pattern: Dense Comparison On Demand

The comparison matrix provides:

- Hide columns
- Swap items per slot
- Add a new item into an empty slot
- Attribute rows and AI notes

Purpose: high information density without permanently cluttering the main experience.

## Pattern: Transparency Overlay (Reasoning)

Reasoning is always presented as:

1. A claim
2. Connected sources
3. A deduction chain with confidence
4. Evidence artifacts per step

Purpose: trust and user control.

## Pattern: Asset Lifecycle Actions

In inventory item detail, lifecycle actions are shown as a grid of dashed-border buttons:

- Return
- Repair
- Replace
- Swap/Trade
- Sell
- Donate/Recycle

Purpose: reinforce “assets, not purchases.”
