import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards, Res, StreamableFile, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ControllerVersionHelper } from 'src/helpers/controllerversion.helper';
import { AuthGuard } from '@nestjs/passport';
import { PaginateDto } from 'src/config/dto/paginate.dto';
// import { Roles } from 'src/auth/roles.decorator';
// import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.guard';

@Controller(ControllerVersionHelper.v1 + 'users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  async findAll(@Query() QueryParams? : PaginateDto) {
    return await this.usersService.findAll(QueryParams);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne({id});
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
  
}
