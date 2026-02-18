# Minimum Loveable Product (MLP) Scope

This mock contains more UX surface area than an MLP will likely ship with. This document proposes an MLP cut that preserves the “signature” experience: context-first shopping with transparent reasoning and wardrobe grounding.

## MLP — Must Have (Signature)

1. **Scenario → Context → Inventory → Feed** directed flow  
   - At minimum, one scenario (Work) should be fully supported.
2. **Context ingestion**
   - Upload images (and optionally links)
   - Show 2–3 key insights with confidence
3. **Asset manifest**
   - Add items (manual entry or upload is enough for MLP)
   - Show visible manifest list
4. **Curation queue feed**
   - Show product detail + images
   - Feedback actions: like / dislike / shortlist / owned
5. **Shortlist drawer**
   - View saved items
   - Remove items
6. **Transparent reasoning overlay**
   - “Why this match?” explanation with at least structured steps

## MLP — Should Have (Amplifiers)

- **Comparison matrix** (2–3 items) to support decisions.
- **Inventory item detail (light)**
  - media
  - condition
  - notes
  - basic lifecycle actions
- **Style calibration** (fast preference selection) if it materially improves feed quality.

## MLP — Nice To Have (Later)

- Capsule generation workflows (full)
- Usage timeline + stale item prompts
- Global item database search (crawler)
- Full scenario library with scenario-specific workflows
- Profile & settings and persistent preference modeling

## Explicit Non-Goals For MLP

- A complete commerce checkout experience.
- A fully accurate “global database” crawler.
- Fully automated wear detection (can be manual logging first).

