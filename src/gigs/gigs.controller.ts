import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GigsService } from './gigs.service';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('gigs')
export class GigsController {
  constructor(private readonly gigsService: GigsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGigDto: CreateGigDto, @Request() req) {
    // Set the freelancerId from the authenticated user
    createGigDto.freelancerId = req.user.id;
    return this.gigsService.create(createGigDto);
  }

  @Get()
  findAll() {
    return this.gigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gigsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateGigDto: UpdateGigDto,
  ) {
    return this.gigsService.update(+id, updateGigDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.gigsService.remove(+id);
  }
}
