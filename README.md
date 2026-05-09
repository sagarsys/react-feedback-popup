# React Feedback Popup

A lightweight React feedback popup for collecting quick product feedback. Users can rate a feature, leave optional negative feedback, see a thank-you state, and optionally continue to a Trustpilot review flow.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- React Testing Library

## Architecture

The feedback popup is organized as a feature module under `src/features/feedback-popup`.

- `components/` contains the UI steps:
  - rating selection
  - negative feedback form
  - thank-you state
  - Trustpilot prompt
- `hooks/` contains feature-specific behavior such as feedback flow state and auto-advance timing.
- `feedbackPopup.reducer.ts` contains the feedback state machine.
- `feedbackPopup.types.ts` defines the rating, payload, and state types.
- Shared hooks in `src/hooks/` handle reusable browser behaviors like body scroll locking, Escape key handling, focus trapping, and latest-ref management.

The popup is controlled through `open` and `onOpenChange` props, with an optional `onSubmit` callback for receiving feedback payloads.

## Accessibility

The popup includes dialog semantics and keyboard-friendly behavior:

- `role="dialog"`
- `aria-modal="true"`
- labelled dialog title via `aria-labelledby`
- Escape key dismissal
- focus management between steps
- focus trap while open
- body scroll lock while active

## Testing

Tests are written with Vitest and React Testing Library. Coverage includes:

- reducer state transitions
- custom hooks
- individual popup steps
- popup open/close behavior

Run the test suite with:
```bash 
npm test
```

## Development

Install dependencies:
```bash 
npm install
```

Start the dev server:
```bash 
npm run dev
```

Build the project:
```bash 
npm run build
```