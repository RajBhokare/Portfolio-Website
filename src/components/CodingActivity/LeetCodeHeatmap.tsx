interface Props {
  submissionCalendar: Record<string, number>;
}

export function LeetCodeHeatmap({ submissionCalendar }: Props) {
  // Convert Unix timestamps map into last 364 days array
  const now = new Date();
  const days: { dateStr: string; count: number }[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    // Standardize to UTC start of day timestamp
    const startOfDaySec = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 1000);
    const localSec = Math.floor(d.getTime() / 1000);

    // Look up count matching timestamp
    let count = 0;
    for (const tsKey of Object.keys(submissionCalendar || {})) {
      const tsNum = parseInt(tsKey, 10);
      if (Math.abs(tsNum - startOfDaySec) < 43200 || Math.abs(tsNum - localSec) < 43200) {
        count += submissionCalendar[tsKey];
      }
    }

    const dateStr = d.toISOString().split('T')[0];
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
  const totalSubmissions = Object.values(submissionCalendar || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">
          <span>🔥</span> LeetCode Submission Heatmap
        </div>
        <span className="card-badge">{totalSubmissions} Total Submissions</span>
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
