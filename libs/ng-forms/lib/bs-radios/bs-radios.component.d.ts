import { DoCheck, ElementRef, QueryList } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { RadioDisplay, RadioLook } from '../common/types';
export declare class BsRadiosComponent extends DataInputBase implements DoCheck {
    options: Array<any>;
    display: RadioDisplay;
    look: RadioLook;
    radios: QueryList<ElementRef>;
    ngDoCheck(): void;
    bindWatchModelEvents(): void;
    detectPropertiesChanges(propName: string): void;
    bindClickEvents(event: any): any;
    getRadiosValue(): Array<any>;
    enableOrDisableRadios(): void;
    initCheckedOption(): void;
    refreshRadios(): void;
    refresh(): void;
}
