import Redis from "ioredis";
import config from "../config";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;
