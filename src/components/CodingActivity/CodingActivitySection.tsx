import { useEffect, useState } from 'react';
import { fetchGitHubData, GitHubProfile, GitHubEvent, ContributionDay } from '../../services/github';
import { fetchLeetCodeData, LeetCodeProfile, LeetCodeSubmission } from '../../services/leetcode';
import { GitHubCard } from './GitHubCard';
import { LeetCodeCard } from './LeetCodeCard';
import { GitHubContributionHeatmap } from './GitHubContributionHeatmap';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { GitHubActivityFeed } from './GitHubActivityFeed';
import { LeetCodeSubmissions } from './LeetCodeSubmissions';
import { CodingActivitySkeleton } from './CodingActivitySkeleton';
import { CodingActivityError } from './CodingActivityError';
import './CodingActivity.css';

export default function CodingActivitySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'github' | 'leetcode'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);
  const [githubContribs, setGithubContribs] = useState<ContributionDay[]>([]);
  const [githubTotalContribs, setGithubTotalContribs] = useState(0);

  const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfile | null>(null);
  const [leetcodeSubmissions, setLeetcodeSubmissions] = useState<LeetCodeSubmission[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [ghResult, lcResult] = await Promise.allSettled([
        fetchGitHubData(),
        fetchLeetCodeData(),
      ]);

      let hasSuccess = false;

      if (ghResult.status === 'fulfilled') {
        setGithubProfile(ghResult.value.profile);
        setGithubEvents(ghResult.value.events);
        setGithubContribs(ghResult.value.contributions.contributions);
        setGithubTotalContribs(ghResult.value.contributions.totalContributions);
        hasSuccess = true;
      } else {
        console.error('GitHub fetch error:', ghResult.reason);
      }

      if (lcResult.status === 'fulfilled') {
        setLeetcodeProfile(lcResult.value.profile);
        setLeetcodeSubmissions(lcResult.value.recentSubmissions);
        hasSuccess = true;
      } else {
        console.error('LeetCode fetch error:', lcResult.reason);
      }

      if (!hasSuccess) {
        throw new Error('Could not retrieve coding activity statistics from APIs.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while loading coding activity.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="section section-dark" id="activity">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">coding activity & stats</span>
          <h2 className="section-title">Coding Activity</h2>
        </div>

        <div className="activity-tabs reveal">
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
        </div>

        {loading ? (
          <CodingActivitySkeleton />
        ) : error ? (
          <CodingActivityError error={error} onRetry={loadData} />
        ) : (
          <div className="activity-content">
            {/* OVERVIEW TAB */}
            {activeTab === 'all' && (
              <>
                <div className="activity-grid">
                  <div className="col-span-6">
                    {githubProfile && <GitHubCard profile={githubProfile} />}
                  </div>
                  <div className="col-span-6">
                    {leetcodeProfile && <LeetCodeCard profile={leetcodeProfile} />}
                  </div>
                </div>

                <div className="activity-grid">
                  <div className="col-span-12">
                    <GitHubContributionHeatmap
                      contributions={githubContribs}
                      totalContributions={githubTotalContribs}
                    />
                  </div>
                </div>

                <div className="activity-grid">
                  <div className="col-span-6">
                    <GitHubActivityFeed events={githubEvents} />
                  </div>
                  <div className="col-span-6">
                    <LeetCodeSubmissions submissions={leetcodeSubmissions} />
                  </div>
                </div>
              </>
            )}

            {/* GITHUB TAB */}
            {activeTab === 'github' && (
              <>
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
                  <div className="col-span-12">
                    <GitHubActivityFeed events={githubEvents} />
                  </div>
                </div>
              </>
            )}

            {/* LEETCODE TAB */}
            {activeTab === 'leetcode' && (
              <>
                <div className="activity-grid">
                  <div className="col-span-12">
                    {leetcodeProfile && <LeetCodeCard profile={leetcodeProfile} />}
                  </div>
                  <div className="col-span-12">
                    {leetcodeProfile && (
                      <LeetCodeHeatmap submissionCalendar={leetcodeProfile.submissionCalendar} />
                    )}
                  </div>
                  <div className="col-span-12">
                    <LeetCodeSubmissions submissions={leetcodeSubmissions} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
