import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseModelArray } from '@webblocksapp/ng-forms';
import { CoursesDto } from './courses.dto';

@Component({
  selector: 'exercise-2',
  templateUrl: './exercise-2.component.html',
  styles: [
    `
      .status-checks .form-group,
      .status-checks .custom-control-inline {
        margin-bottom: 0px !important;
      }
      .status-checks .invalid-feedback {
        margin-top: 5px !important;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class Exercise2Component implements OnInit {
  public Array = Array;
  public title: string = 'Courses average';
  public coursesModel: BaseModelArray = new BaseModelArray(CoursesDto);
  public average: string = '0';

  ngOnInit(): void {
    this.coursesModel.fill([
      {
        name: 'Fundamentos de Programación y Algorítmica Básica',
        studentsNumber: '40',
        status: 'active',
      },
      {
        name: 'Introducción a la ingeniería de software',
        studentsNumber: '27',
        status: 'active',
      },
      {
        name: 'Introducción a la modalidad virtual',
        studentsNumber: '33',
        status: 'active',
      },
      {
        name: 'Habilidades de la comunicación',
        studentsNumber: '20',
        status: 'active',
      },
    ]);

    this.calcAverage();
  }

  inactiveOnZero(index): void {
    const courseModel = this.coursesModel.find(index);
    const { studentsNumber } = courseModel.getDto();

    if (parseInt(studentsNumber) === 0) {
      courseModel.fill({ status: 'inactive' });
    }
  }

  calcAverage(): void {
    this.coursesModel.validate().then((validationResult) => {
      const { isValid } = validationResult;

      if (isValid) {
        const activeCourses = this.coursesModel
          .getDtos()
          .filter((course) => course.status === 'active');

        const numOfActiveCourses = activeCourses.length || 1;

        this.average = (
          activeCourses.reduce(
            (sum, course) => sum + parseInt(course.studentsNumber),
            0,
          ) / numOfActiveCourses
        )
          .toFixed(2)
          .replace(/\.00$/, '');
      }
    });
  }
}
