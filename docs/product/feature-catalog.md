# Feature Catalog

This is a “module list” of what the mock contains (and what it implies). Use it as a checklist when turning the exploration into a build plan.

Legend:
- **Mocked**: visible and interactive in the current UX.
- **Placeholder**: UI exists but behavior is stubbed (alerts/no-op).
- **Implied**: strongly suggested by copy/UI but not yet present.

## 1) Scenario & Workflow Initialization

- Scenario picker grid (**Mocked**)
  - Scenarios: Work/Travel/Home/Explore (**Mocked**)
  - Only Work advances into the flow (**Mocked**)
  - Dynamic scenario updates (**Placeholder**)

## 2) Context Ingestion & Insight Extraction

- Upload images/videos as context evidence (**Mocked**)
- Add external links as evidence (**Mocked**, partial rendering)
- Live analysis feed with:
  - Insight value + confidence (**Mocked**)
  - Click to inspect reasoning (**Mocked**)
- Reasoning overlay:
  - Deduction chain + confidence (**Mocked**)
  - Evidence locker with artifacts (**Mocked**)
  - Share/export reasoning trace (**Implied**)

## 3) Asset Digitization (Wardrobe Indexing)

- Inventory selection hub (**Mocked**)
  - Search My Inventory (**Mocked**)
  - Global Item Database search (**Mocked**)
  - Direct upload item photos (**Mocked**)
- Asset manifest list with remove controls (**Mocked**)
- Passing selections back to the manifest (**Placeholder**)

## 4) Target Acquisition (What To Generate)

- Body-zone-based category selection (**Mocked**)
- Per-zone counts + total target counter (**Mocked**)

## 5) Style Calibration (Aesthetic Vector)

- Style spectrum grid with like/select action (**Mocked**)
- Infinite scroll / more items (**Mocked**, repeats data)
- Controls to diverge/reshuffle (**Placeholder**)

## 6) Discovery Feed (Curation Queue)

- Queue thumbnails + jump-to-item (**Mocked**)
- Product image carousel (**Mocked**)
- Expanded image full-screen view (**Mocked**)
- “Why this match?” explanation trigger (**Mocked**)
- Vote actions:
  - like / dislike / shortlist / own (**Mocked**)
- Queue auto-extension (**Mocked**)
- Model learning from votes (**Implied**)

## 7) Persistent AI Assistant

- Bottom chat bar across all screens (**Mocked**)
- Expand/collapse + backdrop dim (**Mocked**)
- Thinking indicator + delayed response (**Mocked**)
- Context-aware system prompts (**Mocked**, minimal)
- Real assistant steering / correction workflows (**Implied**)

## 8) Shortlist (Decision Workspace)

- Shortlist drawer tab (**Mocked**)
- Select up to 3 for comparison (**Mocked**)
- Remove item (**Mocked**)
- Buy now flow + post-purchase feedback (**Mocked**, purchase link placeholder)

## 9) Comparison Matrix (Dense Decision Tool)

- 3-slot comparison view (**Mocked**)
- Hide/show columns (**Mocked**)
- Swap an item in a slot (**Mocked**)
- Add item into empty slot (**Mocked**)
- AI analysis row (**Mocked**, sample copy)
- Attribute rows (formality/material/fit) (**Mocked**)

## 10) Inventory (Owned Asset Workspace)

- Inventory drawer tab (**Mocked**)
- Inventory selection mode to seed capsules (**Mocked**)
- Inventory item detail (**Mocked**)
  - media gallery add/delete (**Mocked**)
  - condition selection (**Mocked**)
  - stale prompt (“long time no see”) (**Mocked**)
  - usage timeline + logging (**Mocked**)
  - notes (**Mocked**)
  - related links add/remove (**Mocked**)
  - lifecycle actions grid (**Placeholder**, alerts)
  - artifacts/receipts tracking (**Implied**, state exists but not rendered)

## 11) Capsules (Outfit Engine)

- Capsule recommendations within item detail (**Mocked**)
- Capsule detail view (**Mocked**)
  - collage, reasoning, breakdown, save/plan (**Mocked**, partial actions)
- Capsule generation workflow (**Placeholder**, alerts)
- Capsule persistence and scheduling (**Implied**)

## 12) Capabilities / Marketing Surface

- “System Capabilities” modal (**Mocked**)

