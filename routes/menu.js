import { Router } from 'express';
import upload from '../js/multer_config';
import FoodlistController from '../controllers/menu';
import body from '../js/shared';
import read from '../js/read_file';
import checkAuth from '../js/checkAuth';
// initialize router
const router = Router();


// get food list available on the webpage
router.get('/menu', checkAuth.verifyToken, FoodlistController.getAllFood);
// get foodlist by ID
router.get('/menu/:id', checkAuth.verifyToken, FoodlistController.getFood);
// post new food to foodlist by admin
router.post('/menu', checkAuth.verifyAdminToken, [upload.single('foodImage'), body.verifyBody, read.isFoodAvailable], FoodlistController.postFood);
// Admin can update food from foodList
router.put('/menu/:id', checkAuth.verifyAdminToken, upload.single('foodImage'), [body.verifyBody], FoodlistController.updateFood);
// Delete food from foodList
router.delete('/menu/:id', checkAuth.verifyAdminToken, FoodlistController.deleteFood);
// get the price of all food ordered by users
router.get('/total', checkAuth.verifyAdminToken, FoodlistController.getTotal);
export default router;
