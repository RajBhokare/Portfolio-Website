interface Props {
  error: string;
  onRetry: () => void;
}

export function CodingActivityError({ error, onRetry }: Props) {
  return (
    <div className="error-card">
      <h3 className="error-title">Unable to Load Coding Activity</h3>
      <p className="error-msg">{error || 'Failed to connect to external coding profile APIs.'}</p>
      <button onClick={onRetry} className="btn-secondary">
        🔄 Retry Connection
      </button>
    </div>
  );
}
