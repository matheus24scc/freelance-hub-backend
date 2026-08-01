import { IsNumber, Min, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  stripeId: string;

  @IsNumber()
  orderId: number;

  @IsNumber()
  userId: number;
}
