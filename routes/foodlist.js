import { Router } from 'express';
import upload from '../js/multer_config';
import FoodlistController from '../controllers/foodlist';
import body from '../js/shared';
import read from '../js/read_file';
// initialize router
const router = Router();


// get food list available on the webpage
router.get('/foodlist', FoodlistController.getAllFood);
// get foodlist by ID
router.get('/foodlist/:id', FoodlistController.getFood);
// post new food to foodlist by admin
router.post('/foodlist', upload.single('foodImage'), [body.verifyBody, read.isFoodAvailable], FoodlistController.postFood);
// Admin can update food from foodList
router.put('/foodlist/:id', upload.single('foodImage'), [body.verifyBody], FoodlistController.updateFood);
// Delete food from foodList
router.delete('/foodlist/:id', FoodlistController.deleteFood);
// get the price of all food ordered by users
router.get('/total', FoodlistController.getTotal);
export default router;
