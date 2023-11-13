import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'username' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'user password hash' })
  @Column()
  password_hash: string;

  @ApiProperty({ description: 'create timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'update timestamp' })
  @UpdateDateColumn()
  updated_at: Date;
}
