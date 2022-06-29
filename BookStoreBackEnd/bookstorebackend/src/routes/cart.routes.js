import express from 'express'
import * as cartController from '../controllers/cart.controller';
import { bookAuth } from '../middlewares/auth.middleware';


const cartRouter = express.Router()
cartRouter.post('', bookAuth,cartController.checkCart)

cartRouter.post('/add/:_id', bookAuth,cartController.addToCart)

cartRouter.put('/remove/:_id', bookAuth,cartController.removeBookFromCart)

cartRouter.put('/increase/:_id', bookAuth,cartController.increaseQuantityInCart)

cartRouter.put('/purchase/:_id', bookAuth,cartController.purchased)



export default cartRouter