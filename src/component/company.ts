const { getRepository } = require('typeorm');
import { CompanyDetails } from 'src/constants/constant';
import { Company } from '../entity/Company';
import { Like } from 'typeorm';

export const create = async (company: CompanyDetails): Promise<Company> => {
    const savedCompany: Company = await getRepository(Company).save(company);
    return savedCompany;
};

export const get = async (companyId: string): Promise<Company | null> => {
    const companyRepository = getRepository(Company);
    const company: Company | null = await companyRepository.findOne({ where: { id: companyId } });
    return company;
};

export const search = async (name: string): Promise<Company | null> => {
    const companyRepository = getRepository(Company);
    const company: Company | null = await companyRepository.findOne({ where: { name: Like(`%${name}`) } });
    return company;
};
