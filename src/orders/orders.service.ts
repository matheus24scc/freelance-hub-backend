import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { GigsService } from '../gigs/gigs.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private gigsService: GigsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, clientId: number): Promise<Order> {
    const { gigId, ...orderData } = createOrderDto;
    const order = this.ordersRepository.create({
      ...orderData,
      clientId,
    });

    if (gigId) {
      const gig = await this.gigsService.findOne(gigId);
      if (!gig) {
        throw new NotFoundException(`Gig #${gigId} not found`);
      }
      order.gig = gig;
      order.gigId = gigId;
    }

    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['client', 'freelancer', 'gig', 'payments'] });
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({ where: { id }, relations: ['client', 'freelancer', 'gig', 'payments'] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.preload({
      id: id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }
}
