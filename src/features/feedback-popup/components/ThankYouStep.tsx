import { CheckIcon } from 'lucide-react'

type Props = {
  titleId: string
}

export const ThankYouStep = ({ titleId }: Props) => (
  <div className="flex flex-col items-center py-2 bg-accent">
    <div
      className="mb-4 grid h-14 w-14 animate-pop place-items-center rounded-full  text-text-h"
      aria-hidden="true"
    >
      <CheckIcon />
    </div>
    <h2
      id={titleId}
      tabIndex={-1}
      className="m-0 mb-2 text-[22px] font-semibold tracking-[-0.3px] text-text-h"
    >
      Thanks for your feedback!
    </h2>
  </div>
)
