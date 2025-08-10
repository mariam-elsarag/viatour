import { userRole } from 'src/utils/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'supports' })
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.Visitor,
  })
  role: userRole;

  @Column({ type: 'bool', default: false })
  isReplied: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
