# Reasoning Overlay (Deduction Chain + Evidence Locker)

## Purpose

- Make the system’s claims inspectable to build trust.
- Let users see what evidence the model used and how it reasoned.
- Provide a foundation for user corrections (“that source is wrong”, “ignore that”).

## Trigger(s)

- From context analysis insight cards (environment/style/role).
- From product feed: `WHY THIS MATCH?`

## Dismissal

- Close button (top-right).
- Backdrop click closes the overlay.

## Layout

The overlay is a three-panel instrument view:

### Left: Insight + Source Visualization

- Header label: `REASONING_TRACE_LOG`
- Large title (insight title)
- Quoted insight value
- Central claim node (fingerprint icon)
- Source nodes positioned around it with dashed connection lines

### Middle: DEDUCTION_CHAIN

Vertical timeline of steps:

- `STEP_01`, `STEP_02`, etc.
- Per-step confidence percent
- Step description
- Optional artifact count indicator (`N ARTIFACTS LINKED`)

Clicking a step selects it and populates the evidence locker.

### Right: EVIDENCE_LOCKER

Shows artifacts linked to the selected step:

- Images (rendered inline)
- Links (preview row with URL)
- Video placeholder tile (mock)

Empty state appears when no step is selected.

## Interactions

- Select/deselect a reasoning step.
- Inspect artifacts for the selected step.

## Data & Rules (Product-Level)

- A reasoning overlay instance requires:
  - `title`, `insight` (claim/value)
  - `sources[]` (nodes in the visualization)
  - `reasoning[]` (ordered steps; each can attach `artifacts[]`)

## Intended Enhancements (Beyond Mock)

- Clicking a source node opens its preview (full image, link, extracted text).
- “Share” exports a readable report (claim + steps + evidence).
- User feedback actions per step/source (mark incorrect, ignore, re-run).

