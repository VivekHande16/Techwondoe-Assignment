import { Request, Response } from 'express';
import { create, get, search } from '../component/company';
import { CompanyDetails } from 'src/constants/constant';
import { checkDate, isValidUUID } from '../component/validation';
import logger from '../utils/logger';

export const createCompany = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companyDetails: CompanyDetails = req.body;

        if (!companyDetails.name || !companyDetails.ceo || !companyDetails.address || !companyDetails.inception_date) {
            logger.error('Missing required company details:', companyDetails);
            return res.status(400).json({ error: 'Missing required company details' });
        }

        const inceptionDate = new Date(companyDetails.inception_date);
        companyDetails.inception_date = inceptionDate;

        const isValidDate = checkDate(companyDetails.inception_date);
        if (!isValidDate) {
            logger.error('Invalid inception date:', companyDetails.inception_date);
            return res.status(400).json({ error: 'Invalid inception date' });
        }

        const company = await create(companyDetails);
        logger.info('Company created successfully:', company);

        return res.status(201).json(company);
    } catch (error) {
        logger.error('Error creating company:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCompanyById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { companyId } = req.params;
        if (!isValidUUID(companyId)) {
            logger.info(`companyId: ${companyId} is not valid`);
            return res.status(400).json({ error: `companyId: ${companyId} is not valid` });
        }

        const company = await get(companyId);
        if (!company) {
            return res.status(404).json({ error: `company with id: ${companyId} do not exists` });
        }

        return res.status(200).json(company);
    } catch (error) {
        logger.error('Error getting company details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const searchCompanyByName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Company name is required' });
        }

        const company = await search(name as string);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        return res.status(200).json(company);
    } catch (error) {
        logger.error('Error getting company details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
