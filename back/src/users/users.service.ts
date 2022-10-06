import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/user.entity';
import { userMessage } from './messages/users.messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: any) {
    if (await this.usersRepository.findOne({where: { cpf: createUserDto.cpf} }))
      throw new NotFoundException(userMessage.existCpf);
    const user = await this.usersRepository.create(createUserDto);
    const createdUser: any = await this.usersRepository.save(user);
    delete createdUser.password
    return createdUser
  }

  async findAll() {
    return await this.usersRepository.find({
      select: [
        'id',
        'cpf',
        'firstName',
        'lastName',
        'email',
        'createdDate',
        'updatedDate',
        'sex',
        'birthDate',
        'state',
        'city',
        'phoneNumber',
        'emergencyContactName',
        'emergencyContactPhoneNumber',
        'accountType'
      ],
    });
  }

  async findOne(conditions?: any) {
    try {
      return this.usersRepository.findOneOrFail({where: conditions});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneNotPass(condition: any) {

    return await this.usersRepository.findOneOrFail({select: [
      'id',
      'cpf',
      'firstName',
      'lastName',
      'email',
      'createdDate',
      'updatedDate',
      'sex',
      'birthDate',
      'state',
      'city',
      'phoneNumber',
      'emergencyContactName',
      'emergencyContactPhoneNumber',
      'accountType'
    ], where: {...condition}});
  }

  async update(id: string, data) {
    const user = await this.findOneNotPass({ id });
    this.usersRepository.merge(user, data);
    const options = {
      select: [
        'id',
        'cpf',
        'firstName',
        'lastName',
        'email',
        'createdDate',
        'updatedDate',
      ],
    };
    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    try{
      const user = await this.findOneNotPass({ id });
      await this.usersRepository.delete( { id });
      return user
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
