import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TrustpilotStep } from './TrustpilotStep'

describe('TrustpilotStep', () => {
  it('renders the component with the correct title and text', () => {
    render(<TrustpilotStep titleId="test-title-id" trustpilotUrl="#" onDismiss={vi.fn()} />)

    expect(screen.getByText('Loving it? Tell the world!')).toBeInTheDocument()
    expect(
      screen.getByText('A quick review on Trustpilot would mean a lot to us.'),
    ).toBeInTheDocument()
  })

  it('renders the "Leave a review" button with the correct link', () => {
    const trustpilotUrl = 'https://trustpilot.com'
    render(
      <TrustpilotStep titleId="test-title-id" trustpilotUrl={trustpilotUrl} onDismiss={vi.fn()} />,
    )

    const leaveReviewLink = screen.getByText('Leave a review')
    expect(leaveReviewLink).toBeInTheDocument()
    expect(leaveReviewLink).toHaveAttribute('href', trustpilotUrl)
    expect(leaveReviewLink).toHaveAttribute('target', '_blank')
    expect(leaveReviewLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it("calls onDismiss when the 'Leave a review' button is clicked", () => {
    const onDismissMock = vi.fn()
    render(<TrustpilotStep titleId="test-title-id" trustpilotUrl="#" onDismiss={onDismissMock} />)

    const leaveReviewButton = screen.getByText('Leave a review')
    fireEvent.click(leaveReviewButton)

    expect(onDismissMock).toHaveBeenCalled()
  })

  it("calls onDismiss when the 'Maybe later' button is clicked", () => {
    const onDismissMock = vi.fn()
    render(<TrustpilotStep titleId="test-title-id" trustpilotUrl="#" onDismiss={onDismissMock} />)

    const maybeLaterButton = screen.getByText('Maybe later')
    fireEvent.click(maybeLaterButton)

    expect(onDismissMock).toHaveBeenCalled()
  })
})
