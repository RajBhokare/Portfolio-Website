import { LeetCodeSubmission } from '../../services/leetcode';

interface Props {
  submissions: LeetCodeSubmission[];
}

function formatTime(timestampStr: string): string {
  const ts = parseInt(timestampStr, 10) * 1000;
  if (isNaN(ts)) return 'Recently';
  const date = new Date(ts);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function LeetCodeSubmissions({ submissions }: Props) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="activity-card">
        <div className="card-title-header">
          <div className="card-title">🧩 Recent Submissions</div>
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>No recent submissions available.</p>
      </div>
    );
  }

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">🧩 Recent Submissions</div>
        <span className="card-badge">Live Submissions</span>
      </div>

      <div className="feed-list">
        {submissions.map((sub, idx) => {
          const isAccepted = sub.statusDisplay === 'Accepted';
          return (
            <div key={`${sub.titleSlug}-${sub.timestamp}-${idx}`} className="feed-item">
              <div
                className="feed-icon"
                style={{
                  background: isAccepted ? 'var(--green-dim)' : 'var(--coral-dim)',
                  color: isAccepted ? 'var(--green)' : 'var(--coral)',
                }}
              >
                {isAccepted ? '✓' : '✗'}
              </div>
              <div className="feed-content">
                <a
                  href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feed-repo"
                  style={{ color: 'var(--text)' }}
                >
                  {sub.title}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span className={`status-badge ${isAccepted ? 'status-accepted' : 'status-failed'}`}>
                    {sub.statusDisplay}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-2)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '3px',
                    }}
                  >
                    {sub.lang}
                  </span>
                </div>
                <div className="feed-time">{formatTime(sub.timestamp)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
