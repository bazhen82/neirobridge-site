type Bucket = { count: number; resetAt: number };

const stores = new Map<string, Map<string, Bucket>>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(scope: string, key: string, max: number, windowMs: number) {
  let map = stores.get(scope);
  if (!map) {
    map = new Map();
    stores.set(scope, map);
  }

  const now = Date.now();
  if (map.size > 500) {
    for (const [entryKey, bucket] of map) {
      if (now > bucket.resetAt) map.delete(entryKey);
    }
  }

  const entry = map.get(key);
  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}
