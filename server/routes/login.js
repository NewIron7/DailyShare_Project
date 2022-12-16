import jwt from 'jsonwebtoken';
import express from 'express';
import { privateKey } from '../privateKey.js';
import bcryptjs from "bcryptjs";
import { db } from "../connectDB.js";

const router = express.Router();

router.post('/user/login', (req, res) => {
    if (req.body.username && req.body.password)
    {
        const q = "SELECT * FROM user WHERE username = ?";

        db.get(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data === undefined) return res.status(404).json("Aucun compte pour cet utilisateur");
            const checkPassword = bcryptjs.compareSync(
                req.body.password,
                data.password
            );
            if (!checkPassword) return res.status(400).json("Erreur de mot de passe");
            const { password, ...others } = data;
            const accessToken = "Bearer " + jwt.sign(
                {data: {user : others}},
                privateKey,
                { expiresIn : '1y' }  //une annee
            );
            const message = "Utilisateur connecte avec succes";
            res.json({message, data: {user : others}, accessToken});
        });
    }
    else
    {
        const message = "Erreur de username/password";
        res.status(400).json({message});
    }
});

export default router; //on export les routes crees