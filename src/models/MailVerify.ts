import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { AppDataSource } from "@/data-source"

@Entity('mail_verify')
export class MailVerify {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    mail!: string;

    @Index()
    @Column()
    code!: string;

    @Column({
        type: 'datetime',
    })
    sendAt!: Date;

    @Column({
        type: 'datetime',
    })
    expireAt!: Date;
}

export function getRepository() {
    return AppDataSource.getRepository(MailVerify)
}
