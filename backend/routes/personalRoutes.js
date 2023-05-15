import express from "express";
import { newPersonal } from "../controllers/personalController.js";
const router = express.Router();
router.post("/new-personal", newPersonal);

export default router;
