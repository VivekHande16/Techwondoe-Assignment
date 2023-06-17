import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Company } from './Company';

@Entity('team')
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'lead' })
    lead: string;

    @ManyToOne(() => Company, company => company.teams)
    company: Company;
}
