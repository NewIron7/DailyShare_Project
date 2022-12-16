import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';
import jwt from 'jsonwebtoken';
import { privateKey } from '../privateKey.js';

const router = express.Router();

//Permet de rejoindre un group
router.post('/userGroup', auth, (req, res) => {
    if (!req.body.group_id)
    {
        const message = "L'id du groupe n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decodeToken = jwt.verify(token, privateKey, (error, decodeToken) => decodeToken);
    const q = 'SELECT user_id FROM `user_group` WHERE user_id = (?) AND group_id = (?);';
    db.get(q, [decodeToken.user.id, req.body.group_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Vous etes deja dans ce groupe"});
        }
        const q = 'INSERT INTO `user_group` (user_id, group_id) VALUES(?, ?);';
        db.run(q, [decodeToken.user.id, req.body.group_id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Group rejoins avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de modifier un group existant a partir de son id
router.put('/group/:id', authAdmin, (req, res) => {
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
router.delete('/group/:id', authAdmin, (req, res) => {
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

export default router; //on export les routes creesd