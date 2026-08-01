import { useEffect, useState } from 'react';
import { fetchGitHubData, getFallbackGitHubData, GitHubProfile, ContributionDay } from '../../services/github';
import { fetchLeetCodeData, getFallbackLeetCodeData, LeetCodeProfile } from '../../services/leetcode';
import { config } from '../../config/env';
import { GitHubCard } from './GitHubCard';
import { LeetCodeCard } from './LeetCodeCard';
import { GitHubContributionHeatmap } from './GitHubContributionHeatmap';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { CodingActivitySkeleton } from './CodingActivitySkeleton';
import './CodingActivity.css';

export default function CodingActivitySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'github' | 'leetcode'>('all');
  const [loading, setLoading] = useState(true);

  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubContribs, setGithubContribs] = useState<ContributionDay[]>([]);
  const [githubTotalContribs, setGithubTotalContribs] = useState(0);

  const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfile | null>(null);

  const loadData = async () => {
    setLoading(true);

    try {
      const [ghResult, lcResult] = await Promise.allSettled([
        fetchGitHubData(),
        fetchLeetCodeData(),
      ]);

      if (ghResult.status === 'fulfilled' && ghResult.value) {
        setGithubProfile(ghResult.value.profile);
        setGithubContribs(ghResult.value.contributions.contributions);
        setGithubTotalContribs(ghResult.value.contributions.totalContributions);
      } else {
        const fbGh = getFallbackGitHubData(config.githubUsername || 'RajBhokare');
        setGithubProfile(fbGh.profile);
        setGithubContribs(fbGh.contributions.contributions);
        setGithubTotalContribs(fbGh.contributions.totalContributions);
      }

      if (lcResult.status === 'fulfilled' && lcResult.value) {
        setLeetcodeProfile(lcResult.value.profile);
      } else {
        const fbLc = getFallbackLeetCodeData(config.leetcodeUsername || 'RajBhokare');
        setLeetcodeProfile(fbLc.profile);
      }
    } catch (err) {
      console.warn('Unexpected error in loadData, activating fallbacks:', err);
      const fbGh = getFallbackGitHubData(config.githubUsername || 'RajBhokare');
      setGithubProfile(fbGh.profile);
      setGithubContribs(fbGh.contributions.contributions);
      setGithubTotalContribs(fbGh.contributions.totalContributions);

      const fbLc = getFallbackLeetCodeData(config.leetcodeUsername || 'RajBhokare');
      setLeetcodeProfile(fbLc.profile);
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
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
