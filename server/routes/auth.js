import { Router } from 'express';
import AuthController from '../controllers/auth';
import body from '../middleware/auth';
import checkAuth from '../middleware/checkAuth';

// initialize router
const router = Router();

router.post('/auth/signup', [body.verifyBody, body.confirmPassword, body.validate, body.isEmailExist], AuthController.register);
router.post('/auth/login', [body.verifySignin, body.isEmailInDb], AuthController.login);
router.post('/auth/signup/admin', checkAuth.verifyAdminToken, [body.verifyBody, body.confirmPassword, body.validate, body.isEmailExist], AuthController.adminRegister);

export default router;
