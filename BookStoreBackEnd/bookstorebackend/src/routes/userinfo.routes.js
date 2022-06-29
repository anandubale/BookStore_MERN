import express from 'express';
import * as userinfoController from '../controllers/userinfo.controller';
import { bookAuth } from '../middlewares/auth.middleware';

const userInfoRouter = express.Router();
userInfoRouter.put('/details', bookAuth, userinfoController.customerDetails);

export default userInfoRouter;