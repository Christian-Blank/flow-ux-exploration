# Open Questions & Gaps

This section captures what’s ambiguous or incomplete in the mock so it can be decided intentionally during productization.

## Navigation / IA

- Sidebar links to `/scenario` and `/settings`, but these screens do not exist yet.
- The sidebar label “Chat & Context” links to `/`, which is currently the scenario picker (not a context/chat home).
- `WorkflowProgress` exists as a component but is not currently rendered in the global layout.

## Scenario Coverage

- Only the `Work` scenario advances into the flow; others log to console.
- Should each scenario have distinct context insights, targets, and feed behavior?

## Context Ingestion

- Links are counted in “Ingested_Vectors” but are not displayed in the buffer grid.
- Do we want link previews? Domain allow/deny lists? Parsing rules?

## Inventory Digitization

- Inventory selection includes “My Inventory” and “Global Search”, but selected items do not currently flow back into the manifest.
- What is the intended contract between those screens and the manifest?

## Status Model Consistency

There are two parallel status systems:

- Feed vote status: `liked | disliked | shortlisted | owned | pending`
- Shortlist/inventory status: `shortlisted | bought | considering | problem | owned`

Questions:
- Should “owned” mean “user owns it” vs “user wants to own it”?
- How do `liked` and `shortlisted` interact (can an item be both)?

## Capsule System

- Capsule generation is hinted in multiple places (item detail, inventory selection mode), but the workflow itself is not implemented.
- Should capsules be generated only from owned items, or also from shortlisted items?
- How are capsules saved, shared, and scheduled?

## Lifecycle Actions

- Return/repair/resale/etc. are represented as buttons with alerts.
- For MLP, what minimal subset provides “loveable” value without heavy integrations?

## Chat Assist

- The persistent chat UI exists, but its functional role is mostly implied.
- What is the expected behavior?
  - correcting context insights?
  - steering the feed?
  - asking clarifying questions?
  - managing lifecycle actions?

## Privacy & Trust

- Features overview claims “privacy-first design.”
- What data is stored and for how long? What is processed on-device vs server?

