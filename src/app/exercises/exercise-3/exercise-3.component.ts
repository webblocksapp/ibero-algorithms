import { Component } from '@angular/core';
import { BaseModel } from '@webblocksapp/ng-forms';
import { NumberDto } from './number.dto';

@Component({
  selector: 'exercise-3',
  templateUrl: './exercise-3.component.html',
})
export class Exercise3Component {
  public title: string = '3. Playing with numbers';
  public numberModel: BaseModel = new BaseModel(NumberDto);
  public number: number = 0;
  public showResult: boolean = false;
  public isEven: boolean = false;
  public isOdd: boolean = false;
  public isPrime: boolean = false;
  public reversedNumber: number = null;
  public extremesSum: number = null;
  public squaredNumber: number = null;
  public squaredExtremes: Array<number> = [];

  play(): void {
    this.reset();
    this.numberModel.validate().then((validationResult) => {
      const { isValid, validatedData } = validationResult;

      if (isValid) {
        this.showResult = isValid;
        const { number } = validatedData;
        this.number = number;

        if (this.checkIsEven()) {
          this.isEven = true;
          this.reverseNumber();
        }

        if (this.checkIsOdd()) {
          this.isOdd = true;
          this.sumExtremes();
          this.reverseNumber();
        }

        if (this.checkIsPrime()) {
          this.isPrime = true;
          this.squareOfNumber();
          this.squareOfExtremes();
        }
      }
    });
  }

  reset(): void {
    this.showResult = false;
    this.isEven = false;
    this.isOdd = false;
    this.isPrime = false;
    this.reversedNumber = null;
    this.extremesSum = null;
    this.squaredNumber = null;
    this.squaredExtremes = [];
  }

  checkIsEven(): boolean {
    const module = this.number % 2;
    if (module === 0) {
      return true;
    }
    return false;
  }

  checkIsOdd(): boolean {
    const module = this.number % 2;
    if (module > 0) {
      return true;
    }
    return false;
  }

  checkIsPrime(): boolean {
    const divisors = [];

    for (let i = 1; i <= this.number; i++) {
      const module = this.number % i;
      if (module === 0) {
        divisors.push(i);
      }
    }

    if (divisors.length === 2) {
      return true;
    }

    return false;
  }

  numberToArray(): Array<string> {
    let stringNumber: string = String(this.number);
    return stringNumber.split('');
  }

  reverseNumber(): void {
    let array = this.numberToArray();
    let invertedArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      invertedArray.push(array[i]);
    }

    this.reversedNumber = +invertedArray.join('');
  }

  sumExtremes(): void {
    let array = this.numberToArray();
    this.extremesSum = +array[0] + +array[array.length - 1];
  }

  squareOfNumber(): void {
    this.squaredNumber = this.number * this.number;
  }

  squareOfExtremes(): void {
    let array = this.numberToArray();
    const firstNumber = +array[0];
    const lastNumber = +array[array.length - 1];

    this.squaredExtremes = [firstNumber * firstNumber, lastNumber * lastNumber];
  }
}
