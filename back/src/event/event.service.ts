import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { FeaturedEventEntity } from './entities/featuredEvent.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly featuredEventEntity: Repository<FeaturedEventEntity>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventRepository.create(createEventDto);
    return event;
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    return await this.eventRepository.findOne(id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
