import express from 'express';
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.get('/', auth, (req, res) => {
    res.send("HOME");
})

export default router; //on export les routes crees