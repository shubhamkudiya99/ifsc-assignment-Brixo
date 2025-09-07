import { Request, Response } from "express";
import { getIfscDetails } from "../services/ifsc.service";

export const getIfscInfo = async (req: Request, res: Response) => {
  const { ifsc } = req.params;
  if (!ifsc) {
    return res.status(400).json({ success: false, error: "IFSC code is required" });
  }

  try {
    const data = await getIfscDetails(ifsc);
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("IFSC fetch error:", err?.message || err);
    return res.status(500).json({ success: false, error: "Failed to fetch IFSC details" });
  }
};
