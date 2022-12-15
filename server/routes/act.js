import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

//Permet de creer un act
router.post('/act', authAdmin, (req, res) => {
    if (!req.body.text)
    {
        const message = "text pour l'act n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM act WHERE text = (?);';
    db.get(q, [req.body.text], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Deja un act avec ce texte"});
        }
        const q = 'INSERT INTO act (text, desc) VALUES(?, ?);';
        db.run(q, [req.body.text, req.body.desc], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Act cree avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de modifier un act existant a partir de son id
router.put('/act/:id', authAdmin, (req, res) => {
    if (!req.body.text && !req.body.desc)
    {
        const message = "text et desc pour l'act n'ont pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT * FROM act WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun act avec cet id"});
        }
        const q = 'SELECT id FROM `act` WHERE text = (?) AND id != (?);';
        db.get(q, [req.body.text ? req.body.text : "", req.params.id], (err, dataVerif) => {
            if (err) return res.status(500).json(err);
            if (dataVerif !== undefined) return res
                                            .status(409)
                                            .json({ message : "Deja un act avec ce text"});
            const text = req.body.text ? req.body.text : data.text;
            const desc = req.body.desc ? req.body.desc : data.desc;
            const q = 'UPDATE act set text = (?), desc = (?) WHERE id = (?);';
            db.run(q, [text, desc, req.params.id], (err) => {
                if (err) res.status(500).json(err);
                else {
                    const message = "Act modifie avec succes";
                    res.status(200).json({message}); 
                }
            });
        });
    });
})

//Permet de supprimer un act a partir de son id
router.delete('/act/:id', authAdmin, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour l'act n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM act WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun act avec cet id"});
        }
        const q = 'DELETE FROM act WHERE id = (?);';
        db.run(q, [req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Act supprime avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les act existant
router.get('/act', authAdmin, (req, res) => {
    const q = 'SELECT * FROM act;';
    db.all(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun act"});
        }
        res.status(200).json(data); 
    });
})

export default router; //on export les routes crees