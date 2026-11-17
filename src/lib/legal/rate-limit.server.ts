import { createHash } from "node:crypto";
import { headers } from "next/headers";

type Bucket = { count: number; resetAt: number };

const globalBuckets = globalThis as typeof globalThis & {
  __raLegalSubmissionBuckets?: Map<string, Bucket>;
};

const buckets =
  globalBuckets.__raLegalSubmissionBuckets ??
  (globalBuckets.__raLegalSubmissionBuckets = new Map<string, Bucket>());

export async function allowLegalSubmission(
  kind: "contact" | "withdrawal",
): Promise<boolean> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || requestHeaders.get("x-real-ip") || "unknown";
  const salt = process.env.RA_LEGAL_RATE_LIMIT_SALT || "ra-ra-local";
  const key = createHash("sha256")
    .update(`${salt}:${kind}:${address}`)
    .digest("hex");
  const now = Date.now();
  const current = buckets.get(key);
  const limit = kind === "withdrawal" ? 6 : 10;
  const windowMs = 10 * 60 * 1000;

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

