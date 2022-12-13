import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.post('/share/create', auth, (req, res) => {
    if (!req.body.text)
    {
        const message = "Text pour le share n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM share WHERE text = (?);';
    db.get(q, [req.body.text], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Deja un share avec ce texte"});
        }
        const q = 'INSERT INTO share (text) VALUES(?);';
        db.run(q, [req.body.text], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Share cree avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

export default router; //on export les routes crees