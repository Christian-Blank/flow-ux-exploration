# Product Feed (Curation Queue)

## Purpose

- Present a continuous, AI-curated recommendation stream grounded in context + wardrobe.
- Capture feedback in a low-friction loop.
- Provide transparent “why” explanations on demand.

## Route / Surface

- Route: `/product-feed`
- Mock reference: `client/src/pages/product-feed.tsx`

## Layout

### Top: CURATION_QUEUE

- Horizontal thumbnail strip representing the queue.
- Each thumbnail reflects status:
  - Like (heart)
  - Dislike (X)
  - Shortlist (bookmark)
  - Owned (box)
- Clicking a thumbnail jumps to that item.

### Main: Split View

1. Left: **Product imagery**
   - Carousel (prev/next)
   - Pagination dots
   - Click image to open expanded image modal
2. Right: **Details + actions**
   - Brand (monospace)
   - Product name
   - Price
   - “WHY THIS MATCH?” reasoning trigger (opens reasoning overlay)
   - Description (“DETAILS”)

### Bottom: Action Bar

Four feedback buttons:

- `NO` → `disliked`
- `SHORTLIST` → `shortlisted`
- `OWN IT` → `owned`
- `LIKE` → `liked`

After voting:
- A transient status overlay appears (“LIKED”, “DISMISSED”, etc.).
- The feed advances to the next item after a short delay.

## Feed Mechanics (Implied by the Mock)

- The queue auto-extends: when fewer than 2 unviewed items remain, 3 more are generated and appended.
- Voting updates the current item’s status in the queue.

## States

- Expanded image modal (click-to-close).
- Reasoning overlay (click-to-close).

## Intended Behavior (Beyond Mock)

- Shortlist should be accessible and synchronized with the shortlist drawer.
- “Own it” should create/attach an inventory record.
- “Like” should strengthen the style profile; “No” should suppress similar items.

