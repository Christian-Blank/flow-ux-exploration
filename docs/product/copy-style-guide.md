# Copy Style Guide

The mock uses copy as part of the interface design: the UI reads like a system console while still being understandable.

## Voice & Tone

- **Systemic**: speaks as a “tool” more than a “friend.”
- **Direct**: short phrases, minimal filler.
- **Transparent**: nudges users to inspect and correct reasoning.

## Formatting Conventions

### Uppercase Action Labels

CTAs and key actions use uppercase, often with underscores:

- `CONFIRM_AND_CONTINUE`
- `FINALIZE_STYLE_PROFILE`
- `RUN_COMPARISON_MATRIX`

Guideline: keep these labels concise and verb-first.

### Module Titles

Top headings often use a leading hyphen:

- `-CONTEXT_ANALYSIS`
- `-ASSET_DIGITIZATION`

Guideline: treat titles like “system modules.”

### Monospace Metadata

Small labels use monospace and uppercase:

- `PHASE: 02 - DATA_INGESTION`
- `SYS.STATUS: ONLINE`
- `STEP_01`

Guideline: metadata should be readable but visually secondary.

## Microcopy Patterns

- Use short explanations under headers to describe the goal.
- Use count-based language to reassure progress:
  - “N ITEMS SELECTED”
  - “N VECTORS CALIBRATED”
- Use trust-building prompts:
  - “Review the analysis above…”
  - “Why this match?”

## Do / Don’t

Do:
- Prefer specific nouns (“ASSET_MANIFEST”, “EVIDENCE_LOCKER”).
- Maintain consistent vocabulary across screens.

Don’t:
- Mix casual slang with system labels.
- Hide the “why” behind vague language.

