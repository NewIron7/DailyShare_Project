import jwt from 'jsonwebtoken';
import express from 'express';
import { privateKey } from '../privateKey.js';
import bcryptjs from "bcryptjs";
import { db } from "../connectDB.js";

const router = express.Router();

router.post('/admin/login', (req, res) => {
    if (req.body.username && req.body.password)
    {
        const q = "SELECT * FROM admin WHERE username = ?";

        db.get(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data === undefined) return res.status(404).json("Aucun compte admin pour cet utilisateur");
            const checkPassword = bcryptjs.compareSync(
                req.body.password,
                data.password
            );
            if (!checkPassword) return res.status(400).json("Erreur de mot de passe");
            const accessToken = "Bearer " + jwt.sign(
                {username: req.body.username, admin: true},
                privateKey,
                { expiresIn : '1y' }  //un an
            );
            const message = "Admin connecte avec succes";
            res.json({message, data: req.body.username, accessToken});
        });
    }
    else
    {
        const message = "Erreur de username/password";
        res.status(400).json({message});
    }
});

export default router; //on export les routes crees