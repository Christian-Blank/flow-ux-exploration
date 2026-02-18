# Persistent AI Assistant (Chat Bar)

## Purpose

- Provide an always-available assistant surface without navigating away.
- Make “correction” and “steering” feel like part of the workflow (not a separate chat app).

## Trigger(s)

- Always present across screens as part of the global layout.
- Auto-expands when entering `/upload-context` (mock behavior).

## Dismissal

- Click the chat header to toggle collapsed/expanded.
- When expanded, clicking the page backdrop collapses the chat.

## Layout

1. **Header / Click target**
   - Status dot (green when idle, amber when “thinking”)
   - Label: `AI_ASSISTANT`
   - Copy: `CLICK TO EXPAND` / `CLICK TO COLLAPSE`
2. **Messages area**
   - Scrollable conversation feed
   - Role labels: `User_Input` and `System_Response`
3. **Input area**
   - Text input with system-style corner markers
   - Submit button (chevron)

## Interactions

- **Send message**
  - Adds the user message to the thread.
  - Triggers “thinking” state.
  - After a delay, adds a mock AI response.
- **Auto-scroll**
  - Conversation stays pinned to bottom on new messages.
- **Auto-expand on focus**
  - If the user taps into the input while collapsed, it expands.

## States

- Collapsed vs expanded height.
- “Thinking” indicator:
  - Shows `PROCESSING_DATA...` and a spinning icon.
  - Disables send button.

## Intended Behavior (Beyond Mock)

This chat should eventually support:

- Correcting context insights (“No, I’m not a creative director”)
- Steering the feed (“More formal”, “Budget under $200”, “Prefer black”)
- Asking clarifying questions at key decision points
- Triggering workflows (“Create capsule”, “Plan outfits this week”, “Start return”)

