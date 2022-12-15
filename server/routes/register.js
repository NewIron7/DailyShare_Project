import express from 'express';
import { db } from "../connectDB.js";
import bcrypjs from "bcryptjs";

const router = express.Router();

router.post('/user/register', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email)
    {
        const message = "Username/password/email non transmit";
        return res.status(401).json({message});
    }
    
    const q = 'SELECT id FROM user WHERE username = (?) OR email = (?);';
    db.get(q, [req.body.username, 'root@mail.net'], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined) return res
                                        .status(409)
                                        .json({ message : "Deja un compte avec cet username/email"});
        const salt = bcrypjs.genSaltSync(10);
        const hashedPassword = bcrypjs.hashSync(req.body.password, salt);
        const q = 'INSERT INTO user (username, email, password, name) VALUES(?, ?, ?, ?);';
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
        db.run(q, values, (err) => {
        if (err) res.status(500).json(err);
        else {
            const message = "Compte cree avec succes"
            res.status(200).json({message}); 
            }
        });
    });
});

export default router; //on export les routes crees