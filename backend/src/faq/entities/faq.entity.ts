import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'faq' })
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 155 })
  question: string;

  @Column({ type: 'varchar', length: 255 })
  answer: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
