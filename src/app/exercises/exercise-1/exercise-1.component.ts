import { Component, OnInit } from '@angular/core';
import { BaseModel, SelectOption } from '@webblocksapp/ng-forms';
import { MoneyConversorDto } from './money-conversor.dto';

type Currency = {
  name: string;
  value: number;
};

@Component({
  selector: 'exercise-1',
  templateUrl: './exercise-1.component.html',
})
export class Exercise1Component implements OnInit {
  public title: string = '1. Currency conversor';
  public moneyConversorModel: BaseModel = new BaseModel(MoneyConversorDto);
  public currencies: Array<SelectOption> = [
    { value: 'cop', viewValue: 'Peso Colombiano' },
    { value: 'usd', viewValue: 'Dolar Estadounidense' },
    { value: 'eur', viewValue: 'Euro' },
  ];

  ngOnInit(): void {
    this.moneyConversorModel.fill({
      initialCurrency: 'cop',
      initialCurrencyValue: '0',
      targetCurrency: 'cop',
      targetCurrencyValue: '0',
    });
  }

  private conversionRates: Array<{
    currency: string;
    rates: Array<{ value: number; currency: string }>;
  }> = [
    {
      currency: 'usd',
      rates: [
        { value: 3559, currency: 'cop' },
        { value: 0.84, currency: 'eur' },
        { value: 1, currency: 'usd' },
      ],
    },
    {
      currency: 'cop',
      rates: [
        { value: 1, currency: 'cop' },
        { value: 0.00028, currency: 'usd' },
        { value: 0.00024, currency: 'cop' },
      ],
    },
    {
      currency: 'eur',
      rates: [
        { value: 1, currency: 'eur' },
        { value: 1.19, currency: 'usd' },
        { value: 4237.21, currency: 'cop' },
      ],
    },
  ];

  convert(direction: string) {
    const {
      initialCurrency,
      initialCurrencyValue,
      targetCurrency,
      targetCurrencyValue,
    } = this.moneyConversorModel.getDto();

    this.moneyConversorModel.validate().then((validationResult) => {
      const { isValid } = validationResult;

      if (isValid) {
        if (direction === 'target') {
          const conversion = this.calculateConversionRate(
            { name: initialCurrency, value: initialCurrencyValue },
            { name: targetCurrency, value: targetCurrencyValue },
          );

          this.moneyConversorModel.fill({ targetCurrencyValue: conversion });
        }

        if (direction === 'initial') {
          const conversion = this.calculateConversionRate(
            { name: targetCurrency, value: targetCurrencyValue },
            { name: initialCurrency, value: initialCurrencyValue },
          );

          this.moneyConversorModel.fill({ initialCurrencyValue: conversion });
        }
      }
    });
  }

  private calculateConversionRate(
    currency1: Currency,
    currency2: Currency,
  ): string {
    const conversionRate = this.conversionRates.find(
      (conversionRate) => conversionRate.currency === currency1.name,
    );
    const rate = conversionRate.rates.find(
      (rate) => rate.currency === currency2.name,
    );

    return String(
      (currency1.value * rate.value).toFixed(4).replace(/\.0000$/, ''),
    );
  }
}
