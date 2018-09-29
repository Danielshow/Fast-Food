import { Router } from 'express';
import OrderController from '../controllers/orders';
// initialize router
const router = Router();

// get user orders for admin page
router.get('/orders', OrderController.getAllOrder);
// get one order by ID
router.get('/orders/:id', OrderController.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/userorder/:id', OrderController.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', OrderController.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', OrderController.updateOrderStatus);

export default router;
