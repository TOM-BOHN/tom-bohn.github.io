'use client'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-primary">Overall Progress</span>
        <span className="text-sm font-semibold text-accent-orange">{progress}%</span>
      </div>
      <div className="w-full bg-bg-secondary rounded-full h-3 overflow-hidden border border-border">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-orange transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-text-secondary mt-1">
        Based on completed Methods and Measures
      </p>
    </div>
  )
}
