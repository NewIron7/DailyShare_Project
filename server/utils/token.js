import jwt from 'jsonwebtoken';
import { privateKey } from '../privateKey.js';

export function get_decode_token( authorizationHeader )
{
    const token = authorizationHeader.split(' ')[1];
    return jwt.verify(token,
                    privateKey,
                    (error, decodeToken) => decodeToken);
}