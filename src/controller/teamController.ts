import { Request, Response } from 'express';
import logger from '../utils/logger';
import { create, get } from '../component/team';
import { isValidUUID } from '../component/validation';

export const createTeam = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { companyId } = req.params;
        const { lead } = req.body;

        if (!isValidUUID(companyId)) {
            logger.info(`companyId: ${companyId} is not valid`);
            return res.status(400).json({ error: `companyId: ${companyId} is not valid` });
        }

        const team = await create(companyId, lead);

        if (!team) {
            logger.info(`Failed to create team. Company with id: ${companyId} not found`);
            return res.status(404).json({ error: `Failed to create team. Company with id: ${companyId} not found` });
        }

        logger.info('team created successfully:', team);
        return res.status(201).json(team);
    } catch (error) {
        logger.error('Error creating new team:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTeams = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies = await get();
        return res.status(200).json(companies);
    } catch (error) {
        logger.error('Error getting teams details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
