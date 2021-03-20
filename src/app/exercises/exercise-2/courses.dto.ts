import { IsNotEmpty } from '@webblocksapp/class-validator';
import { IsNumber } from '@validations';

export class CourseDto {
  @IsNumber({ message: 'Value must be numeric' })
  studentsNumber: number;

  name: string;

  @IsNotEmpty()
  status: string;
}
