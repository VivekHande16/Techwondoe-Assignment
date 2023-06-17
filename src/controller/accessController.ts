import express from 'express';
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
import { AUDIENCE, ISSUER_BASE_URL } from '../../config';
import { Request, Response, NextFunction } from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    auth({
        audience: AUDIENCE,
        issuerBaseURL: ISSUER_BASE_URL,
    })(req, res, (err: any) => {
        if (err) {
            return res.status(403).json({ error: 'unauthorized' });
        }
        return next(err);
    });
};

export const checkRoles = (requiredScope: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        requiredScopes(requiredScope)(req, res, (err: any) => {
            if (err) {
                return res.status(403).json({ error: 'Access token dont have required roles to access the api' });
            }
            return next(err);
        });
    };
};
