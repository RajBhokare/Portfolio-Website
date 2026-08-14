import { ContributionDay } from '../../services/github';

interface Props {
  contributions: ContributionDay[];
  totalContributions: number;
}

export function GitHubContributionHeatmap({ contributions, totalContributions }: Props) {
  // Ensure array is sorted ascending by date
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));

  const displayDays = sorted;

  const getCellClass = (intensity: number, count: number) => {
    if (count === 0 && intensity === 0) return 'cell cell-l0';
    const level = intensity > 0 ? intensity : (count >= 10 ? 4 : count >= 5 ? 3 : count >= 3 ? 2 : 1);
    if (level === 1) return 'cell cell-l1';
    if (level === 2) return 'cell cell-l2';
    if (level === 3) return 'cell cell-l3';
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
          {`${totalContributions} contributions in the last year`}
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
                  title={`${day.count > 0 ? `${day.count} contribution${day.count === 1 ? '' : 's'}` : 'No contributions'} on ${day.date}`}
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
