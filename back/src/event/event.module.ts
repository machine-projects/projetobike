import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './entities/event.entity';
import { FeaturedEventEntity } from './entities/featuredEvent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, FeaturedEventEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
