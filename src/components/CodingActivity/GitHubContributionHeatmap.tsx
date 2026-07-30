import { ContributionDay } from '../../services/github';

interface Props {
  contributions: ContributionDay[];
  totalContributions: number;
}

export function GitHubContributionHeatmap({ contributions, totalContributions }: Props) {
  // Take last 52 weeks (364 days) of contributions if available
  const displayDays = contributions.slice(-364);

  // Group into weeks (arrays of 7 days)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < displayDays.length; i += 7) {
    weeks.push(displayDays.slice(i, i + 7));
  }

  const getCellClass = (intensity: number, count: number) => {
    if (count === 0 || intensity === 0) return 'cell cell-l0';
    if (intensity === 1 || count <= 2) return 'cell cell-l1';
    if (intensity === 2 || count <= 5) return 'cell cell-l2';
    if (intensity === 3 || count <= 9) return 'cell cell-l3';
    return 'cell cell-l4';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="activity-card">
      <div className="card-title-header">
        <div className="card-title">
          <span>💚</span> GitHub Contributions
        </div>
        <span className="card-badge">
          {totalContributions > 0 ? `${totalContributions} contributions in recent year` : 'Live Calendar'}
        </span>
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
              {displayDays.map((day, idx) => (
                <div
                  key={day.date || idx}
                  className={getCellClass(day.intensity, day.count)}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>

          <div className="heatmap-legend">
            <span>Less</span>
            <div className="cell cell-l0" style={{ width: 10, height: 10 }} />
            <div className="cell cell-l1" style={{ width: 10, height: 10 }} />
            <div className="cell cell-l2" style={{ width: 10, height: 10 }} />
            <div className="cell cell-l3" style={{ width: 10, height: 10 }} />
            <div className="cell cell-l4" style={{ width: 10, height: 10 }} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
