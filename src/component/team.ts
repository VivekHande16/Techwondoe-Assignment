const { getRepository } = require('typeorm');
import { Team } from '../entity/Team';
import { Company } from '../entity/Company';

export const create = async (companyId: string, lead: string): Promise<Team | boolean> => {
    const company = await getRepository(Company).findOne({ where: { id: companyId } });

    if (!company) {
        return false;
    }

    const team = new Team();
    team.lead = lead;
    team.company = company;

    const savedTeam: Team = await team.save();

    return savedTeam;
};

export const get = async (): Promise<Team[]> => {
    const companies = await getRepository(Company).find({ relations: ['teams'] });
    const teamsByCompany = companies.map((company: Company) => ({
        id: company.id,
        name: company.name,
        inception_date: company.inception_date,
        address: company.address,
        teams: company.teams,
    }));

    return teamsByCompany;
};
