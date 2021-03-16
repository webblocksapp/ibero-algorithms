import { ValidationError } from '@webblocksapp/class-validator';
export declare type ValidationResult = {
    isValid: boolean;
    validatedData: any;
    errors: ValidationError[];
};
