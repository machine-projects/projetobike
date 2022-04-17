import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    cpf: string;
    @Column()
    password: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;


}
