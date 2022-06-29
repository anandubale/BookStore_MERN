import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.routes';
import wishListRouter from './wishList.routes';
import userInfoRouter from './userinfo.routes';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/books', bookRoute);
  router.use('/cart', cartRoute);
  router.use('/wishlist', wishListRouter );
  router.use('/userinfo', userInfoRouter );

  return router;
};

export default routes;
