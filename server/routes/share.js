import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

//Permet de creer un share
router.post('/share', authAdmin, (req, res) => {
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

//Permet de modifier un share existant a partir de son id
router.put('/share/:id', authAdmin, (req, res) => {
    if (!req.body.text || !req.params.id)
    {
        const message = "text/id pour le share n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM share WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun share avec cet id"});
        }
        const q = 'SELECT id FROM `share` WHERE text = (?) AND id != (?);';
        db.get(q, [req.body.text ? req.body.text : "", req.params.id], (err, dataVerif) => {
            if (err) return res.status(500).json(err);
            if (dataVerif !== undefined) return res
                                            .status(409)
                                            .json({ message : "Deja un share avec ce text"});
            const q = 'UPDATE share set text = (?) WHERE id = (?);';
            db.run(q, [req.body.text, req.params.id], (err) => {
                if (err) res.status(500).json(err);
                else {
                    const message = "Share modifie avec succes";
                    res.status(200).json({message}); 
                }
            });
        });
    });
})

//Permet de supprimer un share a partir de son id
router.delete('/share/:id', authAdmin, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le share n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM share WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun share avec cet id"});
        }
        const q = 'DELETE FROM share WHERE id = (?);';
        db.run(q, [req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Share supprime avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les share existant
router.get('/share', authAdmin, (req, res) => {
    const q = 'SELECT * FROM share;';
    db.all(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun share"});
        }
        res.status(200).json(data); 
    });
})

export default router; //on export les routes crees