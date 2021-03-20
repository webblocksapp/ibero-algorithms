import { Min } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class TransactionDto {
  @Min(100000)
  @IsNumber({ message: 'Value must be numeric.' })
  amount: number;
}
