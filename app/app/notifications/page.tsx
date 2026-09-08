"use client";

import Icon from "@/components/app/Icon";
import { PageHead, Toggle } from "@/components/app/ui";
import { useStore } from "@/lib/store";

const Row = ({ title, sub, on, onChange }: { title: string; sub: string; on: boolean; onChange: (v: boolean) => void }) => (
  <div className="settings-row"><span><b>{title}</b><p>{sub}</p></span><Toggle on={on} onChange={onChange} label={title} /></div>
);

export default function NotificationsPage() {
  const { state, dispatch } = useStore();
  const n = state.notifs;
  const to = state.user.email || "you";

  return (
    <>
      <PageHead title="Notifications" desc="Choose which events notify you and how they are delivered." />
      <div className="form-section">
        <div><h2><Icon name="card" /> Balance and spend</h2><p className="desc">Stay ahead of an agent running dry or running hot.</p></div>
        <div className="panel">
          <Row on={Boolean(n.lowBalance)} onChange={(v) => dispatch({ type: "notifs", patch: { lowBalance: v } })} title="Low balance alert" sub={`Below $${n.lowBalanceBelow} · Email to ${to}`} />
          <Row on={Boolean(n.capHit)} onChange={(v) => dispatch({ type: "notifs", patch: { capHit: v } })} title="Cap reached" sub={`A key hits its per-call, session or daily cap · Email to ${to}`} />
        </div>
      </div>
      <div className="form-section">
        <div><h2><Icon name="route" /> Payments and rails</h2><p className="desc">Know when a payment needs you or a rail misbehaves.</p></div>
        <div className="panel">
          <Row on={Boolean(n.failedPayment)} onChange={(v) => dispatch({ type: "notifs", patch: { failedPayment: v } })} title="Failed payment" sub={`A payment fails on every candidate path · Email to ${to}`} />
          <Row on={Boolean(n.railDown)} onChange={(v) => dispatch({ type: "notifs", patch: { railDown: v } })} title="Rail degraded" sub="A facilitator you route through drops below 99% uptime" />
        </div>
      </div>
      <div className="form-section">
        <div><h2><Icon name="bell" /> Delivery destinations</h2><p className="desc">Route alerts to Slack or your own webhook.</p></div>
        <div className="panel"><div className="settings-row"><span><span className="eyebrow plain" style={{ fontSize: 11 }}>Organization plan</span><p style={{ marginTop: 4 }}>Slack and custom webhook delivery, plus approval requests pushed to your phone, are part of the organization plan.</p></span><a className="btn sm" href="#">Learn more</a></div></div>
      </div>
    </>
  );
}
