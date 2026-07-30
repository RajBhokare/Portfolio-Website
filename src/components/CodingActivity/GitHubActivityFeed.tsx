import { GitHubEvent } from '../../services/github';

interface Props {
  events: GitHubEvent[];
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function GitHubActivityFeed({ events }: Props) {
  if (!events || events.length === 0) {
    return (
      <div className="activity-card">
        <div className="card-title-header">
          <div className="card-title">⚡ Recent GitHub Activity</div>
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>No recent public activity found.</p>
      </div>
    );
  }

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">⚡ Recent GitHub Activity</div>
        <span className="card-badge">Live Feed</span>
      </div>

      <div className="feed-list">
        {events.map((ev) => (
          <div key={ev.id} className="feed-item">
            <div className="feed-icon">
              {ev.type === 'PushEvent' ? '🚀' : ev.type === 'CreateEvent' ? '📦' : ev.type === 'WatchEvent' ? '⭐' : '📌'}
            </div>
            <div className="feed-content">
              <a
                href={ev.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="feed-repo"
              >
                {ev.repoName}
              </a>
              <div className="feed-desc">{ev.description}</div>
              <div className="feed-time">{formatRelativeTime(ev.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
