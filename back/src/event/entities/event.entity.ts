import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'event' })
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  startDate: Date;

  @Column()
  stopDate: Date;

  @Column()
  @Index()
  state: string;

  @Column()
  @Index()
  city: string;
  
  @Column({ type: 'json' })
  images: {
    gallery: any;
    header: any;
  };
  @Column()
  @Index()
  isFeatured: Boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
