import { Component, OnInit } from '@angular/core';
import { BaseModel } from '@webblocksapp/ng-forms';
import { SimpleCalculatorDto } from './simple-calculator.dto';

@Component({
  selector: 'exercise-4',
  templateUrl: './exercise-4.component.html',
})
export class Exercise4Component implements OnInit {
  public title: string = '4. Math Operations';
  public simpleCalculatorModel: BaseModel = new BaseModel(SimpleCalculatorDto);
  public result: number = 0;

  ngOnInit(): void {
    this.simpleCalculatorModel.fill({ number1: 0, number2: 0, operator: '+' });
    this.calc();
  }

  calc(): void {
    this.simpleCalculatorModel.validate().then((validationResult) => {
      const { isValid, validatedData } = validationResult;

      if (isValid) {
        const { number1, number2, operator } = validatedData;
        let result = 0;
        switch (operator) {
          case '+':
            result = number1 + number2;
            break;
          case '-':
            result = number1 - number2;
            break;
          case '*':
            result = number1 * number2;
            break;
          case '/':
            result = number1 / number2;
            break;
          default:
            break;
        }

        this.result = +result.toFixed(4).replace(/\.00$/, '');
      }
    });
  }
}
