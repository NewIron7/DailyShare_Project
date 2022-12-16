import jwt from 'jsonwebtoken';
import { privateKey } from '../privateKey.js';

export const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader)
    {
        const message = "Vous n'etes pas connecte !";
        return res.status(401).json({message});
    }

    const token = authorizationHeader.split(' ')[1];
    const decodeToken = jwt.verify(token, privateKey, (error, decodeToken) => {
        if(error)
        {
            const message = "Vous n'etes pas correctement connecte";
            return res.status(401).json({message, data: error});
        }
        const username = decodeToken.username;
        if (req.body.username && req.body.username !== username)
        {
            const message = "Le token d'authentification ne vous appartient pas";
            return res.status(401).json({message});
        }
        next();
    });
}