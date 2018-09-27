import { Router } from 'express';
import upload from '../js/multer_config';
import FoodlistController from '../controllers/foodlist';
// initialize router
const router = Router();


// get food list available on the webpage
router.get('/foodlist', FoodlistController.getAllFoods);
// get foodlist by ID
router.get('/foodlist/:id', FoodlistController.getFood);
// post new food to foodlist by admin
router.post('/foodlist', upload.single('foodImage'), FoodlistController.postFood);
// Admin can update food from foodList
router.put('/foodlist/:id', FoodlistController.updateFood);
// Delete food from foodList
router.delete('/foodlist/:id', FoodlistController.deleteFood);
// get the price of all food ordered by users
router.get('/total', FoodlistController.getTotal);
export default router;
