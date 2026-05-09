import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect } from 'vitest'
import { RATING_BUTTONS } from '../feedbackPopup.constants'
import { RatingStep } from './RatingStep'

describe('RatingStep', () => {
  it('renders the heading with the correct id', () => {
    render(<RatingStep titleId="test-title" onSelect={vi.fn()} />)
    expect(
      screen.getByRole('heading', {
        name: /how would you rate this feature\?/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveAttribute('id', 'test-title')
  })

  it('renders all rating buttons correctly', () => {
    render(<RatingStep titleId="test-title" onSelect={vi.fn()} />)
    RATING_BUTTONS.forEach(({ label, icon }) => {
      expect(screen.getByRole('button', { name: `${icon}${label}` })).toBeInTheDocument()
    })
  })

  it('calls onSelect with the correct rating when a button is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<RatingStep titleId="test-title" onSelect={onSelect} />)

    const positiveButton = screen.getByRole('button', { name: /👍positive/i })
    await user.click(positiveButton)

    expect(onSelect).toHaveBeenCalledWith('positive')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('applies the correct hover classes to each button', () => {
    render(<RatingStep titleId="test-title" onSelect={vi.fn()} />)
    RATING_BUTTONS.forEach(({ label, hoverClasses }) => {
      const button = screen.getByRole('button', { name: new RegExp(label, 'i') })
      for (const cls of hoverClasses.split(/\s+/).filter(Boolean)) {
        expect(button).toHaveClass(cls)
      }
    })
  })
})
