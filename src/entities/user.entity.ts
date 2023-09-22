import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    isAmbassador: boolean;
}