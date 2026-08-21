const AGENTS = ["claude · mcp", "langchain agent", "elizaOS", "compute buyer", "your agent"];
const RAILS = [
  { label: "x402 · Base · USDC" },
  { label: "x402 · Solana · USDC", pick: "$0.0004" },
  { label: "MPP · Tempo · USDC" },
  { label: "AP2 · Base · EURC" },
  { label: "ACP · Base", down: true },
];

const rowY = (i: number) => 50 + i * 46;
const midY = (i: number) => rowY(i) + 17;

export default function RouteDiagram() {
  return (
    <div className="route-diagram">
      <svg
        viewBox="0 0 960 300"
        role="img"
        aria-label="Agents on the left connect to Superstables in the middle, which routes to rails, chains and stablecoins on the right"
      >
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--ink-3)" />
          </marker>
        </defs>

        <text x="20" y="30" fontSize="10.5" letterSpacing="1.5" fill="var(--ink-3)">
          AGENTS
        </text>
        {AGENTS.map((a, i) => (
          <g key={a} transform={`translate(20,${rowY(i)})`}>
            <rect width="170" height="34" rx="3" fill="var(--bg)" stroke="var(--line-2)" />
            <text x="14" y="22" fontSize="12" fill="var(--ink)">
              {a}
            </text>
          </g>
        ))}

        <g stroke="var(--line-2)" strokeWidth="1.2" fill="none">
          {AGENTS.map((_, i) => (
            <path key={i} d={`M190 ${midY(i)} C 300 ${midY(i)}, 300 150, 400 150`} />
          ))}
        </g>
        <path className="flow" d={`M190 ${midY(4)} C 300 ${midY(4)}, 300 150, 400 150`} stroke="var(--accent-text)" strokeWidth="1.4" fill="none" />

        <g transform="translate(400,100)">
          <rect width="160" height="100" rx="4" fill="var(--bg)" stroke="var(--accent-text)" strokeOpacity=".6" />
          <text x="80" y="30" textAnchor="middle" fontSize="10.5" letterSpacing="1.5" fill="var(--ink-3)">
            ROUTER
          </text>
          <text x="80" y="56" textAnchor="middle" fontSize="13" fill="var(--ink)">
            detect · quote
          </text>
          <text x="80" y="76" textAnchor="middle" fontSize="13" fill="var(--ink)">
            enforce · settle
          </text>
        </g>

        <g stroke="var(--line-2)" strokeWidth="1.2" fill="none" markerEnd="url(#arr)">
          {RAILS.map((_, i) => (
            <path key={i} d={`M560 150 C 650 150, 650 ${midY(i)}, 760 ${midY(i)}`} />
          ))}
        </g>
        <path className="flow" d={`M560 150 C 650 150, 650 ${midY(1)}, 760 ${midY(1)}`} stroke="var(--accent-text)" strokeWidth="1.4" fill="none" />

        <text x="760" y="30" fontSize="10.5" letterSpacing="1.5" fill="var(--ink-3)">
          RAILS · CHAINS · STABLES
        </text>
        {RAILS.map((r, i) => (
          <g key={r.label} transform={`translate(760,${rowY(i)})`}>
            <rect
              width="180"
              height="34"
              rx="3"
              fill="var(--bg)"
              stroke={r.pick ? "var(--accent-text)" : "var(--line-2)"}
              strokeOpacity={r.pick ? 0.6 : 1}
              strokeDasharray={r.down ? "3 3" : undefined}
            />
            <text x="14" y="22" fontSize="12" fill={r.pick ? "var(--accent-text)" : r.down ? "var(--ink-3)" : "var(--ink)"}>
              {r.label}
            </text>
            {r.pick && (
              <text x="166" y="22" textAnchor="end" fill="var(--accent-text)" fontSize="10.5">
                {r.pick}
              </text>
            )}
            {r.down && (
              <text x="166" y="22" textAnchor="end" fill="var(--down)" fontSize="10.5">
                down
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
