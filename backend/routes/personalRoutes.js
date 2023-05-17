import express from "express";
import {
  editPersonal,
  newPersonal,
} from "../controllers/personalController.js";
const router = express.Router();
router.post("/new-personal", newPersonal);
router.put("/edit-personal", editPersonal);

export default router;
