import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Team } from './Team';

@Entity('company')
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name' })
    @Index()
    name: string;

    @Column({ name: 'ceo' })
    ceo: string;

    @Column({ name: 'address' })
    address: string;

    @Column({ type: 'date' })
    inception_date: Date;

    @OneToMany(() => Team, team => team.company)
    teams: Team[];
}
