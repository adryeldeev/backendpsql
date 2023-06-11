import { Router } from "express";
import userControllers from "./controllers/Usercontroller.js";

const router =Router()

router.get('/', userControllers.findAllUsers)
router.post('/client', userControllers.createUser)
router.get('/user/:id', userControllers.findUser)
router.put('/update/:id', userControllers.findUpdateUser)
router.delete('/delete/:id', userControllers.findDeleteUser)


export  {router}