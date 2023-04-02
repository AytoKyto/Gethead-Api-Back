import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-projects/:user_id', verifyToken, getProjects);
router.post('/create-project', verifyToken, createProject);
router.get('/get-one-project/:id', verifyToken, getProject);
router.put('/update-project/:id', verifyToken, updateProject);
router.delete('/delete-project/:id', verifyToken, deleteProject);

export default router;