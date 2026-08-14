interface Props {
  submissionCalendar: Record<string, number>;
  totalSubmissions: number | null;
}

export function LeetCodeHeatmap({ submissionCalendar, totalSubmissions }: Props) {
  // Pre-aggregate counts by YYYY-MM-DD date string (UTC)
  const calendarByDate: Record<string, number> = {};
  if (submissionCalendar) {
    for (const [tsStr, count] of Object.entries(submissionCalendar)) {
      const ts = parseInt(tsStr, 10);
      if (!isNaN(ts)) {
        const dateStr = new Date(ts * 1000).toISOString().split('T')[0];
        calendarByDate[dateStr] = (calendarByDate[dateStr] || 0) + count;
      }
    }
  }

  // Convert map into last 364 days array
  const now = new Date();
  const days: { dateStr: string; count: number }[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = calendarByDate[dateStr] || 0;
    days.push({ dateStr, count });
  }

  const getCellClass = (count: number) => {
    if (count === 0) return 'cell cell-lc-l0';
    if (count === 1) return 'cell cell-lc-l1';
    if (count <= 3) return 'cell cell-lc-l2';
    if (count <= 6) return 'cell cell-lc-l3';
    return 'cell cell-lc-l4';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const calendarSubmissions = Object.values(submissionCalendar || {}).reduce((a, b) => a + b, 0);
  const displayedTotal = totalSubmissions ?? calendarSubmissions;

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">
          <span>🔥</span> LeetCode Submission Heatmap
        </div>
        <span className="card-badge">{displayedTotal} Total Submissions</span>
      </div>

      <div className="heatmap-container">
        <div className="heatmap-scroll-wrap">
          <div className="heatmap-months">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="heatmap-grid-wrap">
            <div className="heatmap-days-col">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="heatmap-squares">
              {days.map((day) => (
                <div
                  key={day.dateStr}
                  className={getCellClass(day.count)}
                  title={`${day.count} problem submissions on ${day.dateStr}`}
                />
              ))}
            </div>
          </div>

          <div className="heatmap-legend">
            <span>Less</span>
            <div className="cell cell-lc-l0" style={{ width: 10, height: 10 }} />
            <div className="cell cell-lc-l1" style={{ width: 10, height: 10 }} />
            <div className="cell cell-lc-l2" style={{ width: 10, height: 10 }} />
            <div className="cell cell-lc-l3" style={{ width: 10, height: 10 }} />
            <div className="cell cell-lc-l4" style={{ width: 10, height: 10 }} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
