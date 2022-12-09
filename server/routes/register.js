import express from 'express';
import { db } from "../connectDB.js";
import bcrypjs from "bcryptjs";

const router = express.Router();

router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password)
    {
        const message = "Username/password non transmit";
        return res.status(401).json({message});
    }
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res
                                    .status(409)
                                    .json({ message : "Deja un compte avec cet username"});
        const salt = bcrypjs.genSaltSync(10);
        const hashedPassword = bcrypjs.hashSync(req.body.password, salt);
             
        const qq = "INSERT INTO users (`username`, `password`) VALUE (?)";
        const values = [req.body.username, hashedPassword];
        db.query(qq, [values], (err, data) => {
        if (err) res.status(500).json(err);
            const message = "Compte cree avec succes"
            return res.status(200).json({message});
        });
    });
});

export default router; //on export les routes crees