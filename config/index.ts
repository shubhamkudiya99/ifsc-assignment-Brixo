import dotenv from "dotenv";
dotenv.config();

export default {
  port: Number(process.env.PORT || 8000),
  mongoUri: process.env.MONGO_URI,
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
  },
  cacheTTL: Number(process.env.CACHE_TTL_SECONDS || 300),
  freshnessDays: Number(process.env.FRESHNESS_DAYS || 7),
  razorpayIfscApi: process.env.RAZORPAY_IFSC_API
};
