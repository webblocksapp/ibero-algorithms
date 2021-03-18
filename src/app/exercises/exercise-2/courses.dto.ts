import { IsNotEmpty } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class CoursesDto {
  @IsNumber({ message: 'Value must be numeric' })
  studentsNumber: number;

  name: string;

  @IsNotEmpty()
  status: string;
}
