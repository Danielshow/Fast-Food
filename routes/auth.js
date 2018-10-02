import { Router } from 'express';
import AuthController from '../controllers/auth';
import body from '../js/authmiddleware';

// initialize router
const router = Router();

router.post('/auth/signup', [body.verifyBody, body.validate, body.isEmailExist], AuthController.register);
router.post('/auth/login', [body.verifySignin, body.isEmailInDb], AuthController.login);

export default router;
