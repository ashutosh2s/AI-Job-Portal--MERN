import express from "express";
import { getAllJobs, postJob } from "../controllers/jobController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);

export default router;
