import { Router } from 'express';
import OrderController from '../controllers/orders';
import body from '../middleware/shared';
import checkAuth from '../middleware/checkAuth';
// initialize router
const router = Router();

// get user orders for admin page
router.get('/orders', checkAuth.verifyAdminToken, OrderController.getAllOrder);
// get one order by ID
router.get('/orders/:id', checkAuth.verifyAdminToken, OrderController.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/users/:id/orders', checkAuth.isUserResource, OrderController.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', checkAuth.verifyToken, [body.verifyBodyandQuantity, body.verifyLenghtOfVariables], OrderController.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', checkAuth.verifyAdminToken, OrderController.updateOrderStatus);

export default router;
