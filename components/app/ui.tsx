"use client";

import { useEffect, useState, type ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className="toggle" onClick={() => onChange(!on)} />;
}

export function PageHead({ title, desc, actions, badge }: { title: string; desc?: ReactNode; actions?: ReactNode; badge?: string }) {
  return (
    <div className="page-head">
      <div>
        <h1>
          {title} {badge && <span className="pill soft" style={{ verticalAlign: "middle", marginLeft: 8 }}>{badge}</span>}
        </h1>
        {desc && <p>{desc}</p>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}

export function Empty({ icon, title, desc, action }: { icon: IconName; title: string; desc: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <div className="ic">
        <Icon name={icon} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {action}
    </div>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [onClose]);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = window.setTimeout(() => setMsg(null), 1800);
    return () => window.clearTimeout(t);
  }, [msg]);
  return { toast: msg ? <div className="toast">{msg}</div> : null, show: setMsg };
}

export function CopyBtn({ text, className = "copy", onCopied }: { text: string; className?: string; onCopied?: () => void }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          onCopied?.();
          setTimeout(() => setOk(false), 1400);
        } catch {
          /* ignore */
        }
      }}
    >
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

export function Code({ code }: { code: string }) {
  return (
    <div className="codeblock">
      <CopyBtn text={code} />
      <pre>{code}</pre>
    </div>
  );
}
