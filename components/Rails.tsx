import { rails } from "@/content/site";

export default function Rails() {
  return (
    <div className="rails">
      <div className="wrap">
        <div className="rails-label">Every rail, one interface</div>
        <div className="rail-row">
          {rails.map((r) => (
            <span key={r.name} className="chip">
              <b>{r.name}</b>
              <small>{r.kind}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
