import { formatApiError, isApiResponse } from '../utils/formatApiError'

interface Props {
  title: string
  data: unknown
  error?: string | null
  loading?: boolean
}

export function ResultPanel({ title, data, error, loading }: Props) {
  const apiError = isApiResponse(data) ? formatApiError(data) : null
  const clientError = error && !apiError ? error : null
  const showSuccess = isApiResponse(data) && data.success === true
  const showRaw = data !== null && data !== undefined && !loading

  return (
    <div className="result-panel">
      <h3>{title}</h3>
      {loading && <p className="muted">Loading...</p>}

      {clientError && (
        <div className="result-alert result-alert--error" role="alert">
          <p className="result-alert-title">{clientError}</p>
        </div>
      )}

      {apiError && (
        <div className="result-alert result-alert--error" role="alert">
          <p className="result-alert-title">{apiError.title}</p>
          {apiError.hint && (
            <p className="result-alert-hint">{apiError.hint}</p>
          )}
          {apiError.details && (
            <details className="result-details">
              <summary>Technical details</summary>
              <pre>{apiError.details}</pre>
            </details>
          )}
        </div>
      )}

      {showSuccess && isApiResponse(data) && (
        <div className="result-alert result-alert--success" role="status">
          <p className="result-alert-title">{data.message ?? 'Success'}</p>
        </div>
      )}

      {showRaw && (
        <details
          className="result-details result-details--response"
          open={showSuccess}
        >
          <summary>{showSuccess ? 'Full response' : 'Raw response'}</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}
