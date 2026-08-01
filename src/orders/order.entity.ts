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
import { Gig } from '../gigs/gig.entity';
import { Payment } from './payment.entity';
import { OrderStatus } from './order.status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.ordersAsBuyer)
  @JoinColumn({ name: 'clientId' })
  client: User;

  @Column({ name: 'clientId' })
  clientId: number;

  @ManyToOne(() => User, (user) => user.ordersAsSeller, { nullable: true })
  @JoinColumn({ name: 'freelancerId' })
  freelancer: User | null;

  @Column({ name: 'freelancerId', nullable: true })
  freelancerId: number | null;

  @ManyToOne(() => Gig, (gig) => gig.orders, { nullable: true })
  @JoinColumn({ name: 'gigId' })
  gig: Gig | null;

  @Column({ name: 'gigId', nullable: true })
  gigId: number | null;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
