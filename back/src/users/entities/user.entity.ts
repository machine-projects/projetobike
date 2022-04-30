import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, Entity } from "typeorm";
import { hashSync } from 'bcrypt'

@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column()
    cpf: string;
    @Column()
    password: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }
}
