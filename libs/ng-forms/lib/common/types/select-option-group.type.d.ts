import { SelectOption } from './select-option.type';
export declare type SelectOptionGroup = {
    group: string;
    groupValues: Array<SelectOption>;
    value?: number | string;
    viewValue?: number | string;
    disabled?: boolean;
};
