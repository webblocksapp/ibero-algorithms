import { Error } from './error.type';
export declare type FormattedValidationResult = {
    isValid: boolean;
    validatedData?: any;
    errors?: Error[] | Array<Error[]>;
};
