import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, StreamableFile, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ControllerVersionHelper } from 'src/helpers/controllerversion.helper';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import configMulter from 'src/config/multer.config';
import { AuthGuard } from '@nestjs/passport';
import { PaginateDto } from 'src/config/dto/paginate.dto';
import { CreateImageEventDto } from './dto/create-image-event.dto';
import { DeleteEventImageDto } from './dto/delete-event-image.dto';
import { QueryParamsDto } from 'src/event/dto/params.dto';


@Controller(ControllerVersionHelper.v1 + 'event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'photos', maxCount: 8},
    {name: 'imageHeader', maxCount: 1},
  ],
    { storage: configMulter }))
  create(@Body()  createEventDto: CreateEventDto, @UploadedFiles() images: {photos:[Express.Multer.File], imageHeader:Express.Multer.File}) {
    return this.eventService.create({data: createEventDto, images});
  }

  @Get()
  
  findAll(@Query() getParam : QueryParamsDto) {
    return this.eventService.findAll(getParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne( {id});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateData(id, updateEventDto);
  }

  @Post("images/:id")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'photos', maxCount: 8},
    {name: 'imageHeader', maxCount: 1},
  ],
    { storage: configMulter }))
  updateImage(@Param('id') id: string, @UploadedFiles() images: CreateImageEventDto) {
    return this.eventService.updateImage(id, images);
  }

  @Delete('images/:id')
  @UseGuards(AuthGuard('jwt'))
  removeImage(@Param('id') id: string, @Body() deleteEventImage: DeleteEventImageDto) {
    return this.eventService.removeImage(id, deleteEventImage);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @Get('/file/:filename')
  getFile(@Param('filename') filename: string): Promise<StreamableFile>  {
    return this.eventService.getFile(filename);
  }
}
