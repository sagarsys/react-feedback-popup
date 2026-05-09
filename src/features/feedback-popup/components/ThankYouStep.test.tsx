import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThankYouStep } from './ThankYouStep'

describe('ThankYouStep', () => {
  it('renders the thank you message with the correct title ID', () => {
    const titleId = 'thank-you-title'

    render(<ThankYouStep titleId={titleId} />)

    const heading = screen.getByRole('heading', { name: /Thanks for your feedback!/i })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', titleId)
    expect(heading).toHaveAttribute('tabindex', '-1')
  })

  it('renders the check icon container with correct attributes', () => {
    render(<ThankYouStep titleId="test-id" />)

    const heading = screen.getByRole('heading', { name: /thanks for your feedback!/i })
    const iconContainer = heading.previousElementSibling
    expect(iconContainer).not.toBeNull()
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
    expect(iconContainer).toHaveClass(
      'mb-4',
      'grid',
      'h-14',
      'w-14',
      'animate-pop',
      'place-items-center',
      'rounded-full',
      'text-text-h',
    )
  })
})
