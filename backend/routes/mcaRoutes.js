import express from "express";
import { getCompanyDetails } from "../controllers/mcaController.js";

const router = express.Router();
router.get("/company/:cin", getCompanyDetails);

export default router;
