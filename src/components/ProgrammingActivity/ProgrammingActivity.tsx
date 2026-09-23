import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { FiArrowUpRight, FiCheckCircle, FiActivity, FiZap, FiCalendar } from 'react-icons/fi';
import {
  ActivityData,
  DayContribution,
  generateFallbackData,
  getCachedData,
  getGitHubActivity,
  getLeetCodeActivity,
} from '../../services/codingActivityService';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import './ProgrammingActivity.css';

interface HeatmapCardProps {
  platform: 'github' | 'leetcode';
  data: ActivityData;
}

function HeatmapCard({ platform, data }: HeatmapCardProps) {
  const [hoveredDay, setHoveredDay] = useState<DayContribution | null>(null);

  const isGitHub = platform === 'github';
  const profileUrl = isGitHub
    ? `https://github.com/${data.username}`
    : `https://leetcode.com/${data.username}`;
  const title = isGitHub ? 'GitHub Activity' : 'LeetCode Submissions';
  const subtitle = `@${data.username}`;
  const unitName = isGitHub ? 'contributions' : 'submissions';

  const formatDateLabel = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`activity-card card-${platform} reveal`}
      id={`coding-${platform}`}
    >
      {/* Top Bar */}
      <div className="activity-card-top">
        <div className="activity-platform-title">
          <span className={`platform-icon-box ${isGitHub ? 'gh-box' : 'lc-box'}`}>
            {isGitHub ? <FaGithub /> : <SiLeetcode />}
          </span>
          <div>
            <h3>
              {title}
              {!isGitHub && (
                <span className="lc-title-solved-num">
                  Problem Solved : {data.totalSolved || 123}
                </span>
              )}
            </h3>
            <span className="platform-handle">{subtitle}</span>
          </div>
        </div>

        <MagneticButton>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="activity-profile-btn"
            aria-label={`View ${title} profile`}
          >
            <span>View Profile</span>
            <FiArrowUpRight size={14} />
          </a>
        </MagneticButton>
      </div>

      {/* Aggregate Metric Stats */}
      <div className="activity-metrics-row">
        <div className="metric-badge">
          <span className="metric-label">
            <FiActivity size={12} style={{ display: 'inline', marginRight: 4 }} />
            Total {isGitHub ? 'Contributions' : 'Submissions'}
          </span>
          <span className="metric-val">{data.totalContributions.toLocaleString()}</span>
        </div>

        <div className="metric-badge">
          <span className="metric-label">
            {isGitHub ? (
              <>
                <FiZap size={12} style={{ display: 'inline', marginRight: 4 }} />
                Current Streak
              </>
            ) : (
              <>
                <FiCheckCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                Problem Solved
              </>
            )}
          </span>
          <span className="metric-val">
            {isGitHub ? `${data.currentStreak} Days` : (data.totalSolved || 123)}
          </span>
        </div>

        <div className="metric-badge">
          <span className="metric-label">
            <FiCheckCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
            Longest Streak
          </span>
          <span className="metric-val">{data.longestStreak} Days</span>
        </div>

        <div className="metric-badge">
          <span className="metric-label">
            <FiCalendar size={12} style={{ display: 'inline', marginRight: 4 }} />
            Active Days
          </span>
          <span className="metric-val">{data.activeDays} Days</span>
        </div>
      </div>

      {/* Contribution Calendar Heatmap */}
      <div className="heatmap-wrapper">
        <div className="heatmap-scroll-container">
          <div className="heatmap-grid-layout">
            {/* Day of week labels */}
            <div className="heatmap-day-labels" aria-hidden="true">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Weeks area */}
            <div className="heatmap-weeks-area">
              {/* Month labels */}
              <div className="heatmap-months-row" aria-hidden="true">
                {data.months.map((m, idx) => (
                  <span
                    key={`${m.name}-${idx}`}
                    className="heatmap-month-label"
                    style={{ left: `${m.weekIndex * 14.5}px` }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Heatmap 53 columns */}
              <div className="heatmap-columns-grid">
                {data.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="heatmap-week-col">
                    {week.map((day) => {
                      return (
                        <div
                          key={day.date}
                          className={`heatmap-cell cell-level-${day.level}`}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          title={`${day.count} ${unitName} on ${formatDateLabel(day.date)}`}
                          role="img"
                          aria-label={`${day.count} ${unitName} on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend & Hover Info */}
        <div className="heatmap-footer">
          <div className="heatmap-hover-info">
            {hoveredDay ? (
              <span>
                <strong>{hoveredDay.count}</strong> {unitName} on{' '}
                <strong>{formatDateLabel(hoveredDay.date)}</strong>
              </span>
            ) : (
              <span>Hover over any square for daily activity details</span>
            )}
          </div>

          <div className="heatmap-legend" aria-label="Activity Level Legend">
            <span>Less</span>
            <span className={`legend-cell cell-level-0`} />
            <span className={`legend-cell cell-level-1`} />
            <span className={`legend-cell cell-level-2`} />
            <span className={`legend-cell cell-level-3`} />
            <span className={`legend-cell cell-level-4`} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgrammingActivity() {
  const [activeTab, setActiveTab] = useState<'all' | 'github' | 'leetcode'>('all');
  
  // Initialize with immediate cached or seed data (0ms instant render)
  const [githubData, setGithubData] = useState<ActivityData>(
    () => getCachedData('github') || generateFallbackData('github')
  );
  const [leetcodeData, setLeetcodeData] = useState<ActivityData>(
    () => getCachedData('leetcode') || generateFallbackData('leetcode')
  );

  useEffect(() => {
    let mounted = true;

    // Fetch live fresh data from GitHub & LeetCode APIs on every visit/refresh
    getGitHubActivity(true).then((res) => {
      if (mounted && res) setGithubData(res);
    });

    getLeetCodeActivity(true).then((res) => {
      if (mounted && res) setLeetcodeData(res);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section programming-section" id="programming">
      <div className="container">
        <div className="programming-header-wrap reveal">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-eyebrow">Continuous Coding & Problem Solving</span>
            <h2 className="section-title">Programming Activity</h2>
          </div>

          {/* Platform Tab Switcher */}
          <div className="programming-tab-switcher" role="tablist" aria-label="Coding Platforms">
            <button
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`prog-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <FiActivity className="prog-tab-icon" />
              <span>All Activity</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'github'}
              className={`prog-tab-btn ${activeTab === 'github' ? 'active tab-gh' : ''}`}
              onClick={() => setActiveTab('github')}
            >
              <FaGithub className="prog-tab-icon" />
              <span>GitHub</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'leetcode'}
              className={`prog-tab-btn ${activeTab === 'leetcode' ? 'active tab-lc' : ''}`}
              onClick={() => setActiveTab('leetcode')}
            >
              <SiLeetcode className="prog-tab-icon" />
              <span>LeetCode</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="activity-cards-grid">
          {(activeTab === 'all' || activeTab === 'github') && (
            <HeatmapCard platform="github" data={githubData} />
          )}

          {(activeTab === 'all' || activeTab === 'leetcode') && (
            <HeatmapCard platform="leetcode" data={leetcodeData} />
          )}
        </div>
      </div>
    </section>
  );
}
