import { Router } from 'express';
import OrderController from '../controllers/orders';
import body from '../js/shared';
// initialize router
const router = Router();

// get user orders for admin page
router.get('/orders', OrderController.getAllOrder);
// get one order by ID
router.get('/orders/:id', OrderController.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/users/:id', OrderController.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', [body.verifyBodyandQuantity, body.verifyLenghtOfVariables], OrderController.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', OrderController.updateOrderStatus);

export default router;
