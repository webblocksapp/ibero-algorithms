import { OnInit, QueryList, AfterContentInit } from '@angular/core';
export declare class DataGroupComponent implements OnInit, AfterContentInit {
    class: string;
    dataInputs: QueryList<any>;
    dataInputComponents: Array<any>;
    constructor();
    ngOnInit(): void;
    ngAfterContentInit(): void;
    loadDataInputComponents(): void;
    getDataInputComponents(): Array<any>;
}
