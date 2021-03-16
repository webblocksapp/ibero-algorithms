import { DoCheck } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export declare class BsInputComponent extends DataInputBase implements DoCheck {
    class: string;
    ngDoCheck(): void;
    bindWatchModelEvents(): void;
    bindFocusoutEvents(event: any): any;
    bindKeyupEvents(event: any): any;
}
