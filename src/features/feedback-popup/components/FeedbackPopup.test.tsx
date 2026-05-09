import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import { FeedbackPopup } from './FeedbackPopup'

describe('FeedbackPopup', () => {
  it('renders nothing when `open` is false', () => {
    render(<FeedbackPopup open={false} onOpenChange={vi.fn()} />)
    expect(screen.queryByTestId('feedback-popup-backdrop')).toBeNull()
  })

  it('renders the feedback popup when `open` is true', () => {
    render(<FeedbackPopup open={true} onOpenChange={vi.fn()} />)
    expect(screen.getByTestId('feedback-popup-backdrop')).toBeInTheDocument()
  })

  it('calls `onOpenChange` with false on backdrop click', () => {
    const handleOpenChange = vi.fn()
    render(<FeedbackPopup open={true} onOpenChange={handleOpenChange} />)

    fireEvent.click(screen.getByTestId('feedback-popup-backdrop'))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls `onOpenChange` with false when the close button is clicked', () => {
    const handleOpenChange = vi.fn()
    render(<FeedbackPopup open={true} onOpenChange={handleOpenChange} />)

    const closeButton = screen.getByRole('button', { name: /Close/i })
    fireEvent.click(closeButton)
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })
})
