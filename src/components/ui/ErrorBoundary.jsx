import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('UM One render error:', error, info)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card card-pad">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-4 text-base font-semibold text-navy-900">Something went wrong on this page</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              This section could not be displayed. You can retry, or return to the dashboard.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => this.setState({ error: null })}
                className="btn-primary"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
              <button
                type="button"
                onClick={() => this.props.onGoHome?.()}
                className="btn-ghost"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}