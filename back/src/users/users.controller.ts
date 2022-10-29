import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards, Res, StreamableFile, Query, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ControllerVersionHelper } from 'src/helpers/controllerversion.helper';
import { AuthGuard } from '@nestjs/passport';
import { PaginateDto } from 'src/config/dto/paginate.dto';
// import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Public } from 'src/guard/public.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { RoleCollaction } from 'src/guard/role.enum';

@Controller(ControllerVersionHelper.v1 + 'users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(...RoleCollaction.Organizador)
  async findAll(@Query() QueryParams? : PaginateDto) {
    return await this.usersService.findAll(QueryParams);
  }


  @Get(':id')
  @Roles(...RoleCollaction.Atleta)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne({id});
  }


  @Patch(':id')
  @Roles(...RoleCollaction.Atleta)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(...RoleCollaction.Atleta)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
  
}
