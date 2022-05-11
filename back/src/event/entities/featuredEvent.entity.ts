import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: 'featured_event' })
export class FeaturedEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  photos: [
    {
      patch: string;
      filename: string;
      img_description: string | null | undefined;
      header: boolean;
    } | null,
  ];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(type => EventEntity, event => event.id)
  event: string;
}
