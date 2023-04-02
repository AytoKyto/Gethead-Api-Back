import express from 'express';
import { getRoutes, getRoute, createRoute, updateRoute, deleteRoute } from '../controllers/routesController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-route/:project_id', verifyToken, getRoutes);
router.post('/create-route', verifyToken, createRoute);
router.get('/get-one-route/:id', verifyToken, getRoute);
router.put('/update-route/:id', verifyToken, updateRoute);
router.delete('/delete-route/:id', verifyToken, deleteRoute);

export default router;