import { ElementRef } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export declare class BsFileComponent extends DataInputBase {
    class: string;
    fileInput: ElementRef;
    customFileLabel: ElementRef;
    multiple: boolean;
    endSlotHtml: string;
    private clicked;
    bindChangeEvents(event: any): any;
    bindFocusEvents(event: any): any;
    clickFileInput(): void;
    getFileOrFiles(): any;
    getFileNames(files: any): string;
    onClickHost(): void;
}
