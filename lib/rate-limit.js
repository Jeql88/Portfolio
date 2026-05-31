const buckets = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 6;

export function rateLimit(key) {
  const now = Date.now();
  const entry = buckets.get(key) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }

  entry.count += 1;
  buckets.set(key, entry);

  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (now > v.resetAt) buckets.delete(k);
    }
  }

  const allowed = entry.count <= MAX_REQUESTS;
  const retryAfterSeconds = allowed ? 0 : Math.ceil((entry.resetAt - now) / 1000);
  return { allowed, retryAfterSeconds, remaining: Math.max(0, MAX_REQUESTS - entry.count) };
}
