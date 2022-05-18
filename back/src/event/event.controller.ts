import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ControllerVersionHelper } from 'src/helpers/controllerversion.helper';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import configMulter from 'src/config/multer.config';


@Controller(ControllerVersionHelper.v1 + 'event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'photos', maxCount: 8},
    {name: 'imageHeader', maxCount: 1},
  ],
    { storage: configMulter }))
  create(@Body() createEventDto: any, @UploadedFiles() images: {photos:[Express.Multer.File], imageHeader:Express.Multer.File}) {
    createEventDto.photos = images.photos.map(el => el.filename);
    createEventDto.imageHeader = images.imageHeader? images.imageHeader[0]: undefined;

    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
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
