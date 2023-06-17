import express from 'express';
import { createCompany, getCompanyById, searchCompanyByName } from './controller/companyController';
import { createTeam, getTeams } from './controller/teamController';
import { checkToken, checkRoles } from './controller/accessController';
import { API_V1_VERSION } from '../config';

const router = express.Router();

router.post(`/${API_V1_VERSION}/company`, checkToken, checkRoles('create:users'), createCompany);
router.get(`/${API_V1_VERSION}/company/:companyId`, checkToken, checkRoles('read:users'), getCompanyById);
router.get(`/${API_V1_VERSION}/company`, checkToken, checkRoles('read:users'), searchCompanyByName);

router.post(`/${API_V1_VERSION}/company/:companyId/team`, checkToken, checkRoles('create:users'), createTeam);
router.get(`/${API_V1_VERSION}/teams`, checkToken, checkRoles('read:users'), getTeams);

export default router;
