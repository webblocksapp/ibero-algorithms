import { IsNotEmpty } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class MoneyConversorDto {
  @IsNotEmpty()
  initialCurrency: string;

  @IsNumber({ message: 'Value must be numeric' })
  initialCurrencyValue: number;

  @IsNotEmpty()
  targetCurrency: string;

  @IsNumber({ message: 'Value must be numeric' })
  targetCurrencyValue: number;
}
