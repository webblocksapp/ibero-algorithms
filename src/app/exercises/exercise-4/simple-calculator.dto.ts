import { IsNotEmpty } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class SimpleCalculatorDto {
  @IsNumber({ message: 'Value must be numeric' })
  number1: number;

  @IsNumber({ message: 'Value must be numeric' })
  number2: number;

  @IsNotEmpty()
  operator: string;
}
