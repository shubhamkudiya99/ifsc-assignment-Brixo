import { Router } from "express";
import { getIfscInfo } from "../controllers/ifsc.controller";
const router = Router();

router.get("/health", (req, res) => res.json({ status: "OK", success: true }));
router.get("/ifsc/:ifsc", getIfscInfo);

export default router;