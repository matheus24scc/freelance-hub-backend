import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { senderId, receiverId } = createMessageDto;
    // Validate that users exist
    const [sender, receiver] = await Promise.all([
      this.usersService.findOne(senderId),
      this.usersService.findOne(receiverId),
    ]);
    if (!sender) {
      throw new NotFoundException(`Sender user #${senderId} not found`);
    }
    if (!receiver) {
      throw new NotFoundException(`Receiver user #${receiverId} not found`);
    }
    const message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.messagesRepository.find({ relations: ['sender', 'receiver'] });
  }

  findOne(id: number): Promise<Message> {
    return this.messagesRepository.findOne({ 
      where: { id }, 
      relations: ['sender', 'receiver'] 
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messagesRepository.preload({
      id: id,
      ...updateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.messagesRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await this.messagesRepository.remove(message);
  }
}
