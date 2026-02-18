# Visual Tokens

This document captures the “design system” implied by the mock so it can be rebuilt consistently.

## Fonts

- `--font-sans`: Inter (body)
- `--font-display`: Rajdhani (headings)
- `--font-mono`: JetBrains Mono (metadata/system labels)

## Shape Language

- Minimal rounding; sharp edges dominate.
- Chamfered corners implemented via clip-path utilities:
  - `chamfer-sm` (small corner cuts)
  - `chamfer-lg` (larger corner cuts)

## Color Roles (Semantic)

Token → meaning (approximate):

- `background`: light, cool white (canvas)
- `foreground`: dark navy/charcoal (primary text)
- `primary`: “system blue” (high emphasis, CTAs, key borders)
- `accent`: “signal orange” (high salience markers, corner details)
- `muted`: soft gray-blue (panels, backgrounds)
- `border`: light blue-gray (structure)
- `destructive`: red (remove/dismiss)

## Decorative Motifs

- Subtle grid backgrounds on the body canvas.
- Corner lines/notches and frame borders on key cards.
- Dashed borders to indicate “ingest”, “placeholder”, or “system process”.

## Motion Principles

- Motion communicates *state changes*:
  - selection confirmation,
  - overlays appearing/disappearing,
  - queue progression,
  - “thinking” state.
- Hover reveals advanced controls (carousel arrows, action overlays).

