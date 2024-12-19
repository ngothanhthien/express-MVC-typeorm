import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { AppDataSource } from "@/data-source"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;
}

export function getRepository() {
    return AppDataSource.getRepository(User)
}
