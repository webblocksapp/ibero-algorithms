import { ValidationError } from '@webblocksapp/class-validator';
import { ValidatorOptions } from '@webblocksapp/class-validator';
import { BehaviorSubject } from 'rxjs';
export declare class BaseModel {
    private dtoObject;
    private errors;
    private map;
    private submitted;
    private resetTimes;
    constructor(DtoClass: any);
    private setDto;
    private incrementResetTimes;
    private resetDto;
    getResetTimes(): BehaviorSubject<number>;
    getDto(): any;
    setValue(key: string, value: any): void;
    getValue(key: string): any;
    setSubmitted(flag: boolean): void;
    getSubmitted(): boolean;
    private setErrors;
    initMap(): void;
    private resetMap;
    private setTouched;
    private cleanError;
    private cleanErrors;
    getErrors(): Array<ValidationError>;
    getMap(): Array<any>;
    getPropertyMap(property: any): any;
    fill(data: any): void;
    validate(validatorOptions?: ValidatorOptions): Promise<any>;
    validateField(fieldName: string, validatorOptions?: ValidatorOptions): Promise<any>;
    reset(): void;
}
