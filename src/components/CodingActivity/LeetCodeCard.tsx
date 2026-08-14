import { SiLeetcode } from 'react-icons/si';
import { FiArrowUpRight } from 'react-icons/fi';
import { LeetCodeProfile } from '../../services/leetcode';

interface Props {
  profile: LeetCodeProfile;
}

export function LeetCodeCard({ profile }: Props) {
  const easyPct = profile.totalEasy > 0 ? Math.min(100, (profile.easySolved / profile.totalEasy) * 100) : 0;
  const mediumPct = profile.totalMedium > 0 ? Math.min(100, (profile.mediumSolved / profile.totalMedium) * 100) : 0;
  const hardPct = profile.totalHard > 0 ? Math.min(100, (profile.hardSolved / profile.totalHard) * 100) : 0;

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <SiLeetcode size={20} color="var(--gold)" style={{ marginRight: 8 }} />
          LeetCode Stats
        </div>
        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="card-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          @{profile.username} <FiArrowUpRight size={13} />
        </a>
      </div>

      <div className="profile-header-wrap">
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt={profile.name} className="profile-avatar" style={{ borderColor: 'var(--gold)' }} />
        ) : (
          <div className="profile-avatar-placeholder" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            LC
          </div>
        )}
        <div>
          <h3 className="profile-details-name">{profile.name}</h3>
          <p className="profile-details-handle">
            <span>Global Rank: {profile.ranking ? `#${profile.ranking.toLocaleString()}` : 'N/A'}</span>
          </p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--green)' }}>
            {profile.totalSolved}
          </div>
          <div className="stat-label">Total Solved</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--cyan)' }}>
            {profile.acceptanceRate !== null ? `${profile.acceptanceRate}%` : 'N/A'}
          </div>
          <div className="stat-label">Acceptance</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            {profile.currentStreak !== null ? profile.currentStreak : 'N/A'}
          </div>
          <div className="stat-label">Current Streak</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--violet)' }}>
            {profile.contestRating ? profile.contestRating : 'N/A'}
          </div>
          <div className="stat-label">Contest Rating</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--green)' }}>
            {profile.totalSubmissions !== null ? profile.totalSubmissions : 'N/A'}
          </div>
          <div className="stat-label">Submissions</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--cyan)' }}>
            {profile.activeDays}
          </div>
          <div className="stat-label">Active Days</div>
        </div>
      </div>

      <div className="difficulty-bars">
        <div className="diff-item">
          <div className="diff-header">
            <span className="diff-name-easy">Easy</span>
            <span>
              {profile.easySolved} / {profile.totalEasy}
            </span>
          </div>
          <div className="diff-bar-track">
            <div className="diff-bar-fill-easy" style={{ width: `${easyPct}%` }} />
          </div>
        </div>

        <div className="diff-item">
          <div className="diff-header">
            <span className="diff-name-medium">Medium</span>
            <span>
              {profile.mediumSolved} / {profile.totalMedium}
            </span>
          </div>
          <div className="diff-bar-track">
            <div className="diff-bar-fill-medium" style={{ width: `${mediumPct}%` }} />
          </div>
        </div>

        <div className="diff-item">
          <div className="diff-header">
            <span className="diff-name-hard">Hard</span>
            <span>
              {profile.hardSolved} / {profile.totalHard}
            </span>
          </div>
          <div className="diff-bar-track">
            <div className="diff-bar-fill-hard" style={{ width: `${hardPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
