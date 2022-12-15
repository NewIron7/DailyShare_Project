import express from 'express';
import { db } from '../connectDB.js';
import { auth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

//Permet de creer un day
router.post('/day', authAdmin, (req, res) => {
    if (!req.body.date || !req.body.share_id || !req.body.discover_id || !req.body.act_id)
    {
        const message = "Les informations pour le day n'ont pas ete correctement transmises";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM day WHERE date = (?);';
    db.get(q, [req.body.date], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Deja un day a cette date"});
        }
        const q = 'INSERT INTO day (date, share_id, discover_id, act_id) VALUES(?, ?, ?, ?);';
        db.run(q,
            [req.body.date, req.body.share_id, req.body.discover_id, req.body.act_id],
            (err) => {
                if (err) res.status(500).json(err);
                else {
                    const message = "Day cree avec succes";
                    res.status(200).json({message}); 
                }
            }
        );
    });
})

//Permet de modifier un day existant a partir de son id
router.put('/day/:id', authAdmin, (req, res) => {
    if (!req.body.date && !req.body.share_id && !req.body.discover_id && !req.body.act_id)
    {
        const message = "Les informations pour la modification ont ete mal transmises";
        return res.status(401).json({message});
    }
    const q = 'SELECT * FROM day WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun day avec cet id"});
        }
        const q = 'SELECT id FROM `day` WHERE date = (?) AND id != (?);';
        db.get(q, [req.body.date ? req.body.date : "", req.params.id], (err, dataVerif) => {
            if (err) return res.status(500).json(err);
            if (dataVerif !== undefined) return res
                                            .status(409)
                                            .json({ message : "Deja un day a cet date"});
            const date = req.body.date ? req.body.date : data.date;
            const share_id = req.body.share_id ? req.body.share_id : data.share_id;
            const discover_id = req.body.discover_id ? req.body.discover_id : data.discover_id;
            const act_id = req.body.act_id ? req.body.act_id : data.act_id;
            const q = 'UPDATE day set date = (?),\
                    share_id = (?), discover_id = (?), act_id = (?) WHERE id = (?);';
            db.run(q, [date, share_id, discover_id, act_id, req.params.id], (err) => {
                if (err) res.status(500).json(err);
                else {
                    const message = "Day modifie avec succes";
                    res.status(200).json({message}); 
                }
            });
        });
    });
})

//Permet de supprimer un day a partir de son id
router.delete('/day/:id', authAdmin, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le day n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const q = 'SELECT id FROM day WHERE id = (?);';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun day avec cet id"});
        }
        const q = 'DELETE FROM day WHERE id = (?);';
        db.run(q, [req.params.id], (err) => {
            if (err) res.status(500).json(err);
            else {
                const message = "Day supprime avec succes";
                res.status(200).json({message}); 
            }
        });
    });
})

//Permet de recuperer tous les day existant
router.get('/day', authAdmin, (req, res) => {
    const date = req.query.date;
    let q = 'SELECT\
    day.date,\
    share.text AS "share_text",\
    discover.text AS "discover_text",\
    discover.picture AS "discover_picture",\
    discover.answer AS "discover_answer",\
    discover.desc AS "discover_desc",\
    act.text AS "act_text",\
    act.desc AS "act_desc"\
    FROM day\
    INNER JOIN share ON share.id = day.share_id\
    INNER JOIN discover ON discover.id = day.discover_id\
    INNER JOIN act ON act.id = day.act_id\
    ;';
    if (date) q = 'SELECT\
    day.date,\
    share.text AS "share_text",\
    discover.text AS "discover_text",\
    discover.picture AS "discover_picture",\
    discover.answer AS "discover_answer",\
    discover.desc AS "discover_desc",\
    act.text AS "act_text",\
    act.desc AS "act_desc"\
    FROM day\
    INNER JOIN share ON share.id = day.share_id\
    INNER JOIN discover ON discover.id = day.discover_id\
    INNER JOIN act ON act.id = day.act_id\
    WHERE day.date = (?)\
    ;';
    db.all(q, [date],(err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun day"});
        }
        res.status(200).json(data); 
    });
})

//Permet de recuperer un day precis
router.get('/day/:id', authAdmin, (req, res) => {
    if (!req.params.id)
    {
        const message = "id pour le day n'a pas ete transmis";
        return res.status(401).json({message});
    }
    const q = 'SELECT\
    day.date,\
    share.text AS "share_text",\
    discover.text AS "discover_text",\
    discover.picture AS "discover_picture",\
    discover.answer AS "discover_answer",\
    discover.desc AS "discover_desc",\
    act.text AS "act_text",\
    act.desc AS "act_desc"\
    FROM day\
    INNER JOIN share ON share.id = day.share_id\
    INNER JOIN discover ON discover.id = day.discover_id\
    INNER JOIN act ON act.id = day.act_id\
    WHERE day.id = (?)\
    ;';
    db.get(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data === undefined)
        {
            return res
                    .status(409)
                    .json({ message : "Aucun day avec cet id"});
        }
        res.status(200).json(data); 
    });
})

export default router; //on export les routes crees