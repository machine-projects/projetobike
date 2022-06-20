import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
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
    if (await this.usersRepository.findOne({ email: createUserDto.email }))
      throw new NotFoundException(userMessage.existEmail);
    const user = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
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

  async findOne(conditions: FindConditions<UsersEntity>, options?: any) {
    try {
      return this.usersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneNotPass(conditions: FindConditions<UsersEntity>) {
    // { select: ['id', 'cpf', 'firstName', 'lastName', 'email', 'createdDate', 'updatedDate'] }
    let options = {
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

    return await this.findOne(conditions, options);
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
    await this.findOne({ id }, {});
    return await this.usersRepository.delete({ id });
  }
}
