import type { SizeChartData } from "@/types/editorial";

interface SizeChartProps {
  chart: SizeChartData;
}

export function SizeChart({ chart }: SizeChartProps) {
  return (
    <div>
      {chart.developmentNotice ? (
        <p className="mb-5 rounded-[var(--radius-control)] border border-warning/35 bg-accent-soft/45 px-4 py-3 text-sm text-foreground">
          {chart.developmentNotice}
        </p>
      ) : null}
      <div className="max-w-full overflow-x-auto rounded-[var(--radius-panel)] border border-border bg-surface">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">{chart.caption}</caption>
          <thead className="bg-surface-muted">
            <tr>
              {chart.columns.map((column) => (
                <th className="px-5 py-4 text-sm font-semibold" key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr className="border-t border-border" key={row.id}>
                {row.values.map((value, index) =>
                  index === 0 ? (
                    <th className="px-5 py-4 font-semibold" key={`${row.id}-${index}`} scope="row">
                      {value}
                    </th>
                  ) : (
                    <td className="px-5 py-4 text-foreground-muted" key={`${row.id}-${index}`}>
                      {value}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
