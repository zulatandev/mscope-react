import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IsNumber, IsString, IsEmail, IsEmpty } from 'class-validator';

@Entity('users')
export class UserEntity extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column()
  firstName: string;

  @IsString()
  @Column()
  lastName: string;

  @IsString()
  @Column()
  phoneNumber: string;

  @IsString()
  @Column()
  password: string;

  @IsString()
  @Column()
  role: string;

  @IsEmpty()
  @Column()
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
