import { Min, Max } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class NumberDto {
  @Max(10000000, { message: 'Max safe number to play is 9999999' })
  @Min(100, { message: 'Number must have at least 3 digits' })
  @IsNumber({ message: 'Value must be numeric' })
  number: number;
}
