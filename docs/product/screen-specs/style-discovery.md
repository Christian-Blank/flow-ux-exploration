# Style Discovery (Style Matrix Calibration)

## Purpose

- Calibrate the user’s taste quickly by selecting items from a broad style spectrum.
- Produce an “aesthetic vector” used for the recommendation feed.

## Route / Surface

- Route: `/style-discovery`
- Mock reference: `client/src/pages/style-discovery.tsx`

## Layout

1. Sticky header:
   - Module title: `-STYLE_MATRIX_CALIBRATION`
   - Subtitle: “Select items to calibrate the aesthetic vector”
   - Controls:
     - `DIVERGE_SPECTRUM` (not functional in mock)
     - `RESHUFFLE_VECTORS` (not functional in mock)
2. Masonry grid:
   - Multi-column (2→4 columns based on screen size).
   - Cards with:
     - large image,
     - hover/selection gradient,
     - heart indicator,
     - style label + item name.
3. Infinite scroll trigger:
   - Adds more items as the user scrolls (mock repeats items with new IDs).
4. Floating action bar:
   - Appears when selection count > 0.
   - Shows `N VECTORS CALIBRATED` and CTA:
     - `FINALIZE_STYLE_PROFILE` → navigates to `/product-feed`.

## Interactions

- Clicking a card toggles selection (heart fills + border glow).
- Action bar is the main progression control.

## Product Rules (Implied)

- The system should map user selections into a style profile used downstream.
- “Diverge” suggests exploring adjacent styles to broaden the model; “Reshuffle” suggests re-sampling the style spectrum.

