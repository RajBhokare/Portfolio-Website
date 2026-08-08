import { useEffect, useState } from 'react';
import { fetchGitHubData, GitHubProfile, ContributionDay } from '../../services/github';
import { fetchLeetCodeData, LeetCodeProfile } from '../../services/leetcode';
import { GitHubCard } from './GitHubCard';
import { LeetCodeCard } from './LeetCodeCard';
import { GitHubContributionHeatmap } from './GitHubContributionHeatmap';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { CodingActivitySkeleton } from './CodingActivitySkeleton';
import './CodingActivity.css';

function formatLastUpdated(timestamp: number | null): string {
  if (!timestamp) return 'Never';
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  return `${diffHours}h ago`;
}

export default function CodingActivitySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'github' | 'leetcode'>('all');

  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);
  const [githubContribs, setGithubContribs] = useState<ContributionDay[]>([]);
  const [githubTotalContribs, setGithubTotalContribs] = useState(0);

  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);
  const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfile | null>(null);
  const [leetcodeSubmissions, setLeetcodeSubmissions] = useState<LeetCodeSubmission[]>([]);

  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const loadGitHub = async (forceRefresh = false) => {
    setGithubLoading(true);
    setGithubError(null);
    try {
      const ghData = await fetchGitHubData(forceRefresh);
      setGithubProfile(ghData.profile);
      setGithubEvents(ghData.events || []);
      setGithubContribs(ghData.contributions.contributions);
      setGithubTotalContribs(ghData.contributions.totalContributions);
      setLastUpdated(ghData.lastUpdated);
    } catch (err: any) {
      console.error('GitHub fetch failed:', err);
      setGithubError(err.message || 'GitHub activity unavailable.');
      setGithubProfile(null);
      setGithubContribs([]);
      setGithubTotalContribs(0);
      setGithubEvents([]);
    } finally {
      setGithubLoading(false);
    }
  };

  const loadLeetCode = async (forceRefresh = false) => {
    setLeetcodeLoading(true);
    setLeetcodeError(null);
    try {
      const lcData = await fetchLeetCodeData(forceRefresh);
      setLeetcodeProfile(lcData.profile);
      setLeetcodeSubmissions(lcData.recentSubmissions || []);
      setLastUpdated(lcData.lastUpdated);
    } catch (err: any) {
      console.error('LeetCode fetch failed:', err);
      setLeetcodeError(err.message || 'LeetCode activity unavailable.');
      setLeetcodeProfile(null);
      setLeetcodeSubmissions([]);
    } finally {
      setLeetcodeLoading(false);
    }
  };

  const loadAll = (forceRefresh = false) => {
    loadGitHub(forceRefresh);
    loadLeetCode(forceRefresh);
  };

  useEffect(() => {
    loadAll(false);
  }, []);

  const isGlobalLoading = githubLoading && leetcodeLoading;

  return (
    <section className="section section-dark" id="activity">
      <div className="container">
        <div className="section-header reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-eyebrow">coding activity & stats</span>
            <h2 className="section-title">Coding Activity</h2>
          </div>
          {lastUpdated && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-2)', fontFamily: 'var(--mono)', background: 'rgba(255, 255, 255, 0.04)', padding: '0.3rem 0.7rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              Last updated: {formatLastUpdated(lastUpdated)}
            </span>
          )}
        </div>

        <div className="activity-tabs reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>📊</span> Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            <span>🐙</span> GitHub
          </button>
          <button
            className={`tab-btn ${activeTab === 'leetcode' ? 'active' : ''}`}
            onClick={() => setActiveTab('leetcode')}
          >
            <span>🧩</span> LeetCode
          </button>
          <button
            className="tab-btn"
            onClick={() => loadAll(true)}
            title="Clear cache and fetch fresh stats"
            style={{ marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.82rem' }}
          >
            <span>🔄</span> Refresh Live Data
          </button>
        </div>

        {isGlobalLoading ? (
          <CodingActivitySkeleton />
        ) : (
          <div className="activity-content">
            {/* OVERVIEW TAB */}
            {activeTab === 'all' && (
              <>
                <div className="activity-grid">
                  <div className="col-span-6">
                    {githubLoading ? (
                      <CodingActivitySkeleton />
                    ) : githubError ? (
                      <div className="activity-card" style={{ borderColor: 'var(--coral-dim)', textAlign: 'center', padding: '2rem 1.5rem' }}>
                        <div className="card-title" style={{ color: 'var(--coral)', marginBottom: '0.5rem' }}>
                          🐙 GitHub Activity Unavailable
                        </div>
                        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginBottom: '1rem' }}>{githubError}</p>
                        <button className="tab-btn" onClick={() => loadGitHub(true)} style={{ background: 'var(--coral-dim)', color: 'var(--coral)' }}>
                          🔄 Retry GitHub
                        </button>
                      </div>
                    ) : (
                      githubProfile && <GitHubCard profile={githubProfile} />
                    )}
                  </div>

                  <div className="col-span-6">
                    {leetcodeLoading ? (
                      <CodingActivitySkeleton />
                    ) : leetcodeError ? (
                      <div className="activity-card" style={{ borderColor: 'var(--coral-dim)', textAlign: 'center', padding: '2rem 1.5rem' }}>
                        <div className="card-title" style={{ color: 'var(--coral)', marginBottom: '0.5rem' }}>
                          🧩 LeetCode Activity Unavailable
                        </div>
                        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginBottom: '1rem' }}>{leetcodeError}</p>
                        <button className="tab-btn" onClick={() => loadLeetCode(true)} style={{ background: 'var(--coral-dim)', color: 'var(--coral)' }}>
                          🔄 Retry LeetCode
                        </button>
                      </div>
                    ) : (
                      leetcodeProfile && <LeetCodeCard profile={leetcodeProfile} />
                    )}
                  </div>
                </div>

                <div className="activity-grid">
                  <div className="col-span-12">
                    {githubProfile && (
                      <GitHubContributionHeatmap
                        contributions={githubContribs}
                        totalContributions={githubTotalContribs}
                      />
                    )}
                  </div>
                  <div className="col-span-12">
                    {leetcodeProfile && (
                      <LeetCodeHeatmap submissionCalendar={leetcodeProfile.submissionCalendar} />
                    )}
                  </div>
                </div>
              </>
            )}

            {/* GITHUB TAB */}
            {activeTab === 'github' && (
              <>
                {githubError ? (
                  <div className="activity-card" style={{ borderColor: 'var(--coral-dim)', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                    <div className="card-title" style={{ color: 'var(--coral)', marginBottom: '0.5rem' }}>
                      🐙 GitHub Activity Unavailable
                    </div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>{githubError}</p>
                    <button className="tab-btn" onClick={() => loadGitHub(true)} style={{ background: 'var(--coral-dim)', color: 'var(--coral)' }}>
                      🔄 Retry GitHub
                    </button>
                  </div>
                ) : (
                  <div className="activity-grid">
                    <div className="col-span-12">
                      {githubProfile && <GitHubCard profile={githubProfile} />}
                    </div>
                    <div className="col-span-12">
                      <GitHubContributionHeatmap
                        contributions={githubContribs}
                        totalContributions={githubTotalContribs}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* LEETCODE TAB */}
            {activeTab === 'leetcode' && (
              <>
                {leetcodeError ? (
                  <div className="activity-card" style={{ borderColor: 'var(--coral-dim)', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                    <div className="card-title" style={{ color: 'var(--coral)', marginBottom: '0.5rem' }}>
                      🧩 LeetCode Activity Unavailable
                    </div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>{leetcodeError}</p>
                    <button className="tab-btn" onClick={() => loadLeetCode(true)} style={{ background: 'var(--coral-dim)', color: 'var(--coral)' }}>
                      🔄 Retry LeetCode
                    </button>
                  </div>
                ) : (
                  <div className="activity-grid">
                    <div className="col-span-12">
                      {leetcodeProfile && <LeetCodeCard profile={leetcodeProfile} />}
                    </div>
                    <div className="col-span-12">
                      {leetcodeProfile && (
                        <LeetCodeHeatmap submissionCalendar={leetcodeProfile.submissionCalendar} />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

