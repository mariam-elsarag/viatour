import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'testimonials' })
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  testimonial: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  avatar: string | null;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
