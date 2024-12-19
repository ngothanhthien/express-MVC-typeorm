import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { AppDataSource } from "@/data-source"

@Entity('candidates')
export class Candidate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    image!: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description!: string;
}

export function getRepository() {
    return AppDataSource.getRepository(Candidate)
}
