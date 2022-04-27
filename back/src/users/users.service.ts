import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
) { }
  

async create(createUserDto: any) {
    const user =  await this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({select: ['id', 'cpf', 'firstName', 'lastName', 'email', 'createdDate', 'updatedDate']});
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

  async delete(id: string) {
    await this.findOne({id});
    return await this.usersRepository.delete({id});
}
}
