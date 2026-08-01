import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gig } from './gig.entity';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';

@Injectable()
export class GigsService {
  constructor(
    @InjectRepository(Gig)
    private gigsRepository: Repository<Gig>,
  ) {}

  async create(createGigDto: CreateGigDto) {
    const gig = this.gigsRepository.create(createGigDto);
    return this.gigsRepository.save(gig);
  }

  findAll() {
    return this.gigsRepository.find();
  }

  async findOne(id: number) {
    const gig = await this.gigsRepository.findOne({ where: { id } });
    if (!gig) {
      throw new NotFoundException(`Gig with ID ${id} not found`);
    }
    return gig;
  }

  async update(id: number, updateGigDto: UpdateGigDto) {
    const gig = await this.gigsRepository.findOne({ where: { id } });
    if (!gig) {
      throw new NotFoundException(`Gig with ID ${id} not found`);
    }
    Object.assign(gig, updateGigDto);
    return this.gigsRepository.save(gig);
  }

  async remove(id: number) {
    const gig = await this.gigsRepository.findOne({ where: { id } });
    if (!gig) {
      throw new NotFoundException(`Gig with ID ${id} not found`);
    }
    return this.gigsRepository.remove(gig);
  }
}