import { fireEvent, render, screen } from '@testing-library/react'
import { vi, describe, expect, it } from 'vitest'
import { NegativeFeedbackStep } from './NegativeFeedbackStep'

const MAX_COMMENT_LENGTH = 500 // Adjust this to match the actual constant in your project.

describe('NegativeFeedbackStep', () => {
  it('renders the form with all elements', () => {
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={vi.fn()} />)

    expect(
      screen.getByRole('heading', { name: /how can we make things better\?/i }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell us what went wrong…/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send feedback/i })).toBeDisabled()
  })

  it('enables the submit button when a valid comment is entered', () => {
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={vi.fn()} />)

    const textarea = screen.getByPlaceholderText(/tell us what went wrong…/i)
    const button = screen.getByRole('button', { name: /send feedback/i })

    fireEvent.change(textarea, { target: { value: 'This is a valid comment.' } })
    expect(button).toBeEnabled()
  })

  it('disables the submit button when the textarea is empty or contains only whitespace', () => {
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={vi.fn()} />)

    const textarea = screen.getByPlaceholderText(/tell us what went wrong…/i)
    const button = screen.getByRole('button', { name: /send feedback/i })

    fireEvent.change(textarea, { target: { value: '   ' } })
    expect(button).toBeDisabled()

    fireEvent.change(textarea, { target: { value: '' } })
    expect(button).toBeDisabled()
  })

  it('calls onSubmit with the trimmed comment when the form is submitted', () => {
    const mockOnSubmit = vi.fn()
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={mockOnSubmit} />)

    const textarea = screen.getByPlaceholderText(/tell us what went wrong…/i)
    const button = screen.getByRole('button', { name: /send feedback/i })

    fireEvent.change(textarea, { target: { value: ' Feedback comment. ' } })
    fireEvent.click(button)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith('Feedback comment.')
  })

  it('does not call onSubmit when the form is submitted with an invalid comment', () => {
    const mockOnSubmit = vi.fn()
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={mockOnSubmit} />)

    const button = screen.getByRole('button', { name: /send feedback/i })
    fireEvent.click(button)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('displays the trimmed character count correctly', () => {
    render(<NegativeFeedbackStep titleId="feedback-title" onSubmit={vi.fn()} />)

    const textarea = screen.getByPlaceholderText(/tell us what went wrong…/i)
    const charCount = screen.getByText(`0/${MAX_COMMENT_LENGTH}`)

    expect(charCount).toBeInTheDocument()

    fireEvent.change(textarea, { target: { value: 'Test' } })
    expect(screen.getByText(`4/${MAX_COMMENT_LENGTH}`)).toBeInTheDocument()

    fireEvent.change(textarea, { target: { value: 'Test comment for feedback' } })
    expect(screen.getByText(`25/${MAX_COMMENT_LENGTH}`)).toBeInTheDocument()
  })
})
