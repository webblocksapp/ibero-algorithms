import { DoCheck, ElementRef, QueryList } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { CheckDisplay, CheckLook } from '../common/types';
export declare class BsChecksComponent extends DataInputBase implements DoCheck {
    options: Array<any>;
    display: CheckDisplay;
    look: CheckLook;
    checkboxes: QueryList<ElementRef>;
    ngDoCheck(): void;
    bindWatchModelEvents(): void;
    detectPropertiesChanges(propName: string): void;
    bindClickEvents(event: any): any;
    getCheckboxesValues(): Array<any>;
    enableOrDisableCheckboxes(): void;
    initCheckedOptions(): void;
    refreshCheckboxes(): void;
    refresh(): void;
}
