import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateDto } from 'src/config/dto/paginate.dto';
import pgToDefaultKeys, { paginateResponse } from 'src/config/paginate.config';
import {  Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { userMessage } from './messages/users.messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: any) {
    if (await this.usersRepository.findOne({where: [{ cpf: createUserDto.cpf}, {email: createUserDto.email}] }))
      throw new MethodNotAllowedException(userMessage.existCpfOrEmail);
      createUserDto.cpf = createUserDto.cpf.split(".").join("").split("-").join("").trim()
    const user = await this.usersRepository.create(createUserDto);
    const createdUser: any = await this.usersRepository.save(user);
    delete createdUser.password
    return createdUser
  }

  async findAll(params: PaginateDto ) {
    try {
      const paginate = pgToDefaultKeys(params);
      const [allUsers, count] = await this.usersRepository.findAndCount({
        ...paginate.ormPg
      });
      allUsers.map(user => {
        delete user.password
        return {...user}
      })
      return paginateResponse([allUsers, count], paginate.viewPg)
    }
    catch (error) {
      throw error.message
    }
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
   try{
     const user = await this.findOneNotPass({ id });
     const updateUser = this.usersRepository.merge(user, data);
    
     return await this.usersRepository.save(updateUser);
   }
   catch (error){
    throw new NotFoundException(error.message)
   }
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
