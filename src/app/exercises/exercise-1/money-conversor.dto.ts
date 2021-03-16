import { IsNotEmpty, Matches } from '@webblocksapp/class-validator';

export class MoneyConversorDto {
  @IsNotEmpty()
  initialCurrency: string;

  @Matches(/^-?\d*\.?\d*$/, {
    message: 'Currency value must be numeric',
  })
  initialCurrencyValue: number;

  @IsNotEmpty()
  targetCurrency: string;

  @Matches(/^-?\d*\.?\d*$/, {
    message: 'Currency value must be numeric',
  })
  targetCurrencyValue: number;
}
