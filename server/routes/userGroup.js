import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';
import { get_decode_token } from '../utils/token.js';

const router = express.Router();

//Permet de rejoindre un group
router.post('/userGroup', auth, (req, res) => {
    if (!req.body.group_id)
    {
        const message = "L'id du groupe n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const decodeToken = get_decode_token(req.headers.authorization);
    const q = 'SELECT user_id FROM `user_group` WHERE user_id = (?) AND group_id = (?);';
    db.get(q, [decodeToken.data.user.id, req.body.group_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Vous etes deja dans ce groupe"});
        }
        const q = 'INSERT INTO `user_group` (user_id, group_id) VALUES(?, ?);';
        db.run(q, [decodeToken.data.user.id, req.body.group_id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Group rejoins avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de quitter un group
router.delete('/user_group/:id', auth, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le group n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const decodeToken = get_decode_token(req.headers.authorization);
    const q = 'SELECT user_id FROM `user_group` WHERE user_id = (?) AND group_id = (?);';
    db.get(q, [decodeToken.data.user.id, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Vous n'etes pas dans ce group"});
        }
        const q = 'DELETE FROM `user_group` WHERE user_id = (?) AND group_id = (?);';
        db.run(q, [decodeToken.data.user.id, req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Group quitte avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les group auquel l'utilisateur appartient
router.get('/user_group', auth, (req, res) => {
    const q = 'SELECT `group`.id,`group`.name, `group`.picture FROM user_group\
        INNER JOIN `group` ON `group`.id = user_group.group_id\
        WHERE user_group.user_id = (?)';
    const decodeToken = get_decode_token(req.headers.authorization);
    db.all(q, [decodeToken.data.user.id], (err, data) => {
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