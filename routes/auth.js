import { Router } from 'express';
import AuthController from '../controllers/auth';
import body from '../js/authmiddleware';

// initialize router
const router = Router();

router.post('/auth/signup', [body.verifyBody, body.validate], AuthController.register);

export default router;
