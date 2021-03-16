import { BehaviorSubject } from 'rxjs';
import { BaseModel } from './base-model';
export declare class BaseModelArray {
    private dtoClass;
    private array;
    private change;
    constructor(DtoClass: any);
    fill(data: Array<any>): void;
    get(): Array<BaseModel>;
    find(index: number): BaseModel;
    add(data?: any): void;
    delete(index: number): void;
    count(): number;
    emitChange(): void;
    getChange(): BehaviorSubject<Boolean>;
}
