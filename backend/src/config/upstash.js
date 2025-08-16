
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

let ratelimit;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
  });
  console.log("✅ Rate limiting enabled with Upstash");
} else {
  ratelimit = {
    limit: async () => ({ success: true }),
  };
  console.warn("⚠️ Rate limiting disabled – missing Upstash credentials");
}

export default ratelimit;
