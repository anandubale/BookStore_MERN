import express from 'express'
import * as wishListController from '../controllers/wishList.controller';
import { bookAuth } from '../middlewares/auth.middleware';


const wishListRouter = express.Router()

wishListRouter.post('', bookAuth,wishListController.checkWishList)

wishListRouter.post('/add/:_id', bookAuth,wishListController.addToWishList)

wishListRouter.put('/remove/:_id', bookAuth,wishListController.removeBookFromWishList)



export default wishListRouter