import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Notification } from '../notifications/notification.entity';
import { Gig } from '../gigs/gig.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['CLIENT', 'FREELANCER'],
    default: 'CLIENT',
  })
  role: 'CLIENT' | 'FREELANCER';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Gig, (gig) => gig.freelancer)
  gigs: Gig[];

  @OneToMany(() => Order, (order) => order.client)
  ordersAsBuyer: Order[];

  @OneToMany(() => Order, (order) => order.freelancer)
  ordersAsSeller: Order[];
}
