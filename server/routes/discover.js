import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

//Permet de creer un discover
router.post('/discover', authAdmin, (req, res) => {
    if (!req.body.text)
    {
        const message = "text pour le discover n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM discover WHERE text = (?);';
    db.get(q, [req.body.text], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Deja un discover avec ce texte"});
        }
        const q = 'INSERT INTO discover (text, picture, answer, desc) VALUES(?, ?, ?, ?);';
        db.run(q, [req.body.text, req.body.picture, req.body.answer, req.body.desc], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Discover cree avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de modifier un discover existant a partir de son id
router.put('/discover/:id', authAdmin, (req, res) => {
    if (!req.body.text && !req.body.desc && !req.body.picture && !req.body.answer)
    {
        const message = "Aucun text/picture/answer/desc pour le discover n'ont pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT * FROM discover WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun discover avec cet id"});
        }
        const text = req.body.text ? req.body.text : data.text;
        const picture = req.body.picture ? req.body.picture : data.picture;
        const answer = req.body.answer ? req.body.answer : data.answer;
        const desc = req.body.desc ? req.body.desc : data.desc;
        const q = 'UPDATE discover set text = (?), picture = (?), answer = (?), desc = (?) WHERE id = (?);';
        db.run(q, [text, picture, answer, desc, req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Discover modifie avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de supprimer un discover a partir de son id
router.delete('/discover/:id', authAdmin, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le discover n'a pas ete transmit";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM discover WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun discover avec cet id"});
        }
        const q = 'DELETE FROM discover WHERE id = (?);';
        db.run(q, [req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Discover supprime avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les discover existant
router.get('/discover', authAdmin, (req, res) => {
    const q = 'SELECT * FROM discover;';
    db.all(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun discover"});
        }
        res.status(200).json(data); 
    });
})

export default router; //on export les routes crees