import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { GATE_COOKIE, gateToken, reviewPassword } from "@/lib/gate";
import { getSetting, setSetting, TOKEN_CONTRACT_KEY } from "@/lib/settings";

export const dynamic = "force-dynamic";

/** EVM address: Robinhood Chain is an EVM L2. */
const ADDRESS = /^0x[a-fA-F0-9]{40}$/;

async function authorized(req: Request): Promise<boolean> {
  if (!reviewPassword()) return false;
  const cookie = req.headers.get("cookie")?.match(new RegExp(`${GATE_COOKIE}=([a-f0-9]+)`))?.[1];
  return Boolean(cookie && cookie === (await gateToken(reviewPassword())));
}

export async function GET(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ value: await getSetting(TOKEN_CONTRACT_KEY) });
}

export async function POST(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let value: unknown;
  try {
    ({ value } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (typeof value !== "string" || !ADDRESS.test(value.trim())) {
    return NextResponse.json({ error: "That is not a valid contract address (0x followed by 40 hex characters)." }, { status: 400 });
  }

  await setSetting(TOKEN_CONTRACT_KEY, value.trim());
  revalidatePath("/contract");
  return NextResponse.json({ ok: true, value: value.trim() });
}
