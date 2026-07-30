export function CodingActivitySkeleton() {
  return (
    <div className="activity-grid">
      {/* GitHub Profile Skeleton */}
      <div className="activity-card col-span-6">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="skeleton-pulse" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <div className="skeleton-pulse" style={{ width: '50%', height: 20 }} />
            <div className="skeleton-pulse" style={{ width: '35%', height: 14 }} />
          </div>
        </div>
        <div className="stats-grid-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-pulse" style={{ height: 65, borderRadius: 8 }} />
          ))}
        </div>
      </div>

      {/* LeetCode Profile Skeleton */}
      <div className="activity-card col-span-6">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="skeleton-pulse" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <div className="skeleton-pulse" style={{ width: '50%', height: 20 }} />
            <div className="skeleton-pulse" style={{ width: '35%', height: 14 }} />
          </div>
        </div>
        <div className="stats-grid-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-pulse" style={{ height: 65, borderRadius: 8 }} />
          ))}
        </div>
      </div>

      {/* Heatmap Skeleton */}
      <div className="activity-card col-span-12">
        <div className="skeleton-pulse" style={{ width: '30%', height: 24, marginBottom: '1.5rem' }} />
        <div className="skeleton-pulse" style={{ width: '100%', height: 130, borderRadius: 8 }} />
      </div>
    </div>
  );
}
