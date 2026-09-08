"use client";

import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { SAMPLE_TXNS, type Txn } from "./demo";

/* ---------- types ---------- */
export type ApiKey = { id: string; name: string; prefix: string; createdAt: string; lastUsed: string | null; limit: number | null; spent: number; policy: string };
export type Policy = { id: string; name: string; isDefault: boolean; active: boolean; perCall: number | null; session: number | null; daily: number | null; allow: string[]; deny: string[]; approveAbove: number | null; stables: string[]; killSwitch: boolean };
export type Wallet = { id: string; backend: string; name: string; address: string; chains: string[]; balances: Record<string, number>; primary: boolean };
export type Endpoint = { id: string; path: string; price: number; stable: string; calls: number; earned: number; active: boolean };
export type Routing = { sort: "cheapest" | "fastest" | "balanced"; allowedRails: string[]; allowedChains: string[]; preferredStable: string; failover: boolean; maxFeeBps: number };
export type Prefs = { dateFormat: "default" | "iso" | "us"; analytics: boolean; browserNotifs: boolean };
export type Notifs = { lowBalance: boolean; lowBalanceBelow: number; failedPayment: boolean; capHit: boolean; railDown: boolean };
export type Privacy = { zdrOnly: boolean; blockAcp: boolean; shareUsageMetrics: boolean; allowCardRails: boolean };

export type State = {
  user: { name: string; email: string; accountType: "individual" | "organization"; source: string | null; consent: boolean };
  workspace: { name: string; id: string; createdAt: string; budgetDaily: number | null; budgetMonthly: number | null; webhookUrl: string };
  keys: ApiKey[];
  mgmtKeys: ApiKey[];
  policies: Policy[];
  wallets: Wallet[];
  endpoints: Endpoint[];
  routing: Routing;
  prefs: Prefs;
  notifs: Notifs;
  privacy: Privacy;
  txns: Txn[];
  onboarded: boolean;
  dismissedBanner: boolean;
};

const KEY = "ss_product_v1";

function rand(n = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
export function newKeyString() {
  return `ss_live_${rand(32)}`;
}

/** Deterministic on the server and the first client render; real values are filled in after mount. */
export function initialState(): State {
  const now = "";
  return {
    user: { name: "", email: "", accountType: "individual", source: null, consent: false },
    workspace: { name: "Default workspace", id: "", createdAt: now, budgetDaily: null, budgetMonthly: null, webhookUrl: "" },
    keys: [{ id: "k1", name: "Default key", prefix: "ss_live_9fb", createdAt: now, lastUsed: null, limit: null, spent: 0, policy: "p1" }],
    mgmtKeys: [],
    policies: [{ id: "p1", name: "Workspace policy", isDefault: true, active: true, perCall: 0.05, session: 2, daily: 25, allow: [], deny: [], approveAbove: 10, stables: ["USDC", "EURC"], killSwitch: false }],
    wallets: [],
    endpoints: [],
    routing: { sort: "cheapest", allowedRails: ["x402", "Stripe MPP", "Google AP2", "Virtuals ACP"], allowedChains: ["Base", "Solana", "Tempo"], preferredStable: "USDC", failover: true, maxFeeBps: 50 },
    prefs: { dateFormat: "default", analytics: false, browserNotifs: false },
    notifs: { lowBalance: true, lowBalanceBelow: 10, failedPayment: true, capHit: true, railDown: false },
    privacy: { zdrOnly: false, blockAcp: false, shareUsageMetrics: true, allowCardRails: false },
    txns: [],
    onboarded: false,
    dismissedBanner: false,
  };
}

type Action =
  | { type: "patch"; patch: Partial<State> }
  | { type: "user"; patch: Partial<State["user"]> }
  | { type: "workspace"; patch: Partial<State["workspace"]> }
  | { type: "routing"; patch: Partial<Routing> }
  | { type: "prefs"; patch: Partial<Prefs> }
  | { type: "notifs"; patch: Partial<Notifs> }
  | { type: "privacy"; patch: Partial<Privacy> }
  | { type: "addKey"; key: ApiKey }
  | { type: "removeKey"; id: string }
  | { type: "addMgmtKey"; key: ApiKey }
  | { type: "removeMgmtKey"; id: string }
  | { type: "addPolicy"; policy: Policy }
  | { type: "updatePolicy"; id: string; patch: Partial<Policy> }
  | { type: "removePolicy"; id: string }
  | { type: "addWallet"; wallet: Wallet }
  | { type: "removeWallet"; id: string }
  | { type: "addEndpoint"; endpoint: Endpoint }
  | { type: "updateEndpoint"; id: string; patch: Partial<Endpoint> }
  | { type: "removeEndpoint"; id: string }
  | { type: "loadSample" }
  | { type: "clearSample" }
  | { type: "reset" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "patch": return { ...s, ...a.patch };
    case "user": return { ...s, user: { ...s.user, ...a.patch } };
    case "workspace": return { ...s, workspace: { ...s.workspace, ...a.patch } };
    case "routing": return { ...s, routing: { ...s.routing, ...a.patch } };
    case "prefs": return { ...s, prefs: { ...s.prefs, ...a.patch } };
    case "notifs": return { ...s, notifs: { ...s.notifs, ...a.patch } };
    case "privacy": return { ...s, privacy: { ...s.privacy, ...a.patch } };
    case "addKey": return { ...s, keys: [...s.keys, a.key] };
    case "removeKey": return { ...s, keys: s.keys.filter((k) => k.id !== a.id) };
    case "addMgmtKey": return { ...s, mgmtKeys: [...s.mgmtKeys, a.key] };
    case "removeMgmtKey": return { ...s, mgmtKeys: s.mgmtKeys.filter((k) => k.id !== a.id) };
    case "addPolicy": return { ...s, policies: [...s.policies, a.policy] };
    case "updatePolicy": return { ...s, policies: s.policies.map((p) => (p.id === a.id ? { ...p, ...a.patch } : p)) };
    case "removePolicy": return { ...s, policies: s.policies.filter((p) => p.id !== a.id || p.isDefault) };
    case "addWallet": return { ...s, wallets: [...s.wallets.map((w) => ({ ...w, primary: false })), a.wallet] };
    case "removeWallet": return { ...s, wallets: s.wallets.filter((w) => w.id !== a.id) };
    case "addEndpoint": return { ...s, endpoints: [...s.endpoints, a.endpoint] };
    case "updateEndpoint": return { ...s, endpoints: s.endpoints.map((e) => (e.id === a.id ? { ...e, ...a.patch } : e)) };
    case "removeEndpoint": return { ...s, endpoints: s.endpoints.filter((e) => e.id !== a.id) };
    case "loadSample": return { ...s, txns: SAMPLE_TXNS, keys: s.keys.map((k, i) => (i === 0 ? { ...k, spent: 2.74, lastUsed: SAMPLE_TXNS[0].at } : k)) };
    case "clearSample": return { ...s, txns: [], keys: s.keys.map((k, i) => (i === 0 ? { ...k, spent: 0, lastUsed: null } : k)) };
    case "reset": { const f = initialState(); return { ...f, workspace: { ...f.workspace, id: crypto.randomUUID?.() ?? rand(24), createdAt: new Date().toISOString() } }; }
  }
}

const Ctx = createContext<{ state: State; dispatch: (a: Action) => void; ready: boolean } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loaded: Partial<State> | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) loaded = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    if (loaded) dispatch({ type: "patch", patch: loaded });
    if (!loaded?.workspace?.id) {
      const now = new Date().toISOString();
      dispatch({ type: "workspace", patch: { id: crypto.randomUUID?.() ?? rand(24), createdAt: now } });
    }
    const t = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  return <Ctx.Provider value={{ state, dispatch, ready }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}

/** Current time, read after mount so render stays pure. */
export function useNow() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(t);
  }, []);
  return now;
}

/* ---------- helpers ---------- */
export const fmtUsd = (n: number, d = 2) => `$${n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: Math.max(d, 4) })}`;
export const fmtDate = (iso: string | null, fmt: Prefs["dateFormat"] = "default") => {
  if (!iso) return "Never";
  const d = new Date(iso);
  if (fmt === "iso") return d.toISOString().slice(0, 16).replace("T", " ");
  if (fmt === "us") return d.toLocaleString("en-US");
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};
export const mask = (prefix: string) => `${prefix}${"•".repeat(18)}`;
