import { SiGithub } from 'react-icons/si';
import { FiArrowUpRight } from 'react-icons/fi';
import { GitHubProfile } from '../../services/github';

interface Props {
  profile: GitHubProfile;
}

export function GitHubCard({ profile }: Props) {
  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">
          <SiGithub size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
          GitHub Profile
        </div>
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-badge"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          @{profile.username} <FiArrowUpRight size={13} />
        </a>
      </div>

      <div className="profile-header-wrap">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar-placeholder">
            {profile.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="profile-details-name">{profile.name}</h3>
          <p className="profile-details-handle">
            <span>github.com/{profile.username}</span>
          </p>
          {profile.bio && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginTop: '0.2rem' }}>
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-box">
          <div className="stat-value">{profile.publicRepos}</div>
          <div className="stat-label">Repositories</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{profile.totalStars}</div>
          <div className="stat-label">Total Stars</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{profile.followers}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{profile.following}</div>
          <div className="stat-label">Following</div>
        </div>
      </div>
    </div>
  );
}
