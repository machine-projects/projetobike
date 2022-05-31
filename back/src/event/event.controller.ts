import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ControllerVersionHelper } from 'src/helpers/controllerversion.helper';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import configMulter from 'src/config/multer.config';
import { AuthGuard } from '@nestjs/passport';


@Controller(ControllerVersionHelper.v1 + 'event')
@UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'photos', maxCount: 8},
    {name: 'imageHeader', maxCount: 1},
  ],
    { storage: configMulter }))
  create(@Body()  createEventDto: CreateEventDto, @UploadedFiles() images: {photos:[Express.Multer.File], imageHeader:Express.Multer.File}) {
    return this.eventService.create({data: createEventDto, images});
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
