import {
  registerDecorator,
  ValidationOptions,
} from '@webblocksapp/class-validator';

export function IsNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return !isNaN(value);
        },
      },
    });
  };
}
