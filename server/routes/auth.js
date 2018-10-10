import { Router } from 'express';
import AuthController from '../controllers/auth';
import body from '../middleware/auth';
import checkAuth from '../middleware/checkAuth';

// initialize router
const router = Router();

router.post('/auth/signup', [body.verifyBody, body.isPasswordValid, body.confirmPassword, body.validate, body.isEmailExist], AuthController.register);
router.post('/auth/login', [body.verifySignin, body.isEmailInDb], AuthController.login);
router.post('/auth/signup/admin', checkAuth.verifyAdminToken, [body.verifyBody, body.confirmPassword, body.validate, body.isEmailExist], AuthController.adminRegister);
router.get('/auth/me', checkAuth.verifyToken, AuthController.getMe);
router.get('/auth/logout', checkAuth.verifyToken, AuthController.logout)
export default router;
