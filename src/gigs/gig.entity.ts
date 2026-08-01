import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Gig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['fixed', 'hourly'],
    default: 'fixed',
  })
  contractType: 'fixed' | 'hourly';

  @Column({ type: 'int' })
  deliveryTime: number; // in days

  @Column('simple-array')
  skills: string[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.gigs)
  @JoinColumn({ name: 'freelancerId' })
  freelancer: User;

  @Column({ name: 'freelancerId' })
  freelancerId: number;

  @OneToMany(() => Order, (order) => order.gig)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
