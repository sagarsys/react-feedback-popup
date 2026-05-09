type Props = {
  titleId: string
  trustpilotUrl: string
  onDismiss: () => void
}

export const TrustpilotStep = ({ titleId, trustpilotUrl, onDismiss }: Props) => (
  <div>
    <h2 id={titleId} className="m-0 mb-2 text-[22px] font-semibold tracking-[-0.3px] text-text-h">
      Loving it? Tell the world!
    </h2>
    <p className="m-0 mb-6 text-[15px] text-text">
      A quick review on Trustpilot would mean a lot to us.
    </p>
    <div className="mt-2 flex flex-col gap-2">
      <a
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] border-0 bg-accent px-4 py-3 text-[15px] font-medium text-white no-underline transition duration-150 hover:-translate-y-px hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        href={trustpilotUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onDismiss}
      >
        Leave a review
      </a>
      <button
        type="button"
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] border border-border bg-transparent px-4 py-3 text-[15px] font-medium text-text-h transition-colors duration-150 hover:bg-code-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={onDismiss}
      >
        Maybe later
      </button>
    </div>
  </div>
)
