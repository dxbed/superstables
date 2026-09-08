"use client";

import Icon from "@/components/app/Icon";
import { PageHead, Toggle } from "@/components/app/ui";
import { useStore } from "@/lib/store";

const Row = ({ title, sub, on, onChange }: { title: string; sub: string; on: boolean; onChange: (v: boolean) => void }) => (
  <div className="settings-row"><span><b>{title}</b><p>{sub}</p></span><Toggle on={on} onChange={onChange} label={title} /></div>
);

export default function PrivacyPage() {
  const { state, dispatch } = useStore();
  const p = state.privacy;

  return (
    <>
      <PageHead title="Privacy" desc="Restrictions that apply across the whole account. Policies inside a workspace can restrict keys further." />
      <div className="form-section">
        <div><h2><Icon name="privacy" /> Counterparties</h2><p className="desc">Control which kinds of services and rails your agents may pay.</p></div>
        <div className="panel">
          <Row on={Boolean(p.zdrOnly)} onChange={(v) => dispatch({ type: "privacy", patch: { zdrOnly: v } })} title="Verified providers only" sub="Only route to services with a verified-provider badge in the discovery index. Unverified endpoints are refused." />
          <Row on={Boolean(p.blockAcp)} onChange={(v) => dispatch({ type: "privacy", patch: { blockAcp: v } })} title="Block agent-to-agent marketplaces" sub="Refuse payments over Virtuals ACP and similar agent marketplaces until reputation is proven." />
          <Row on={Boolean(p.allowCardRails)} onChange={(v) => dispatch({ type: "privacy", patch: { allowCardRails: v } })} title="Allow card-network agent rails" sub="Permit Visa TAP and Mastercard Agent Pay when the router adds them. Off keeps spend on stablecoins only." />
        </div>
      </div>
      <div className="form-section">
        <div><h2><Icon name="chart" /> Data</h2><p className="desc">What we keep and what we publish.</p></div>
        <div className="panel">
          <Row on={Boolean(p.shareUsageMetrics)} onChange={(v) => dispatch({ type: "privacy", patch: { shareUsageMetrics: v } })} title="Include my routed volume in public metrics" sub="Aggregated, anonymous counts only. Never amounts per key, services or wallet addresses." />
          <div className="settings-row"><span><b>Receipts</b><p>On-chain receipts are public by nature. Service URLs and key names are stored only in your workspace and never shared with facilitators.</p></span><span className="pill soft">Always</span></div>
        </div>
      </div>
    </>
  );
}
