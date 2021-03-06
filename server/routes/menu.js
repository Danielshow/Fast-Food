import { Router } from 'express';
import upload from '../middleware/multer_config';
import FoodlistController from '../controllers/menu';
import body from '../middleware/shared';
import read from '../middleware/read_file';
import checkAuth from '../middleware/checkAuth';
import checkID from '../middleware/auth';
// initialize router
const router = Router();


// get food list available on the webpage
router.get('/menu', checkAuth.verifyToken, FoodlistController.getAllFood);
// get foodlist by ID
router.get('/menu/:id', checkAuth.verifyToken, [checkID.isValidID], FoodlistController.getFood);
// post new food to foodlist by admin
router.post('/menu', checkAuth.verifyAdminToken, upload.single('foodImage'), [body.verifyBody, body.isFileAvailable, read.isFoodAvailable], FoodlistController.postFood);
// Admin can update food from foodList
router.put('/menu/:id', checkAuth.verifyAdminToken, upload.single('foodImage'), [checkID.isValidID, body.verifyBody, body.isFileAvailable, read.isFoodAvailable], FoodlistController.updateFood);
// Delete food from foodList
router.delete('/menu/:id', checkAuth.verifyAdminToken, [checkID.isValidID], FoodlistController.deleteFood);
// get the price of all food ordered by users
router.get('/total', checkAuth.verifyAdminToken, FoodlistController.getTotal);
export default router;
