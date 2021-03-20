import { Component, OnInit } from '@angular/core';
import { BaseModel } from '@webblocksapp/ng-forms';
import { TransactionDto } from './transaction.dto';

@Component({
  selector: 'exercise-5',
  templateUrl: './exercise-5.component.html',
})
export class Exercise5Component implements OnInit {
  public title: string = '5. Math operations';
  public transactionModel: BaseModel = new BaseModel(TransactionDto);
  public moneyAmount: number = 0;
  public moneyAvailableToInvest: number = 0;
  public moneyBankLoan: number = 0;
  public moneyLeft: number = 0;
  public moneyLeftInterest: number = 0;

  ngOnInit(): void {
    this.transactionModel.fill({ amount: 100000 });
    this.calc();
  }

  calc(): void {
    this.reset();
    this.transactionModel.validate().then(({ isValid, validatedData }) => {
      if (isValid) {
        this.moneyAmount = validatedData.amount;
        this.scenario1();
        this.scenario2();
      }
    });
  }

  scenario1() {
    if (this.moneyAmount > 200000) {
      this.moneyAvailableToInvest = this.moneyAmount * 0.6;
      this.moneyBankLoan = this.moneyAmount * 0.2;
      this.moneyLeft =
        this.moneyAmount - this.moneyAvailableToInvest - this.moneyBankLoan;
      this.moneyLeftInterest = this.moneyLeft * 0.19;
    }
  }

  scenario2() {
    if (this.moneyAmount <= 200000) {
      this.moneyAvailableToInvest = this.moneyAmount * 0.8;
      this.moneyLeft = this.moneyAmount - this.moneyAvailableToInvest;
      this.moneyLeftInterest = this.moneyLeft * 0.19;
    }
  }

  reset() {
    this.moneyAmount = 0;
    this.moneyAvailableToInvest = 0;
    this.moneyBankLoan = 0;
    this.moneyLeft = 0;
    this.moneyLeftInterest = 0;
  }
}
