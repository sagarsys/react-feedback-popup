import type { Rating } from '../feedbackPopup.types'
import { RATING_BUTTONS } from '../feedbackPopup.constants'

const RATING_BUTTON_BASE =
  'flex flex-col items-center gap-2 px-2 py-[18px] bg-code-bg ' +
  'border-2 border-transparent rounded-xl text-text-h text-sm font-medium ' +
  'cursor-pointer transition duration-150 ' +
  'hover:-translate-y-0.5 active:translate-y-0 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

type Props = {
  titleId: string
  onSelect: (rating: Rating) => void
}

export const RatingStep = ({ titleId, onSelect }: Props) => (
  <>
    <h2 id={titleId} className="m-0 mb-2 text-[22px] font-semibold tracking-[-0.3px] text-text-h">
      How would you rate this feature?
    </h2>
    <div className="mt-2 grid grid-cols-3 gap-3" role="group" aria-label="Rate this feature">
      {RATING_BUTTONS.map(({ rating, label, icon, hoverClasses }) => (
        <button
          key={rating}
          type="button"
          className={`${RATING_BUTTON_BASE} ${hoverClasses}`}
          onClick={() => onSelect(rating)}
        >
          <span className="text-2xl">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  </>
)
