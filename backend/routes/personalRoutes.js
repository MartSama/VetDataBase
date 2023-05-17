import express from "express";
import {
  deletePersonal,
  editPersonal,
  newPersonal,
} from "../controllers/personalController.js";
const router = express.Router();
router.post("/new-personal", newPersonal);
router.put("/edit-personal", editPersonal);
router.delete("/delete-personal/:id", deletePersonal);
export default router;
