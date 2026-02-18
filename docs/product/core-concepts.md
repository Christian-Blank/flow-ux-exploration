# Core Concepts

This section defines the product concepts and mechanisms implied by the mock. These terms are used throughout the spec.

## Scenario (Initialization Vector)

A **Scenario** is the user’s high-level situation that frames the entire workflow.

Mock scenarios:
- Work
- Travel
- Home
- Explore

Each scenario is represented visually and described with mood + intent. In the mock, only **Work** advances into the flow.

## Context Analysis (Vectorization)

The user provides **source material** (images/video + external links). The system produces **insights** like:

- Detected environment (e.g., “Modern Open Office”)
- Style archetype (e.g., “Smart Casual / Tech”)
- Professional role (e.g., “Creative Director”)

Each insight includes:

- A confidence score
- Source references (images, links, text)
- A reasoning chain (step-by-step deductions)
- Artifacts tied to reasoning steps (images, links, files)

This is the “vectorization” moment: the system turns messy inputs into structured parameters.

## Asset Digitization (Inventory Indexing)

Before shopping, the system asks the user to define their existing wardrobe:

- Pull from **My Inventory** (previously digitized items)
- Search a **Global Item Database** (find items you own without photographing)
- **Direct upload** photos of items (ad-hoc digitization)

The output is an **Asset Manifest**: a curated list of “assets” to consider as constraints and anchors for recommendations.

## Target Acquisition (What To Generate)

The user selects **target categories** (e.g., Jacket, Pants, Shoes). This tells the system what types of items it should recommend/generate in the next phase.

The mock expresses this via an “avatar body map” with zones (head/upper/lower/feet).

## Style Matrix Calibration

The user calibrates taste by selecting/liking items from a diverse style spectrum. This is positioned as:

- quick
- visual
- low effort

The output is a **style profile** (“aesthetic vector”) used to tune the feed.

## Product Feed (Curation Queue)

The product feed is built around:

- A **queue** of recommendations (“curation queue”)
- A focused **current item** view (image carousel + details)
- Lightweight feedback actions:
  - Like
  - Dislike
  - Shortlist
  - “Own it” (mark as owned / add to inventory)

This expresses a loop: the system generates, the user reacts, the system adapts.

## Shortlist vs Inventory

The product distinguishes two related lists:

- **Shortlist**: items under active consideration / decision-making.
- **Inventory**: owned and verified items (including “bought” confirmations).

This separation is a key UX principle: keep “decisions” and “done” distinct.

## Comparison Matrix

The comparison matrix is a structured way to compare up to three shortlisted items:

- Hide/show columns to reduce clutter
- Swap an item in a given slot
- Add a new item into an empty slot
- See shared attributes and AI analysis per item

This is the “high density when requested” moment.

## Smart Capsules (Outfit Engine)

A **Capsule** is an AI-generated outfit recommendation seeded by one or more owned items. Capsules include:

- Name + situation (“Coffee / Creative Work”)
- Match score
- Reasoning / stylist notes
- Item breakdown (owned vs recommended additions)

Capsules act as a bridge: they connect shopping back to the wardrobe and its real contexts.

## Usage Lifecycle

Inventory items are treated like long-lived assets:

- Condition tracking (mint/good/fair/broken)
- Usage timeline (worn/placed/verified)
- “Stale item” prompts (“long time no see”) to reduce forgotten items
- Lifecycle actions: return, repair, replace, trade, sell, donate/recycle

## Transparent Reasoning UI

Reasoning is shown as an inspectable structure:

- A top-level insight or claim
- A deduction chain of steps with confidence
- Evidence artifacts and sources

This is both a trust mechanism and a user education tool (users learn what the system notices and values).
