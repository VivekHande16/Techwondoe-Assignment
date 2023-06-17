export interface CompanyDetails {
    name: string;
    ceo: string;
    address: string;
    inception_date: Date;
}

export interface Team {
    id: string;
    lead: string;
}

export interface Company {
    id: string;
    name: string;
    ceo: string;
    address: string;
    inception_date: Date;
    team: Team;
}
