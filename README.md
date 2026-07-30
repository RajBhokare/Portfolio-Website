# Raj Bhokare - Portfolio & Coding Activity Integration

A modern, high-performance developer portfolio built with React 18, Vite, TypeScript, Three.js, GSAP, and live API integrations for GitHub & LeetCode statistics.

---

## ⚡ Coding Activity Feature

The **Coding Activity** section dynamically fetches and displays real-time statistics from **GitHub** and **LeetCode**, cached via `localStorage` (15-minute TTL) to maintain peak performance and avoid API rate limits.

### 🌟 Features

- **GitHub Integration**:
  - Live profile metrics (avatar, name, followers, following, public repositories count).
  - Total stars count aggregated across all public repositories.
  - Interactive annual GitHub contribution heatmap calendar.
  - Real-time GitHub activity feed (commits pushed, repositories created, stars).

- **LeetCode Integration**:
  - Live profile metrics (avatar, name, global ranking, reputation).
  - Total problems solved with Easy, Medium, and Hard breakdown progress bars.
  - Acceptance rate percentage & Current consecutive daily coding streak.
  - Recent problem submissions with status tags (`Accepted`, `Wrong Answer`), language badges, and timestamps.
  - Submission calendar heatmap.

---

## 📂 File Architecture

### ➕ Files Added

- `src/config/env.ts` — Environment configuration for GitHub and LeetCode usernames.
- `src/services/cache.ts` — `localStorage` caching utility with TTL expiration.
- `src/services/github.ts` — GitHub REST API fetcher & contribution parser.
- `src/services/leetcode.ts` — LeetCode GraphQL service & streak calculator.
- `api/leetcode.ts` — Serverless proxy function for Vercel production deployment (bypasses browser CORS).
- `src/components/CodingActivity/CodingActivitySection.tsx` — Main section container component.
- `src/components/CodingActivity/GitHubCard.tsx` — GitHub profile card.
- `src/components/CodingActivity/GitHubContributionHeatmap.tsx` — GitHub contribution calendar.
- `src/components/CodingActivity/GitHubActivityFeed.tsx` — GitHub recent activity feed.
- `src/components/CodingActivity/LeetCodeCard.tsx` — LeetCode stats card.
- `src/components/CodingActivity/LeetCodeSubmissions.tsx` — LeetCode recent submissions list.
- `src/components/CodingActivity/LeetCodeHeatmap.tsx` — LeetCode submission heatmap.
- `src/components/CodingActivity/CodingActivitySkeleton.tsx` — Glassmorphism loading skeleton placeholders.
- `src/components/CodingActivity/CodingActivityError.tsx` — Error container with retry option.
- `src/components/CodingActivity/CodingActivity.css` — Styling system matching portfolio design tokens.
- `.env.example` — Template for environment variables.

### ✏️ Files Modified

- `vite.config.ts` — Added `/api/leetcode` dev server proxy to handle CORS during local development.
- `src/components/Navbar.tsx` — Added `#activity` link to navigation bar.
- `src/App.tsx` — Lazy-loaded `CodingActivitySection` using `React.lazy()` and `Suspense`.
- `.gitignore` — Excluded `.env`, `dist/`, and build artifacts.
- `.env` — Set active environment variables.

---

## 🛠️ Configuration Guide

### 1. GitHub & LeetCode Usernames

Create or edit your `.env` file in the project root:

```env
VITE_GITHUB_USERNAME=YourGitHubUsername
VITE_LEETCODE_USERNAME=YourLeetCodeUsername
GITHUB_USERNAME=YourGitHubUsername
LEETCODE_USERNAME=YourLeetCodeUsername
```

Replace `YourGitHubUsername` and `YourLeetCodeUsername` with your actual handles. All components read dynamically from these variables without hardcoding.

---

## 🚀 Local Development & Build

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Deploying to Vercel (Recommended)

1. Connect your repository to Vercel.
2. In the Vercel Dashboard under **Settings > Environment Variables**, add:
   - `VITE_GITHUB_USERNAME`
   - `VITE_LEETCODE_USERNAME`
   - `GITHUB_USERNAME`
   - `LEETCODE_USERNAME`
3. Deploy! Vercel will automatically host the app and run the serverless function in `api/leetcode.ts` to proxy LeetCode GraphQL requests seamlessly without CORS issues.
