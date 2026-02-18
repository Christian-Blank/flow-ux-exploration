# Scenario Picker

## Purpose

- Let the user choose a high-level scenario (the “initialization vector”) that frames the workflow.
- Establish the product’s tone: clinical, system-like, visually anchored.

## Route / Surface

- Route: `/`
- Mock reference: `client/src/pages/scenario-picker.tsx`, `client/src/components/scenario-card.tsx`

## Layout

1. **Decorative frame**: subtle border lines and corner accents around the canvas.
2. **Header**
   - Module title: `-SCENARIO_PICKER`
   - Subtitle: “Select initialization vector or refine with AI”
   - Desktop badge: `SYS.STATUS: ONLINE`
3. **Scenario grid**: 4 cards in a responsive grid.

## Scenario Card (Per Item)

Each card is a “tech card”:

- Top micro-header with a generated ID (e.g., `ID. 9435.WO`) and indicator dots.
- Large, mood-setting image.
- Uppercase title and descriptive body copy.
- Status line: `Status: Ready`
- Version tag: `V.01`, `V.02`, etc.

Scenario images (mock assets):
- Work: `client/public/images/scenario-work.png`
- Travel: `client/public/images/scenario-travel.png`
- Home: `client/public/images/scenario-home.png`
- Explore: `client/public/images/scenario-explore.png`

## Primary Action

- **Tap/click a scenario card**
  - Mock behavior:
    - `Work` navigates to `/upload-context`.
    - Other scenarios currently do not navigate (they log selection).
  - Intended behavior:
    - Every scenario should start a scenario-specific workflow (or at least enter the same flow with different default parameters).

## States

- No explicit empty/loading/error states are represented in the mock.

## Notes

- The scenario picker is treated as a “system module selection” rather than a typical consumer onboarding screen.

