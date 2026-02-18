# Information Architecture

This mock is structured as a single, continuous experience with overlays layered on top. Navigation is intentionally minimal: the user progresses via strong CTAs and relies on the AI assistant for guidance.

## Route Map (Screens)

The app’s screens are represented by these routes (see `client/src/App.tsx`):

- `/` — Scenario Picker
- `/upload-context` — Context Upload / Analysis
- `/inventory-selection` — Inventory Selection / Asset Digitization
- `/my-inventory` — My Inventory (selection grid)
- `/global-search` — Global Item Database (search + select)
- `/avatar-selection` — Target Acquisition (category selection)
- `/style-discovery` — Style Matrix Calibration (preference selection)
- `/product-feed` — Product Feed (curation queue)

### Placeholder / Not Implemented (But Visible in Navigation)

The global sidebar includes links that do not have routes in the mock:

- `/scenario` — “New Scenario”
- `/settings` — “Profile & Settings”

Treat these as **future IA slots** rather than implemented screens.

## Global Layout (Always Present)

Every screen is wrapped by a global layout that provides:

1. **Desktop sidebar**
   - “Chat & Context”
   - “New Scenario” (placeholder)
   - “Active Shortlist” (drawer)
   - “My Inventory” (drawer, inventory tab)
   - “App Capabilities” (modal)
   - “Profile & Settings” (placeholder)
2. **Mobile header + slide-over menu**
3. **Main content region**
4. **Persistent AI assistant bar** pinned at the bottom

### Spatial Contract (Important)

Because the AI assistant bar is always present, screens typically include extra bottom padding so content and floating CTAs don’t sit underneath it. In the mock this commonly appears as `pb-24`/`pb-32` on page containers.

Product implication:

- Define a consistent “safe area” above the chat bar for floating action bars and bottom CTAs.
- Ensure overlays (drawers/modals) either sit above the chat bar or intentionally cover it.

## Overlays (Cross-Cutting)

Overlays are the “deep dives” of the product:

- **Reasoning overlay**: inspect how an insight or recommendation was derived.
- **Shortlist/inventory drawer**: manage saved items and owned assets.
- **Comparison matrix**: structured, multi-item comparison within shortlist.
- **Inventory item detail**: deep asset management (usage, condition, actions).
- **Capsule detail**: outfit/capsule story and controls.
- **Features overview**: marketing-level “capabilities” list.
- **Expanded image modal**: zoom into media.

## Primary Navigation Principle

The mock assumes the user rarely “navigates” in the traditional sense. Instead:

- Screens flow in a directed sequence (“phases”).
- Overlays provide lateral exploration without leaving the flow.
- The AI assistant is a constant control surface for clarification and adjustments.
