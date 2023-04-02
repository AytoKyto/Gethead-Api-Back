import express from 'express';
import { generateUsername, generateTest, getTests } from '../controllers/testController.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/generate-username", generateUsername);
router.get("/generate-test", generateTest);
router.get("/get-tests", getTests);

export default router;
