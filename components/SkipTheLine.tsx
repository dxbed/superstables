"use client";

import Icon from "@/components/app/Icon";
import { CopyBtn } from "@/components/app/ui";
import { track } from "@/components/Analytics";
import { PLACES_PER_REFERRAL } from "@/content/earlyAccess";

export type Line = { code: string; position: number; referrals: number; total: number };

const SITE = "https://www.superstables.com";
const TEXT = "Superstables is building the payment router for AI agents: one call to pay on any rail, any chain, any stablecoin. I'm on the early-access list.";

export default function SkipTheLine({ email, line, onReset }: { email: string; line: Line; onReset: () => void }) {
  const link = `${SITE}/early-access?ref=${line.code}`;
  const share = (network: "x" | "linkedin") => {
    track("early_access_share", { network });
    const url =
      network === "x"
        ? `https://x.com/intent/post?text=${encodeURIComponent(TEXT)}&url=${encodeURIComponent(link)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  return (
    <div className="ea-card line">
      <span className="eyebrow plain">Early access</span>
      <h1 className="line-pos">
        You&apos;re <em>#{line.position}</em> in line.
      </h1>
      <p className="sub">
        We onboard in order and will write to <b>{email}</b> when it&apos;s your turn. Every builder who joins through your link moves you up {PLACES_PER_REFERRAL} places.
      </p>

      <div className="line-link">
        <code>{link.replace("https://", "")}</code>
        <CopyBtn text={link} className="btn" onCopied={() => track("early_access_share", { network: "copy" })} />
      </div>

      <div className="line-actions">
        <button className="btn" onClick={() => share("x")}>Share on X</button>
        <button className="btn" onClick={() => share("linkedin")}>Share on LinkedIn</button>
        <span className="line-count">
          {line.referrals === 0 ? "No one has joined through your link yet." : `${line.referrals} ${line.referrals === 1 ? "person has" : "people have"} joined through your link.`}
        </span>
      </div>

      <p className="line-foot">
        <button className="link" onClick={onReset}>Not you? Apply with a different email</button>
        <Icon name="arrow" size={12} />
      </p>
    </div>
  );
}
