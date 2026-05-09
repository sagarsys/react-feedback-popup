import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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

  it('calls `onOpenChange` with false on backdrop click', async () => {
    const handleOpenChange = vi.fn()
    const user = userEvent.setup()
    render(<FeedbackPopup open={true} onOpenChange={handleOpenChange} />)

    await user.click(screen.getByTestId('feedback-popup-backdrop'))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls `onOpenChange` with false when the close button is clicked', async () => {
    const handleOpenChange = vi.fn()
    const user = userEvent.setup()
    render(<FeedbackPopup open={true} onOpenChange={handleOpenChange} />)

    const closeButton = screen.getByRole('button', { name: /Close/i })
    await user.click(closeButton)
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  describe('full flow', () => {
    it('positive rating: submits, shows thanks, then closes after the timeout', async () => {
      const onOpenChange = vi.fn()
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      render(
        <FeedbackPopup
          open
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
          thanksTimeoutMs={0}
        />,
      )

      await user.click(screen.getByRole('button', { name: /👍positive/i }))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith({ rating: 'positive' })
      expect(
        screen.getByRole('heading', { name: /thanks for your feedback!/i }),
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })

    it('stellar rating: thanks screen advances to Trustpilot; Maybe later closes', async () => {
      const onOpenChange = vi.fn()
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      render(
        <FeedbackPopup
          open
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
          thanksTimeoutMs={0}
        />,
      )

      await user.click(screen.getByRole('button', { name: /🤩stellar/i }))

      expect(onSubmit).toHaveBeenCalledWith({ rating: 'stellar' })
      // Thanks step may advance immediately when thanksTimeoutMs is 0; assert Trustpilot.
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: /loving it\? tell the world!/i }),
        ).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: /maybe later/i }))
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })
})
