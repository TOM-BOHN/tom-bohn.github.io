'use client'

interface LearnMoreSectionProps {
  isExpanded: boolean
  onToggle: () => void
}

export function LearnMoreSection({ isExpanded, onToggle }: LearnMoreSectionProps) {
  return (
    <div className="border border-border rounded-lg bg-bg-secondary mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-bg-primary transition-colors text-left"
        aria-label={isExpanded ? 'Collapse learn more' : 'Expand learn more'}
      >
        <span className="text-sm font-medium text-text-secondary">
          {isExpanded ? '▼' : '▶'} Learn More About V2MOM
        </span>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              <strong className="text-text-primary">V2MOM</strong> stands for{' '}
              <strong className="text-text-primary">Vision, Values, Methods, Obstacles, and Measures</strong>.
              It&apos;s a Salesforce framework for creating alignment and strategic planning.
            </p>
            <div className="space-y-2">
              <p>
                <strong className="text-text-primary">Vision:</strong> Defines what you want to do or achieve.
              </p>
              <p>
                <strong className="text-text-primary">Values:</strong> Principles and beliefs that help you pursue
                the vision.
              </p>
              <p>
                <strong className="text-text-primary">Methods:</strong> Actions and steps to take to get the job
                done.
              </p>
              <p>
                <strong className="text-text-primary">Obstacles:</strong> The challenges, problems, issues you
                have to overcome to achieve the vision.
              </p>
              <p>
                <strong className="text-text-primary">Measures:</strong> Measurable results you aim to achieve.
              </p>
            </div>
            <div className="pt-2 space-y-1">
              <p className="text-xs text-text-secondary/80">Learn more:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>
                  <a
                    href="https://quip.com/hPzhAP5Qe7a7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    Quip V2MOM Template
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SalesforceLabs/V2MOM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    Salesforce Labs V2MOM GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.salesforce.com/blog/how-to-create-alignment-within-your-company/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    How to Create Alignment Within Your Company
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
