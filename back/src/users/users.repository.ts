import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./entities/user.entity";
import { FindConditions, FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto } from "./dto/create-user.dto";


export class UsersRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) { }

    async findAll() {
        return await this.usersRepository.find({select: ['id','username', 'cpf', 'firstName', 'lastName', 'email', 'createdDate', 'updatedDate']});
    }

    async findOne(
        conditions: FindConditions<UsersEntity>,
        options?: FindOneOptions<UsersEntity>) {
        try {

            return this.usersRepository.findOneOrFail(conditions, options)
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id: string, data) {
        const user =  await this.findOne({id});
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);

    }
    async create(data) {
        const user =  await this.usersRepository.create(data)
        return await this.usersRepository.save(user);

    }

    async delete(id: string) {
        await this.findOne({id});
        return this.usersRepository.softDelete({id});
    }

}