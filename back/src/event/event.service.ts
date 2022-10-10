import { Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { PaginateDto } from 'src/config/dto/paginate.dto';
import pgToDefaultKeys, { paginateResponse } from 'src/config/paginate.config';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateImageEventDto } from './dto/create-image-event.dto';
import { DeleteEventImageDto } from './dto/delete-event-image.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { FeaturedEventEntity } from './entities/featuredEvent.entity';
import { CreateEventType } from './types/createEvent.type';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(FeaturedEventEntity)
    private readonly featuredEventEntity: Repository<FeaturedEventEntity>
  ) {}

  async create(event: 
    {data:{title: string, city: string, state: string, description: string, isFeatured: Boolean, startDate: Date, stopDate: Date}, images: {photos: any, imageHeader: any}
  }) {
    const myEvent: CreateEventType = {
      title: event.data.title,
      description: event.data.description,
      images: {
        gallery: event.images?.photos || undefined,
        header: event.images?.imageHeader ? event.images.imageHeader[0] :  undefined,
      },
      isFeatured: event.data.isFeatured,
      startDate: event.data.startDate,
      stopDate: event.data.stopDate,
      city: event.data.city,
      state: event.data.state
    }
 
    const createEvent = await this.eventRepository.create(myEvent);
    const createdEvent = await this.eventRepository.save(createEvent);
   
    
    if (createdEvent.isFeatured){
      const createfeaturedEvent = await this.featuredEventEntity.create({event: createdEvent.id})
      await this.featuredEventEntity.save(createfeaturedEvent)
    }
    return createdEvent;
  }
  async updateImage(id: string, images: CreateImageEventDto) {
   
    const event :any = await this.eventRepository.findOneOrFail( {where: {id}})
   const newEvent = event;
    if (images?.imageHeader){
      newEvent.images.header =  images.imageHeader[0] ;
    }
    if (images?.photos){
      let lengthEvent = event.images.gallery.length;
      for (let photo of images?.photos)
      
      if (lengthEvent < 8 ){
        newEvent.images.gallery.push(photo);
      lengthEvent++
      }
      else {
        throw "O numero de imagens exede o suportado"
      }

    }
    return await this.eventRepository.merge(event, newEvent)

    
  }

  async findAll(params : PaginateDto) {
    const paginate = pgToDefaultKeys(params);
    const find = await this.eventRepository.findAndCount({...paginate.ormPg});
    return paginateResponse(find, paginate.viewPg);
  }

  async findOne(contions: any) {
    try {

      return await this.eventRepository.findOneOrFail( {where: contions})
    }
    catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async updateData(id:string, data: UpdateEventDto) {
    const event = await this.eventRepository.findOneOrFail( {where: {id} });
    const updateEvent = this.eventRepository.merge(event, data);
    
    return await this.eventRepository.save(updateEvent);
  }
  async remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async removeImage(id:string, data:DeleteEventImageDto){
    const event = await this.eventRepository.findOneOrFail( {where: {id} });
    

     const newgallery  = event.images.gallery.map(gallery => {
      let isRealData = data.gallery.find(el => gallery.filename ==  el.filename)
      if (isRealData){
        // excluir

      }
      return gallery
    }

      )

      return
     
  }
  
  async getFile(filename: string): Promise<StreamableFile> {
    try{
      if (existsSync(join('uploads', filename))){
        const file = createReadStream(join('uploads', filename));
        return new StreamableFile(file)
      }
      throw new NotFoundException("A imagem não existe")
    }
    catch (error){
      throw new NotFoundException(error.message)
      
    }
  }
  
  

}
