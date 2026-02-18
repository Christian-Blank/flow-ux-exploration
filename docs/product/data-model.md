# Data Model (Conceptual)

This is a **product-facing** data model inferred from the mock. It’s not a database schema; it’s a vocabulary + structure for requirements.

## Core Entities

### User

- `userId`
- `profile` (name, avatar, sizing, preferences — implied future)
- `scenarios[]` (saved or recent)
- `inventory[]`
- `styleProfile`

### Scenario

- `scenarioId` (e.g., `work`, `travel`)
- `title`
- `description`
- `image`
- `parameters` (formality, mood, location — implied)

### Context Input

Represents “evidence” provided by the user.

- `contextInputId`
- `type`: `image | video | link | file`
- `uri`
- `createdAt`
- `metadata` (optional: EXIF, domain, etc.)

### Context Insight

Produced from context inputs.

- `insightId` (e.g., `environment`, `style`, `role`)
- `title`
- `value` (human-readable)
- `confidence` (0–100)
- `sources[]`: `SourceNode`
- `reasoning[]`: `ReasoningStep`

### Source Node

Small nodes displayed around the insight claim.

- `sourceId`
- `type`: `image | link | text`
- `label`
- `thumbnail` (optional)

### Reasoning Step

- `stepId`
- `description`
- `confidence` (0–100)
- `artifacts[]`: `Artifact`

### Artifact

- `artifactId`
- `type`: `image | video | link | file`
- `label`
- `url` / `thumbnail` (depending on type)

## Commerce / Recommendation Entities

### Product Candidate (Recommendation Item)

- `productId`
- `brand`
- `name`
- `price`
- `images[]`
- `description`
- `matchReason` (short explanation string)

### Curation Queue

- `queueId`
- `items[]`: `ProductCandidate` + `voteStatus`
- `cursor` / `generationState` (implied)

## Wardrobe Entities

### Inventory Item

In the mock, shortlist “owned/bought” items become inventory items.

- `inventoryItemId` (often same as product id)
- `brand`
- `name`
- `price`
- `media[]` (user images + reference images)
- `purchaseDate`
- `purchaseLocation`
- `condition`: `mint | good | fair | broken`
- `usageHistory[]`: `UsageEvent`
- `links[]`: `ExternalLink`
- `capsules[]`: `CapsuleRecommendation`

### Usage Event

- `usageEventId`
- `type`: `worn | placed | verified`
- `date` (string in mock; should be a date)
- `location` (freeform)
- `source`: `photo_ai | manual | check_in`
- `imageUrl?`

### External Link

- `linkId`
- `title`
- `url`

## Capsule Entities

### Capsule Recommendation

- `capsuleId`
- `name`
- `situation`
- `matchScore` (0–100)
- `reasoning`
- `items[]`: `{ name, image, owned? }`

### Capsule (Saved)

Implied future:

- `capsuleId`
- `ownerUserId`
- `createdAt`
- `items[]`
- `notes`
- `scheduledWears[]`

