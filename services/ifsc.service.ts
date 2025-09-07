import { IfscModel } from "../models/ifsc.model";
import redis from "../utils/redis.client";
import config from "../config";
import { IfscResponse } from "../types/ifsc";
import { apiCaller } from "../utils/apicaller";

const CACHE_PREFIX = "ifsc:";

export const getIfscDetails = async (ifsc: string) => {
  const key = `${CACHE_PREFIX}${ifsc.toUpperCase()}`;

  const cachedIfscDetail = await redis.get(key);
  if (cachedIfscDetail) {
    try {
      const ifscDetail = JSON.parse(cachedIfscDetail) as IfscResponse;
      return ifscDetail;
    } catch (e) {
      console.log("Failed to parse redis cache for", key, e);
    }
  }

  const isIfscDetail = await IfscModel.findOne({ IFSC: ifsc.toUpperCase() }).lean();
  const now = new Date();
  if (isIfscDetail) {
    const ageMs = now.getTime() - new Date(isIfscDetail.createdAt).getTime();
    const ageDays = Math.round(ageMs / (1000 * 60 * 60 * 24)); 

    if (ageDays <= config.freshnessDays) {
      await redis.set(key, JSON.stringify(isIfscDetail), "EX", config.cacheTTL);
      return isIfscDetail as IfscResponse;
    }
  }

  const newIfscDetail = await apiCaller("GET", `${config.razorpayIfscApi}/${ifsc}`);

  const upsertData = {
    ...newIfscDetail,
    createdAt: new Date(),
    IFSC: newIfscDetail.IFSC.toUpperCase()
  };

  await IfscModel.updateOne({ IFSC: newIfscDetail.IFSC.toUpperCase() }, { $set: upsertData }, { upsert: true });

  await redis.set(key, JSON.stringify(upsertData), "EX", config.cacheTTL);

  return upsertData as IfscResponse;
}
