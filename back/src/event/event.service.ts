import { Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PaginateDto } from 'src/config/dto/paginate.dto';
import { DefaultPaginateType, PaginateType } from 'src/config/types/paginate.config.type';
import { Repository } from 'typeorm';
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

  async findAll(filter: DefaultPaginateType) {
    
    const find = await this.eventRepository.find({...filter});
    return find;
  }

  async findOne(contions: any,
    ) {
    try {

      return await this.eventRepository.findOneOrFail( {where: contions})
    }
    catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
   
   
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    return `This action removes a #${id} event`;
  }
  
  async getFile(filename: string): Promise<StreamableFile> {
    const file = createReadStream(join('uploads', filename));
    return new StreamableFile(file)
  }
  
  

}
