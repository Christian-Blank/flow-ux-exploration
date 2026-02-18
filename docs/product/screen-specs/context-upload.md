# Context Upload / Context Analysis

## Purpose

- Collect context evidence (images/video + links).
- Present interpretable insights with confidence.
- Provide transparent reasoning so the user can validate/correct the system.

## Route / Surface

- Route: `/upload-context`
- Mock reference: `client/src/pages/context-upload.tsx`, `client/src/components/reasoning-overlay.tsx`

## Layout

Two-column layout:

### Left: LIVE_ANALYSIS_FEED

Three insight cards:

- `Detected_Environment` → “Modern Open Office” (92% confidence)
- `Style_Archetype` → “Smart Casual / Tech” (85% confidence)
- `Professional_Context` → “Creative Director” (78% confidence)

Each card:

- Has an icon + label + value.
- Shows a confidence indicator (dot + percent).
- Opens the reasoning overlay on click.

### Right: SOURCE_MATERIAL + Ingested_Vectors

1. **Upload zone**
   - Drag & drop or click to open file picker.
   - Accepts: JPG, PNG, MP4 (as copy indicates).
2. **External link input**
   - Text input + `+` button to add a link reference.
3. **Ingested vectors grid**
   - Shows thumbnails for uploaded images and placeholders for video.
   - Displays count as `Ingested_Vectors (uploads + links)`.
   - Mock gap: link references are counted but not rendered as tiles.

## Primary Actions

- **Add uploads**
  - Drag/drop or file picker.
  - Uploaded items appear in the buffer grid.
- **Add link reference**
  - Adds a URL string to the link list.
  - Intended: links should appear as tiles/cards in the buffer.
- **Inspect reasoning**
  - Clicking an insight opens a reasoning overlay (see overlay spec).
- **CONFIRM_AND_CONTINUE**
  - Navigates to `/inventory-selection`.

## States

- Upload zone highlights when dragging.
- Buffer grid shows dashed placeholders when empty.
- No explicit loading/error states are represented.

## Product Rules (Implied)

- Insights are derived from user-provided evidence and should be “correctable.”
- Confidence is shown per insight; reasoning steps also carry confidence.

## Copy / Tone Notes

- The screen frames uploads as “vectorization” (`DATA_INGESTION`), reinforcing a technical metaphor.
- Guidance copy suggests chat is used to correct details.

