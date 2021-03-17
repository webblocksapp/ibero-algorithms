import { Matches, IsNotEmpty } from '@webblocksapp/class-validator';

export class CoursesDto {
  @Matches(/^-?\d*\.?\d*$/, {
    message: 'Required numeric value',
  })
  studentsNumber: number;

  name: string;

  @IsNotEmpty()
  status: string;
}
