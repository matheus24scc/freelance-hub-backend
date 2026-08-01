import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  senderId: number;

  @IsInt()
  @IsNotEmpty()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
