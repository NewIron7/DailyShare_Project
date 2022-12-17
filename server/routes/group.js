import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

//Permet de creer un group
router.post('/group', auth, (req, res) => {
    if (!req.body.name)
    {
        const message = "Le nom du groupe n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM `group` WHERE name = (?);';
    db.get(q, [req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Deja un group avec ce nom"});
        }
        const q = 'INSERT INTO `group` (name, picture) VALUES(?, ?);';
        db.run(q, [req.body.name, req.body.picture], (err) => {
            if (err) res.status(500).json(err);
            else {
                const q = 'SELECT * FROM `group` WHERE name = (?);';
                db.get(q, [req.body.name], (err, data) => {
                    const message = "Group cree avec succes";
                    res.status(200).json({message, group : { id: data.id, name: req.body.name, picture: req.body.picture }});
                });
            }
        });
    });
})

//Permet de modifier un group existant a partir de son id
router.put('/group/:id', auth, (req, res) => {
    console.log(req);
    if (!req.body.name && !req.body.picture)
    {
        const message = "Les valeurs pour la modifications n'ont \
                        pas ete correctement transmise";
        return res.status(401).json({message});
    }
    const q = 'SELECT * FROM `group` WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun group avec cet id"});
        }
        const q = 'SELECT id FROM `group` WHERE name = (?) AND id != (?);';
        db.get(q, [req.body.name ? req.body.name : "", req.params.id], (err, dataVerif) => {
            if (err) return res.status(500).json(err);
            if (dataVerif !== undefined) return res
                                            .status(409)
                                            .json({ message : "Deja un group avec ce name"});
            const name = req.body.name ? req.body.name : data.name;
            const picture = req.body.picture ? req.body.picture : data.picture;
            const q = 'UPDATE `group` set name = (?), picture = (?) WHERE id = (?);';
            db.run(q, [name, picture, req.params.id], (err) => {
                if (err) res.status(500).json(err);
                else {
                    const message = "Group modifie avec succes";
                    res.status(200).json({message}); 
                }
            });                               
        });
    });
})

//Permet de supprimer un group a partir de son id
router.delete('/group/:id', auth, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le group n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM `group` WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun group avec cet id"});
        }
        const q = 'DELETE FROM `group` WHERE id = (?);';
        db.run(q, [req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Group supprime avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les group existant
router.get('/group', authAdmin, (req, res) => {
    const q = 'SELECT * FROM `group`;';
    db.all(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun group"});
        }
        res.status(200).json(data); 
    });
})

export default router; //on export les routes crees