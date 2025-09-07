import express, { Router } from 'express'
import {userRegister,adminLogin, userLogin} from '../controllers/userController.js'

const userRouter=express.Router();

userRouter.post('/login',userLogin)
userRouter.post('/register',userRegister)
userRouter.post('/admin',adminLogin)

export default userRouter;