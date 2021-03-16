import { EventEmitter, Directive, KeyValueDiffers, NgZone, Input, HostBinding, Output, Component, NgModule, ContentChildren, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 } from 'uuid';
import { validate } from '@webblocksapp/class-validator';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

class BaseModel {
    constructor(DtoClass) {
        this.errors = [];
        this.map = [];
        this.submitted = false;
        this.resetTimes = new BehaviorSubject(0);
        this.setDto(DtoClass);
    }
    setDto(DtoClass) {
        this.dtoObject = new DtoClass();
    }
    incrementResetTimes() {
        const currentValue = this.resetTimes.getValue();
        this.resetTimes.next(currentValue + 1);
    }
    resetDto() {
        const keys = Object.keys(this.dtoObject);
        keys.forEach((key) => {
            this.dtoObject[key] = null;
        });
    }
    getResetTimes() {
        return this.resetTimes;
    }
    getDto() {
        return this.dtoObject;
    }
    setValue(key, value) {
        this.dtoObject[key] = value || null;
    }
    getValue(key) {
        return this.dtoObject[key];
    }
    setSubmitted(flag) {
        this.submitted = flag;
    }
    getSubmitted() {
        return this.submitted;
    }
    setErrors(errors) {
        this.errors = Object.assign(this.errors, errors);
    }
    initMap() {
        const keys = Object.keys(this.dtoObject);
        keys.forEach((key) => {
            const filteredMap = this.map.filter((item) => item.property === key);
            if (filteredMap.length === 0) {
                this.map.push({ property: key, touched: false });
            }
        });
    }
    resetMap() {
        this.map = [];
        this.initMap();
    }
    setTouched(property = null, touched = true) {
        if (property) {
            this.map.map((item) => {
                if (item.property === property) {
                    item.touched = touched;
                }
            });
        }
        else {
            this.map.map((item) => {
                item.touched = touched;
            });
        }
    }
    cleanError(fieldName) {
        this.errors = this.errors.filter((error) => error.property !== fieldName);
    }
    cleanErrors() {
        this.errors = [];
    }
    getErrors() {
        return this.errors;
    }
    getMap() {
        return this.map;
    }
    getPropertyMap(property) {
        const filteredMap = this.map.filter((item) => item.property === property);
        if (filteredMap.length > 0) {
            return filteredMap[0];
        }
        return null;
    }
    fill(data) {
        const objectKeys = Object.keys(data);
        objectKeys.forEach((key) => {
            const value = data[key];
            this.setValue(key, value);
        });
    }
    validate(validatorOptions) {
        return new Promise((resolve) => {
            validatorOptions = Object.assign({
                propertyName: undefined,
                stopAtFirstError: true,
            }, validatorOptions);
            validate(this.dtoObject, validatorOptions).then((errors) => {
                if (errors.length === 0) {
                    this.cleanErrors();
                    resolve({
                        isValid: true,
                        validatedData: this.dtoObject,
                        errors: null,
                    });
                }
                if (errors.length > 0) {
                    this.setErrors(errors);
                    resolve({ isValid: false, validatedData: null, errors });
                }
                this.setTouched();
            });
        });
    }
    validateField(fieldName, validatorOptions) {
        return new Promise((resolve, reject) => {
            validatorOptions = Object.assign({
                propertyName: fieldName,
                stopAtFirstError: true,
            }, validatorOptions);
            validate(this.dtoObject, validatorOptions).then((errors) => {
                if (errors.length === 0) {
                    this.cleanError(fieldName);
                    resolve(this.dtoObject[fieldName]);
                }
                if (errors.length > 0) {
                    this.setErrors(errors);
                    reject(errors);
                }
                this.setTouched(fieldName);
            });
        });
    }
    reset() {
        this.cleanErrors();
        this.setSubmitted(false);
        this.resetDto();
        this.resetMap();
        this.incrementResetTimes();
    }
}

const setValueByPath = (object, path, value) => {
    const arrayPath = path.split('.');
    let iteratedObject = object;
    arrayPath.forEach((pathItem, index) => {
        if (index === arrayPath.length - 1) {
            iteratedObject[pathItem] = value;
        }
        else {
            iteratedObject = iteratedObject[pathItem];
        }
    });
};
const ɵ0 = setValueByPath;

const capitalize = (str) => {
    if (str)
        return str.charAt(0).toUpperCase() + str.slice(1);
    return null;
};
const ɵ0$1 = capitalize;

const isNull = (value) => {
    if (value === undefined ||
        value === '' ||
        value === null ||
        (typeof value === 'object' && Object.entries(value).length === 0)) {
        return true;
    }
    return false;
};
const ɵ0$2 = isNull;

const clone = (object) => {
    return JSON.parse(JSON.stringify(object));
};
const ɵ0$3 = clone;

// tslint:disable-next-line: no-conflicting-lifecycle
// tslint:disable-next-line: directive-class-suffix
class DataInputBase {
    constructor(differs, ngZone) {
        this.differs = differs;
        this.ngZone = ngZone;
        this.type = 'text';
        this.size = 'default';
        this.focusEvent = new EventEmitter();
        this.focusoutEvent = new EventEmitter();
        this.blurEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
        this.inputEvent = new EventEmitter();
        this.keydownEvent = new EventEmitter();
        this.keypressEvent = new EventEmitter();
        this.keyupEvent = new EventEmitter();
        this.clickEvent = new EventEmitter();
        this.dblclickEvent = new EventEmitter();
        this.mousedownEvent = new EventEmitter();
        this.mousemoveEvent = new EventEmitter();
        this.mouseoutEvent = new EventEmitter();
        this.mouseoverEvent = new EventEmitter();
        this.mouseupEvent = new EventEmitter();
        this.mousewheelEvent = new EventEmitter();
        this.wheelEvent = new EventEmitter();
        this.value = null;
        this.isReactiveForm = true;
        this.highlightOnValid = false;
        this.touched = false;
    }
    ngOnInit() {
        this.alwaysSetConfigsOnInit();
        this.setConfigsOnInit();
    }
    ngOnChanges(changes) {
        for (const propName in changes) {
            this.alwaysDetectPropertiesChanges(propName);
            this.detectPropertiesChanges(propName);
        }
    }
    // ----------------------------------------------------------------
    // ------- Component configs on init and changes detection  -------
    // ------------------ for computed attributes ---------------------
    // ----------------------------------------------------------------
    alwaysSetConfigsOnInit() {
        this.setComponentUniqueId();
    }
    setConfigsOnInit() { }
    alwaysDetectPropertiesChanges(propName) {
        if (propName === 'size')
            this.getInputSize();
        if (propName === 'disabled')
            this.computeDisabledProperty();
        if (propName === 'readonly')
            this.computeReadonlyProperty();
    }
    detectPropertiesChanges(propName) { }
    setComponentUniqueId() {
        if (this.id === undefined)
            this.id = v4();
    }
    getInputSize() {
        switch (this.size) {
            case 'default':
                this.inputSize = '';
                break;
            case 'large':
                this.inputSize = 'input-group-lg';
                break;
            case 'small':
                this.inputSize = 'input-group-sm';
                break;
            default:
                this.inputSize = '';
                break;
        }
    }
    computeDisabledProperty() {
        switch (this.disabled) {
            case true:
                this.disabled = true;
                break;
            case false:
                this.disabled = undefined;
                break;
            default:
                this.disabled = undefined;
                break;
        }
    }
    computeReadonlyProperty() {
        switch (this.readonly) {
            case true:
                this.readonly = true;
                break;
            case false:
                this.readonly = undefined;
                break;
            default:
                this.readonly = undefined;
                break;
        }
    }
    // --------------------------------------
    // ------- Component forms events -------
    // --------------------------------------
    focus(event) {
        event = this.bindFocusEvents(event);
        this.focusEvent.emit(event);
    }
    bindFocusEvents(event) {
        return event;
    }
    focusout(event) {
        event = this.bindFocusoutEvents(event);
        this.focusoutEvent.emit(event);
    }
    bindFocusoutEvents(event) {
        return event;
    }
    blur(event) {
        event = this.bindBlurEvents(event);
        this.blurEvent.emit(event);
    }
    bindBlurEvents(event) {
        return event;
    }
    change(event) {
        event = this.bindChangeEvents(event);
        this.changeEvent.emit(event);
    }
    bindChangeEvents(event) {
        return event;
    }
    input(event) {
        event = this.bindInputEvents(event);
        this.inputEvent.emit(event);
    }
    bindInputEvents(event) {
        return event;
    }
    // --------------------------------------
    // ----- Component keyboard events ------
    // --------------------------------------
    keyup(event) {
        event = this.bindKeyupEvents(event);
        this.keyupEvent.emit(event);
    }
    bindKeyupEvents(event) {
        return event;
    }
    keydown(event) {
        event = this.bindKeydownEvents(event);
        this.keydownEvent.emit(event);
    }
    bindKeydownEvents(event) {
        return event;
    }
    keypress(event) {
        event = this.bindKeypressEvents(event);
        this.keypressEvent.emit(event);
    }
    bindKeypressEvents(event) {
        return event;
    }
    // --------------------------------------
    // ----- Component mouse events ------
    // --------------------------------------
    click(event) {
        event = this.bindClickEvents(event);
        this.clickEvent.emit(event);
    }
    bindClickEvents(event) {
        return event;
    }
    dblclick(event) {
        event = this.bindDblclickEvents(event);
        this.dblclickEvent.emit(event);
    }
    bindDblclickEvents(event) {
        return event;
    }
    mousedown(event) {
        event = this.bindMousedownEvents(event);
        this.mousedownEvent.emit(event);
    }
    bindMousedownEvents(event) {
        return event;
    }
    mousemove(event) {
        event = this.bindMousemoveEvents(event);
        this.mousemoveEvent.emit(event);
    }
    bindMousemoveEvents(event) {
        return event;
    }
    mouseout(event) {
        event = this.bindMouseoutEvents(event);
        this.mouseoutEvent.emit(event);
    }
    bindMouseoutEvents(event) {
        return event;
    }
    mouseover(event) {
        event = this.bindMouseoverEvents(event);
        this.mouseoverEvent.emit(event);
    }
    bindMouseoverEvents(event) {
        return event;
    }
    mouseup(event) {
        event = this.bindMouseupEvents(event);
        this.mouseupEvent.emit(event);
    }
    bindMouseupEvents(event) {
        return event;
    }
    mousewheel(event) {
        event = this.bindMousewheelEvents(event);
        this.mousewheelEvent.emit(event);
    }
    bindMousewheelEvents(event) {
        return event;
    }
    wheel(event) {
        event = this.bindWheelEvents(event);
        this.wheelEvent.emit(event);
    }
    bindWheelEvents(event) {
        return event;
    }
    // --------------------------------------
    // ----- Component data methods ---------
    // --------------------------------------
    fillModel(value) {
        if (this.model !== undefined) {
            if (!(this.model instanceof BaseModel)) {
                console.error('Model is not instance of BaseModel from @webblocksapp/class-validator');
                return;
            }
            if (this.name === undefined) {
                console.error('Your input component must contain a name attribute');
                return;
            }
            this.model.setValue(this.name, value);
            this.value = this.model.getValue(this.name);
        }
    }
    validateField() {
        if (this.isReactiveForm === false)
            return;
        if (this.isReactiveForm === true) {
            this.model
                .validateField(this.name)
                .then(() => {
                this.error = '';
                this.setTouched();
                this.bindEventsAfterValidateField();
            })
                .catch((error) => {
                this.setError(error);
                this.bindEventsAfterValidateField();
            });
        }
    }
    setTouched() {
        this.touched = true;
        const map = this.model.getPropertyMap(this.name);
        map.touched = true;
    }
    bindEventsAfterValidateField() { }
    setError(error) {
        const { constraints } = error[0];
        this.error = Object.values(constraints)[0] || '';
        this.error = capitalize(this.error);
    }
    refresh() { }
    watchModel() {
        if (this.model !== undefined && this.name !== undefined) {
            if (this.modelDiffer === undefined) {
                this.modelDiffer = this.differs.find(this.model).create();
            }
            let value = this.model.getValue(this.name);
            if (typeof value !== 'object') {
                value = [value];
            }
            const changes = this.modelDiffer.diff(value);
            if (changes) {
                this.bindWatchModelEvents();
            }
        }
    }
    bindWatchModelEvents() { }
}
DataInputBase.decorators = [
    { type: Directive }
];
DataInputBase.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: NgZone }
];
DataInputBase.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['id',] }],
    label: [{ type: Input }],
    name: [{ type: Input }],
    type: [{ type: Input }],
    size: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    help: [{ type: Input }],
    startSlot: [{ type: Input }],
    startSlotHtml: [{ type: Input }],
    endSlot: [{ type: Input }],
    endSlotHtml: [{ type: Input }],
    autocomplete: [{ type: Input }],
    focusEvent: [{ type: Output }],
    focusoutEvent: [{ type: Output }],
    blurEvent: [{ type: Output }],
    changeEvent: [{ type: Output }],
    inputEvent: [{ type: Output }],
    keydownEvent: [{ type: Output }],
    keypressEvent: [{ type: Output }],
    keyupEvent: [{ type: Output }],
    clickEvent: [{ type: Output }],
    dblclickEvent: [{ type: Output }],
    mousedownEvent: [{ type: Output }],
    mousemoveEvent: [{ type: Output }],
    mouseoutEvent: [{ type: Output }],
    mouseoverEvent: [{ type: Output }],
    mouseupEvent: [{ type: Output }],
    mousewheelEvent: [{ type: Output }],
    wheelEvent: [{ type: Output }]
};

class BsInputComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'form-group';
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.value = this.model.getValue(this.name);
    }
    bindFocusoutEvents(event) {
        this.validateField();
        return event;
    }
    bindKeyupEvents(event) {
        const value = event.target.value;
        this.fillModel(value);
        return event;
    }
}
BsInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-input',
                template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>
      <input
        [attr.autocomplete]="autocomplete ? 'on' : 'off'"
        [attr.name]="name"
        [value]="value"
        [type]="type"
        [attr.placeholder]="placeholder"
        [attr.disabled]="disabled"
        class="form-control"
        [ngClass]="{
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error
        }"
        id="{{ id }}-bs"
        (focusout)="focusout($event)"
        (focus)="focus($event)"
        (change)="change($event)"
        (input)="input($event)"
        (keyup)="keyup($event)"
        (keydown)="keydown($event)"
        (keypress)="keypress($event)"
        (click)="click($event)"
        (dblclick)="dblclick($event)"
        (mousedown)="mousedown($event)"
        (mousemove)="mousemove($event)"
        (mouseout)="mouseout($event)"
        (mouseover)="mouseover($event)"
        (mouseup)="mouseup($event)"
        (wheel)="wheel($event)"
      />

      <div *ngIf="endSlot" class="input-group-append">
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div *ngIf="endSlotHtml" class="input-group-append">
        <span class="input-group-text" [innerHTML]="endSlotHtml"></span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
                styles: [`
      :host {
        display: block;
      }
    `]
            },] }
];
BsInputComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }]
};

class BsInputModule {
}
BsInputModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsInputComponent],
                imports: [CommonModule],
                declarations: [BsInputComponent],
            },] }
];

class DataGroupComponent {
    constructor() {
        this.class = 'd-block';
        this.dataInputComponents = [];
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this.loadDataInputComponents();
    }
    loadDataInputComponents() {
        this.dataInputs.forEach((dataInput) => {
            this.dataInputComponents.push(dataInput);
        });
    }
    getDataInputComponents() {
        return this.dataInputComponents;
    }
}
DataGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'data-group',
                template: `<ng-content></ng-content>`
            },] }
];
DataGroupComponent.ctorParameters = () => [];
DataGroupComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    dataInputs: [{ type: ContentChildren, args: ['dataInput', { descendants: true },] }]
};

class BaseModelArray {
    constructor(DtoClass) {
        this.array = [];
        this.change = new BehaviorSubject(false);
        this.dtoClass = DtoClass;
        this.array = [new BaseModel(this.dtoClass)];
    }
    fill(data) {
        const array = [];
        data.forEach((item) => {
            const model = new BaseModel(this.dtoClass);
            model.fill(item);
            array.push(model);
        });
        this.array = array;
        this.emitChange();
    }
    get() {
        return this.array;
    }
    find(index) {
        return this.array[index];
    }
    add(data = null) {
        const model = new BaseModel(this.dtoClass);
        if (data) {
            model.fill(data);
        }
        this.array.push(model);
        this.emitChange();
    }
    delete(index) {
        this.array = this.array.filter((item) => this.array.indexOf(item) !== index);
        this.emitChange();
    }
    count() {
        return this.array.length;
    }
    emitChange() {
        const currentValue = this.change.getValue();
        this.change.next(!currentValue);
    }
    getChange() {
        return this.change;
    }
}

class DataGroupsComponent {
    constructor() {
        this.class = 'd-block';
        this.multiple = false;
        this.highlightOnValid = false;
        this.autocomplete = false;
        this.submitEvent = new EventEmitter();
        this.modelResetSubscriptions$ = [];
        this.firstMount = false;
    }
    ngOnInit() {
        this.initBaseModel();
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.initModelMap();
            this.listenDataGroupsListChanges();
            this.listenDataInputsListChanges();
        });
    }
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (propName === 'model' && this.firstMount === true) {
                this.initBaseModel();
                this.initModelMap();
            }
            if (propName === 'highlightOnValid') {
                if (Array.isArray(this.model) &&
                    this.dataGroupComponents !== undefined) {
                    this.initModelMap();
                }
            }
        }
    }
    addModelResetSubscription(subscription) {
        this.modelResetSubscriptions$.push(subscription);
    }
    unsubscribeAllModelResetSubscriptions() {
        this.modelResetSubscriptions$.forEach((subscription, i) => {
            subscription.unsubscribe();
        });
        this.modelResetSubscriptions$ = [];
    }
    initBaseModel() {
        if (Array.isArray(this.model)) {
            this._model = this.model;
        }
        if (this.model instanceof BaseModelArray) {
            this._model = this.model.get();
            this.subscribeToBaseModelArrayChanges();
        }
        if (this.model instanceof BaseModel) {
            this._model = [this.model];
        }
        this.firstMount = true;
    }
    subscribeToBaseModelArrayChanges() {
        const subscription = this.model.getChange();
        subscription.subscribe(() => {
            if (this.firstMount === true) {
                this.modelResetSubscriptions$ = [];
                this.refreshBaseModelArray();
            }
        });
    }
    refreshBaseModelArray() {
        this._model = this.model.get();
        setTimeout(() => {
            this.initModelMap();
        });
    }
    unsubscribeToBaseModelArrayChanges() {
        if (this.model.getChange === 'function') {
            const subscription = this.model.getChange();
            subscription.unsubscribe();
        }
    }
    initModelMap() {
        this.generateModelMap();
        this.applyToAllModelMap();
        this.applyToAllModelPropertiesMap();
    }
    generateModelMap() {
        this.modelMap = [];
        this._model.forEach((model, index) => {
            this.modelMap.push({ model, dataInputComponents: [] });
            const dataGroupComponent = this.dataGroupComponents.toArray()[index];
            const dataInputComponents = dataGroupComponent.getDataInputComponents();
            dataInputComponents.forEach((dataInputComponent, i) => {
                this.modelMap[index].dataInputComponents[i] = {
                    component: dataInputComponent,
                    name: dataInputComponent.name,
                };
            });
        });
    }
    applyToAllModelMap() {
        this.modelMap.forEach((map) => {
            this.applyModelMap(map);
            this.subscribeToModelReset(map);
        });
    }
    applyModelMap(map) {
        map.dataInputComponents.forEach((dataInputComponent) => {
            const { name } = dataInputComponent.component;
            const errors = this.formatErrors(map.model.getErrors());
            dataInputComponent.component.model = map.model;
            dataInputComponent.component.highlightOnValid = this.highlightOnValid;
            if (dataInputComponent.component.autocomplete === undefined) {
                dataInputComponent.component.autocomplete = this.autocomplete;
            }
            dataInputComponent.component.fillModel(map.model.getValue(name));
            dataInputComponent.component.refresh();
            this.setDataInputComponentError(dataInputComponent, errors);
        });
    }
    subscribeToModelReset(map) {
        const subscription = map.model.getResetTimes();
        this.addModelResetSubscription(subscription);
        subscription.subscribe(() => {
            this.applyModelMap(map);
            this.applyModelPropertiesMap(map);
        });
    }
    applyToAllModelPropertiesMap() {
        this.modelMap.forEach((map) => {
            this.applyModelPropertiesMap(map);
        });
    }
    applyModelPropertiesMap(map) {
        map.model.initMap();
        map.dataInputComponents.forEach((dataInputComponent) => {
            const { name } = dataInputComponent.component;
            const propertyMap = map.model.getPropertyMap(name);
            dataInputComponent.component.touched = propertyMap.touched;
        });
    }
    listenDataGroupsListChanges() {
        if (Array.isArray(this.model)) {
            this.dataGroupComponents.changes.subscribe(() => {
                setTimeout(() => {
                    this.initModelMap();
                });
            });
        }
    }
    listenDataInputsListChanges() {
        if (Array.isArray(this.model)) {
            this.dataGroupComponents.forEach((dataGroupComponent) => {
                dataGroupComponent.dataInputs.changes.subscribe(() => {
                    dataGroupComponent.loadDataInputComponents();
                    setTimeout(() => {
                        this.initModelMap();
                    });
                });
            });
        }
    }
    submitData() {
        const promises = [];
        const groups = this.group !== undefined ? { groups: [this.group] } : {};
        this.modelMap.forEach((map) => {
            map.model.setSubmitted(true);
            promises.push(new Promise((resolve) => {
                map.model
                    .validate(groups)
                    .then((validationResult) => {
                    const { isValid, errors } = validationResult;
                    if (isValid) {
                        resolve(validationResult);
                    }
                    else {
                        const formattedErrors = this.formatErrors(errors);
                        const formattedValidationResult = {
                            isValid,
                            errors: formattedErrors,
                        };
                        resolve(formattedValidationResult);
                    }
                });
            }));
        });
        this.submitEvent.emit(new Promise((resolve) => {
            const currentPromise = promises.length > 1 ? Promise.all(promises) : promises[0];
            currentPromise.then((validationResult) => {
                this.manageErrors(validationResult);
                if (this.enctype === 'multipart/form-data') {
                    if (!Array.isArray(validationResult)) {
                        validationResult.validatedData = this.generateFormData(validationResult.validatedData);
                    }
                    else {
                        validationResult.forEach((item) => {
                            item.validatedData = this.generateFormData(item.validatedData);
                        });
                    }
                }
                validationResult = this.parseValidationResult(validationResult);
                resolve(validationResult);
            });
        }));
    }
    parseValidationResult(validationResult) {
        if (this.multiple === true && !Array.isArray(validationResult)) {
            validationResult = [validationResult];
        }
        if (Array.isArray(validationResult)) {
            validationResult = this.groupMultipleValidationResult(validationResult);
        }
        return validationResult;
    }
    groupMultipleValidationResult(validationResult) {
        const groupedMultipleValidationResults = {
            isValid: true,
        };
        validationResult.forEach((validationResultItem) => {
            if (groupedMultipleValidationResults.isValid) {
                groupedMultipleValidationResults.isValid = validationResultItem.isValid;
            }
            if (validationResultItem.validatedData !== undefined) {
                if (groupedMultipleValidationResults.validatedData === undefined) {
                    groupedMultipleValidationResults.validatedData = [];
                }
                groupedMultipleValidationResults.validatedData.push(validationResultItem.validatedData);
            }
            if (validationResultItem.errors !== undefined) {
                if (groupedMultipleValidationResults.errors === undefined) {
                    groupedMultipleValidationResults.errors = [];
                }
                groupedMultipleValidationResults.errors.push(validationResultItem.errors);
            }
        });
        return groupedMultipleValidationResults;
    }
    generateFormData(validatedData) {
        const formData = new FormData();
        if (!isNull(validatedData)) {
            const keys = Object.keys(validatedData);
            keys.forEach((key) => {
                formData.append(key, validatedData[key]);
            });
        }
        return formData;
    }
    formatErrors(errors) {
        const formattedErrors = [];
        errors.forEach((error, index) => {
            const errorData = {
                property: error.property,
                message: Object.values(error.constraints)[0],
            };
            formattedErrors[index] = errorData;
        });
        return formattedErrors;
    }
    manageErrors(validationResults) {
        validationResults = !Array.isArray(validationResults)
            ? [validationResults]
            : validationResults;
        this.modelMap.forEach((map, index) => {
            const { dataInputComponents } = map;
            const { isValid, errors } = validationResults[index];
            if (isValid) {
                dataInputComponents.forEach((dataInputComponent) => {
                    dataInputComponent.component.error = null;
                    dataInputComponent.component.touched = true;
                });
            }
            else {
                dataInputComponents.forEach((dataInputComponent) => {
                    this.setDataInputComponentError(dataInputComponent, errors);
                    dataInputComponent.component.touched = true;
                });
            }
        });
    }
    setDataInputComponentError(dataInputComponent, errors) {
        const { name } = dataInputComponent;
        const filteredError = errors.filter((error) => error.property === name);
        const errorMessage = filteredError.length ? filteredError[0].message : null;
        dataInputComponent.component.error = capitalize(errorMessage);
        dataInputComponent.component.refresh();
    }
    unsubscribeAll() {
        this.unsubscribeAllModelResetSubscriptions();
        this.unsubscribeToBaseModelArrayChanges();
    }
    ngOnDestroy() {
        this.unsubscribeAll();
    }
}
DataGroupsComponent.decorators = [
    { type: Component, args: [{
                selector: 'data-groups',
                template: `
    <form (ngSubmit)="submitData()">
      <ng-content></ng-content>
    </form>
  `,
                styles: [`
      form {
        position: relative;
      }
    `]
            },] }
];
DataGroupsComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    model: [{ type: Input }],
    group: [{ type: Input }],
    enctype: [{ type: Input }],
    multiple: [{ type: Input }],
    highlightOnValid: [{ type: Input }],
    autocomplete: [{ type: Input }],
    submitEvent: [{ type: Output }],
    dataGroupComponents: [{ type: ContentChildren, args: [DataGroupComponent,] }]
};

class DataGroupsModule {
}
DataGroupsModule.decorators = [
    { type: NgModule, args: [{
                exports: [DataGroupsComponent, DataGroupComponent],
                imports: [CommonModule, FormsModule],
                declarations: [DataGroupsComponent, DataGroupComponent],
            },] }
];

class BsSelect2Component extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'ng-select2 form-group';
        this.configs = {};
        this.allowClear = true;
        this.closeOnSelect = true;
        this.debug = false;
        this.dir = 'ltr';
        this.dropdownAutoWidth = false;
        this.language = 'en';
        this.maximumInputLength = 0;
        this.maximumSelectionLength = 0;
        this.minimumInputLength = 0;
        this.minimumResultsForSearch = 0;
        this.multiple = false;
        this.selectOnClose = false;
        this.tags = false;
        this.width = 'resolve';
        this.scrollAfterSelect = false;
        this.selectEvent = new EventEmitter();
        this.clearEvent = new EventEmitter();
        this.closeEvent = new EventEmitter();
        this.validate = false;
        this.select2Configs = {};
        this.watchedProperties = [
            'theme',
            'liveSearch',
            'options',
            'configs',
            'configs',
            'noResults',
            'allowClear',
            'closeOnSelect',
            'data',
            'debug',
            'dir',
            'dropdownAutoWidth',
            'dropdownCssClass',
            'language',
            'maximumInputLength',
            'maximumSelectionLength',
            'minimumInputLength',
            'minimumResultsForSearch',
            'multiple',
            'placeholder',
            'selectionCssClass',
            'selectOnClose',
            'tags',
            'width',
            'scrollAfterSelect',
        ];
    }
    ngAfterViewInit() {
        this.initJQueryEl();
        this.initSelect2();
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initSelectedOptions();
    }
    detectPropertiesChanges(propName) {
        if (propName === 'disabled')
            this.enableOrDisableSelect2();
        if (this.watchedProperties.indexOf(propName) > -1)
            this.refreshSelect2();
    }
    initJQueryEl() {
        this.select2 = $(this.select2ElementRef.nativeElement);
    }
    initSelect2() {
        this.buildSelect2Configs();
        this.select2.select2(this.select2Configs);
        this.bindEventsToSelect2();
        this.enableOrDisableSelect2();
        this.disableSelect2WhenOptionsAreEmpty();
    }
    bindEventsToSelect2() {
        this.select2.on('change', (event) => {
            const value = this.select2.select2('val');
            this.fillModel(value);
            if (this.validate === true) {
                this.validateField();
            }
            else {
                this.validate = true;
            }
            this.change(event);
        });
        this.select2.on('select2:select', (event) => {
            this.selectEvent.emit(event.params.data);
        });
        this.select2.on('select2:clear', (event) => {
            this.fillModel(null);
            this.validateField();
            this.clearEvent.emit(event.params.data);
        });
        this.select2.on('select2:close', (event) => {
            /**
             * Equivalent to a validate on focusout
             */
            setTimeout(() => {
                if (isNull(this.model.getValue(this.name))) {
                    this.validateField();
                    this.closeEvent.emit(event.params.data);
                }
            });
        });
    }
    bindEventsAfterValidateField() {
        this.addOrRemoveValidationClasses();
    }
    buildSelect2Configs() {
        const defaultConfigs = {
            theme: this.theme,
            allowClear: this.allowClear,
            closeOnSelect: this.closeOnSelect,
            data: this.data,
            debug: this.debug,
            dir: this.dir,
            dropdownAutoWidth: this.dropdownAutoWidth,
            dropdownCssClass: this.dropdownCssClass,
            language: this.language,
            maximumInputLength: this.maximumInputLength,
            maximumSelectionLength: this.maximumSelectionLength,
            minimumInputLength: this.minimumInputLength,
            minimumResultsForSearch: this.getMinimumResultsForSearch(),
            multiple: this.multiple,
            placeholder: this.placeholder,
            selectionCssClass: this.selectionCssClass,
            selectOnClose: this.selectOnClose,
            tags: this.tags,
            width: this.width,
            scrollAfterSelect: this.scrollAfterSelect,
        };
        this.select2Configs = Object.assign(defaultConfigs, this.configs);
        this.setSelect2ConfigsOverrides();
    }
    getMinimumResultsForSearch() {
        if (this.liveSearch === false) {
            return -1;
        }
        if (this.liveSearch === true) {
            return 0;
        }
        return this.minimumResultsForSearch;
    }
    setSelect2ConfigsOverrides() {
        /**
         * Overrides
         *
         * - allowClear is not used in multiple select
         */
        if (this.multiple) {
            this.select2Configs = Object.assign(this.select2Configs, {
                allowClear: false,
            });
        }
        this.select2Configs = Object.assign(this.select2Configs, this.configs);
    }
    addOrRemoveValidationClasses() {
        setTimeout(() => {
            /**
             * For a custom bootstrap theme, make the border-color property important inside this
             * style line of css classes on your bootstrap custom main theme stylesheet,
             * to show the invalid border color on select2 component
             *
             * .was-validated .custom-select:invalid, .custom-select.is-invalid {
             *   border-color: #your-color !important;
             * }
             */
            const select2Selection = $(this.select2.data('select2').$container).find('.select2-selection');
            if (this.error) {
                select2Selection.addClass('custom-select');
                select2Selection.addClass('is-invalid');
            }
            else {
                select2Selection.removeClass('custom-select');
                select2Selection.removeClass('is-invalid');
                if (this.highlightOnValid && this.touched) {
                    select2Selection.addClass('form-control');
                    select2Selection.addClass('is-valid');
                }
                if (!this.highlightOnValid || !this.touched) {
                    select2Selection.removeClass('form-control');
                    select2Selection.removeClass('is-valid');
                }
            }
        });
    }
    initSelectedOptions() {
        const selectedOptions = this.model.getValue(this.name);
        this.validate = false;
        this.select2.val(selectedOptions).trigger('change');
    }
    disableSelect2WhenOptionsAreEmpty() {
        if (this.select2 !== undefined && isNull(this.options)) {
            this.select2.select2('enable', false);
        }
    }
    enableOrDisableSelect2() {
        setTimeout(() => {
            if (this.select2 !== undefined) {
                if (this.disabled === undefined)
                    this.disabled = false;
                this.select2.select2('enable', [!this.disabled]);
            }
        });
    }
    refreshSelect2() {
        if (this.select2 !== undefined) {
            setTimeout(() => {
                this.addFormControlClass();
                this.addFormControlClassDelayed();
                this.disableSelect2WhenOptionsAreEmpty();
                this.addOrRemoveValidationClasses();
                this.buildSelect2Configs();
                this.select2.select2(this.select2Configs);
            });
        }
    }
    addFormControlClass() {
        const select2Container = $(this.select2.data('select2').$container);
        select2Container.addClass('form-control');
    }
    addFormControlClassDelayed() {
        setTimeout(() => {
            const select2Container = $(this.select2.data('select2').$container);
            select2Container.addClass('form-control');
        });
    }
    refresh() {
        this.addFormControlClass();
        this.addOrRemoveValidationClasses();
        this.initSelectedOptions();
    }
}
BsSelect2Component.decorators = [
    { type: Component, args: [{
                selector: 'bs-select2',
                template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>

      <select
        #select2ElementRef
        style="width: 100%"
        [attr.name]="name"
        class="form-control select2"
        [ngClass]="{
          'has-prepend': startSlot || startSlotHtml,
          'has-append': endSlot || endSlotHtml,
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error
        }"
        id="{{ id }}-bs"
      >
        <option *ngIf="placeholder && !multiple"></option>
        <ng-container *ngFor="let option of options">
          <option
            *ngIf="option.group === undefined"
            [attr.disabled]="option.disabled"
            [attr.selected]="option.selected"
            [value]="option.value"
          >
            {{ option.viewValue }}
          </option>

          <optgroup *ngIf="option.group !== undefined" [label]="option.group">
            <option
              *ngFor="let option of option.groupValues"
              [attr.disabled]="option.disabled"
              [attr.selected]="option.selected"
              [value]="option.value"
            >
              {{ option.viewValue }}
            </option>
          </optgroup>
        </ng-container>
      </select>

      <div *ngIf="endSlot" class="input-group-append">
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div *ngIf="endSlotHtml" class="input-group-append">
        <span class="input-group-text" [innerHTML]="endSlotHtml"></span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".ng-select2.form-group{display:block}.ng-select2 .select2-container--bootstrap .select2-selection{border:1px solid #ced4da;border-bottom-right-radius:4px!important;border-top-right-radius:4px!important;box-shadow:inset 0 0 0 transparent;font-size:16px;height:38px;line-height:1.6}.ng-select2 .select2-container--default .select2-selection.form-control,.ng-select2 .select2-selection.custom-select{padding:0}.ng-select2 .select2-selection.custom-select.is-invalid{background-image:none}.ng-select2 .select2-container--default .select2-selection--single.is-valid .select2-selection__clear{margin-right:20px}.ng-select2 .select2-container--default .select2-selection--single.is-valid{background-position:right calc(.3675em + 1.25rem) center}.ng-select2 .select2-container--bootstrap .select2-selection.custom-select.is-invalid{border-color:#dc3545!important}.ng-select2 .select2-container--bootstrap .select2-selection--single.is-valid{background-position:right calc(.3675em + 1.05rem) center;border-color:#28a745!important}.ng-select2 .select2-container--bootstrap .select2-selection--multiple.is-invalid .select2-search__field{height:inherit;padding:inherit}.ng-select2 .select2-container--bootstrap .select2-selection.custom-select{padding:6px 24px 6px 12px}.ng-select2 .input-group{flex-wrap:nowrap}.ng-select2 .select2-container>.selection{height:inherit}.ng-select2 .select2-container>.selection>.select2-selection{align-items:center;display:flex;font-size:inherit!important;height:inherit;left:-1px;position:absolute;top:-1px;width:calc(100% + 2px)}.ng-select2 .has-prepend+.select2-container>.selection>.select2-selection{border-bottom-left-radius:0;border-top-left-radius:0}.ng-select2 .has-append+.select2-container>.selection>.select2-selection{border-bottom-right-radius:0;border-top-right-radius:0}.ng-select2 .select2-container>.selection>.select2-selection>.select2-selection__rendered{border-bottom:1px solid transparent;width:100%}.ng-select2 .select2-search__field{width:100%!important}"]
            },] }
];
BsSelect2Component.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    select2ElementRef: [{ type: ViewChild, args: ['select2ElementRef', { read: ElementRef },] }],
    theme: [{ type: Input }],
    liveSearch: [{ type: Input }],
    options: [{ type: Input }],
    configs: [{ type: Input }],
    noResults: [{ type: Input }],
    allowClear: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    data: [{ type: Input }],
    debug: [{ type: Input }],
    dir: [{ type: Input }],
    dropdownAutoWidth: [{ type: Input }],
    dropdownCssClass: [{ type: Input }],
    language: [{ type: Input }],
    maximumInputLength: [{ type: Input }],
    maximumSelectionLength: [{ type: Input }],
    minimumInputLength: [{ type: Input }],
    minimumResultsForSearch: [{ type: Input }],
    multiple: [{ type: Input }],
    placeholder: [{ type: Input }],
    selectionCssClass: [{ type: Input }],
    selectOnClose: [{ type: Input }],
    tags: [{ type: Input }],
    width: [{ type: Input }],
    scrollAfterSelect: [{ type: Input }],
    selectEvent: [{ type: Output }],
    clearEvent: [{ type: Output }],
    closeEvent: [{ type: Output }]
};

class BsSelect2Module {
}
BsSelect2Module.decorators = [
    { type: NgModule, args: [{
                exports: [BsSelect2Component],
                imports: [CommonModule],
                declarations: [BsSelect2Component],
            },] }
];

class BsSelectComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'ng-select form-group';
        this.configs = {};
        this.style = '';
        this.styleBase = 'form-control';
        this.placeholder = ' ';
        this.iconBase = 'fontAwesome';
        this.shownEvent = new EventEmitter();
        this.hiddenEvent = new EventEmitter();
        this.onValidated = false;
        this.onShown = false;
        this.selectConfigs = {};
        this.watchedProperties = [
            'configs',
            'style',
            'styleBase',
            'placeholder',
            'iconBase',
            'selectAllText',
            'deselectAllText',
            'liveSearch',
            'multiple',
            'maxOptions',
            'maxOptionsText',
            'selectedTextFormat',
            'showTick',
            'countSelectedText',
            'actionsBox',
            'header',
            'dropupAuto',
        ];
    }
    ngAfterViewInit() {
        this.initJQueryEl();
        this.initSelect();
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initSelectedOptions();
    }
    detectPropertiesChanges(propName) {
        if (propName === 'disabled')
            this.enableOrDisableSelect();
        if (propName === 'options') {
            this.refreshSelect();
            this.disableSelectWhenOptionsAreEmpty();
        }
        if (propName === 'maxOptions') {
            this.refreshSelectedOptions();
        }
        if (propName === 'maxOptionsText') {
            if (isNull(this.maxOptionsText))
                this.maxOptionsText = undefined;
        }
        if (propName === 'countSelectedText') {
            if (isNull(this.countSelectedText))
                this.countSelectedText = undefined;
        }
        if (propName === 'deselectAllText') {
            if (isNull(this.deselectAllText))
                this.deselectAllText = undefined;
        }
        if (propName === 'selectAllText') {
            if (isNull(this.selectAllText))
                this.selectAllText = undefined;
        }
        if (propName === 'header') {
            if (isNull(this.header))
                this.header = undefined;
        }
        if (this.watchedProperties.indexOf(propName) > -1) {
            this.rebuildSelect();
            // Code events that must be placed after rebuildSelect
            if (!isNull(this.maxOptions))
                this.hideSelectAllButton();
        }
    }
    initJQueryEl() {
        this.select = $(this.selectElementRef.nativeElement);
    }
    initSelect() {
        this.buildSelectConfigs();
        this.select.selectpicker(this.selectConfigs);
        this.enableOrDisableSelect();
        this.addAutoCloseClass();
        this.bindEventsToSelect();
    }
    buildSelectConfigs() {
        const defaultConfigs = {
            style: this.style,
            styleBase: this.styleBase,
            title: this.placeholder,
            iconBase: this.iconBase,
            selectAllText: this.selectAllText,
            deselectAllText: this.deselectAllText,
            liveSearch: this.liveSearch,
            multiple: this.multiple,
            maxOptions: this.maxOptions,
            maxOptionsText: this.maxOptionsText,
            selectedTextFormat: this.selectedTextFormat,
            showTick: this.showTick,
            countSelectedText: this.countSelectedText,
            actionsBox: this.actionsBox,
            header: this.header,
            dropupAuto: this.dropupAuto,
        };
        this.selectConfigs = Object.assign(this.selectConfigs, defaultConfigs);
        this.setSelectConfigsOverrides();
    }
    setSelectConfigsOverrides() {
        this.selectConfigs = Object.assign(this.selectConfigs, this.configs);
    }
    disableSelectWhenOptionsAreEmpty() {
        if (this.select !== undefined && isNull(this.options)) {
            this.select.prop('disabled', true);
            this.refreshSelect();
        }
    }
    enableOrDisableSelect() {
        if (this.select !== undefined) {
            setTimeout(() => {
                if (this.disabled === undefined)
                    this.disabled = false;
                this.select.prop('disabled', this.disabled);
                this.refreshSelect();
            });
        }
    }
    bindEventsToSelect() {
        this.select.on('change', this.select, (event) => {
            const value = this.select.val();
            this.onShown = false;
            this.fillModel(value);
            this.validateField();
            this.change(event);
        });
        this.select.parent().on('shown.bs.dropdown', (event) => {
            this.onShown = true;
            if (isNull(this.model.getValue(this.name))) {
                this.validateField();
            }
            this.shownEvent.emit(event);
        });
        this.select.parent().on('hidden.bs.select', (event) => {
            this.onShown = false;
            if (isNull(this.model.getValue(this.name))) {
                this.validateField();
            }
            this.hiddenEvent.emit(event);
            this.setOnValidated();
        });
    }
    bindEventsAfterValidateField() {
        if (this.onShown === false) {
            this.addOrRemoveValidationClasses();
        }
    }
    addAutoCloseClass() {
        this.select.parent().find('.dropdown-menu').addClass('js-auto-close');
    }
    addOrRemoveValidationClasses() {
        const inputGroup = this.select.closest('.input-group');
        const selectButton = this.select.parent().find('button.form-control');
        if (this.error) {
            inputGroup.addClass('is-invalid');
            selectButton.addClass('is-invalid');
        }
        else {
            inputGroup.removeClass('is-invalid');
            selectButton.removeClass('is-invalid');
            if (this.highlightOnValid && this.touched) {
                inputGroup.addClass('is-valid');
                selectButton.addClass('is-valid');
            }
            if (!this.highlightOnValid || !this.touched) {
                inputGroup.removeClass('is-valid');
                selectButton.removeClass('is-valid');
            }
        }
    }
    refreshSelectedOptions() {
        if (this.model !== undefined) {
            const selectedOptions = [];
            const currentSelectedOptions = this.model.getValue(this.name) || [];
            currentSelectedOptions.forEach((value) => {
                if (selectedOptions.length < this.maxOptions) {
                    selectedOptions.push(value);
                }
            });
            this.fillModel(selectedOptions);
        }
    }
    initSelectedOptions() {
        this.select.selectpicker('val', this.model.getValue(this.name));
    }
    hideSelectAllButton() {
        if (this.select !== undefined) {
            setTimeout(() => {
                this.select
                    .parent()
                    .find('.bs-actionsbox > .btn-group > .bs-select-all')
                    .remove();
            });
        }
    }
    refreshSelect() {
        if (this.select !== undefined) {
            setTimeout(() => {
                this.select.selectpicker('refresh');
            });
        }
    }
    rebuildSelect() {
        if (this.select !== undefined) {
            setTimeout(() => {
                this.select.selectpicker('destroy');
                this.initSelect();
                this.addOrRemoveValidationClasses();
                this.initSelectedOptions();
            });
        }
    }
    setOnValidated() {
        this.ngZone.run(() => {
            this.onValidated = true;
        });
    }
    refresh() {
        if (this.model.getSubmitted()) {
            this.setOnValidated();
        }
        this.addOrRemoveValidationClasses();
    }
}
BsSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-select',
                template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>
      <select
        #selectElementRef
        style="width: 100%"
        [attr.multiple]="multiple"
        [attr.name]="name"
        class="form-control selectpicker"
        [ngClass]="{
          disabled: disabled,
          'show-tick': showTick,
          dropup: !dropupAuto
        }"
        id="{{ id }}-bs"
      >
        <ng-container *ngFor="let option of options">
          <option *ngIf="multiple === false" hidden></option>
          <option
            *ngIf="option.group === undefined"
            [attr.disabled]="option.disabled"
            [attr.selected]="option.selected"
            [attr.data-tokens]="option.keyWords"
            [attr.title]="option.title"
            [attr.class]="option.class"
            [attr.data-icon]="option.icon"
            [attr.data-content]="option.content"
            [attr.data-subtext]="option.subtext"
            [ngStyle]="option.style"
            [attr.value]="option.value"
            [attr.data-divider]="option.divider"
          >
            {{ option.viewValue }}
          </option>

          <optgroup
            *ngIf="option.group !== undefined"
            [label]="option.group"
            [attr.data-max-options]="option.maxOptions"
            [attr.data-icon]="option.icon"
          >
            <option
              *ngFor="let option of option.groupValues"
              [attr.disabled]="option.disabled"
              [attr.selected]="option.selected"
              [attr.data-tokens]="option.keyWords"
              [attr.title]="option.title"
              [attr.class]="option.class"
              [attr.data-icon]="option.icon"
              [attr.data-content]="option.content"
              [attr.data-subtext]="option.subtext"
              [ngStyle]="option.style"
              [attr.value]="option.value"
              [attr.data-divider]="option.divider"
            >
              {{ option.viewValue }}
            </option>
          </optgroup>
        </ng-container>
      </select>
      <div *ngIf="endSlot" class="input-group-append">
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div *ngIf="endSlotHtml" class="input-group-append">
        <span class="input-group-text">{{ endSlotHtml }}</span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="onValidated" class="invalid-feedback">
      {{ error }}
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .ng-select.form-group {
        display: block;
      }

      .ng-select .bootstrap-select .dropdown-menu.inner {
        display: initial;
      }

      .ng-select .dropdown-menu .dropdown-menu {
        visibility: initial;
      }

      .ng-select .dropdown-toggle:focus {
        outline: 0 !important;
      }

      .ng-select .input-group-sm > .dropdown > button,
      .ng-select .input-group-lg > .dropdown > button {
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: inherit;
        line-height: initial;
        height: inherit;
      }

      .ng-select .input-group-sm > .dropdown > button > .filter-option,
      .ng-select .input-group-lg > .dropdown > button > .filter-option {
        display: flex;
        align-items: center;
      }
    `]
            },] }
];
BsSelectComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    selectElementRef: [{ type: ViewChild, args: ['selectElementRef', { read: ElementRef },] }],
    options: [{ type: Input }],
    configs: [{ type: Input }],
    style: [{ type: Input }],
    styleBase: [{ type: Input }],
    placeholder: [{ type: Input }],
    iconBase: [{ type: Input }],
    selectAllText: [{ type: Input }],
    deselectAllText: [{ type: Input }],
    liveSearch: [{ type: Input }],
    multiple: [{ type: Input }],
    maxOptions: [{ type: Input }],
    maxOptionsText: [{ type: Input }],
    selectedTextFormat: [{ type: Input }],
    showTick: [{ type: Input }],
    countSelectedText: [{ type: Input }],
    actionsBox: [{ type: Input }],
    header: [{ type: Input }],
    dropupAuto: [{ type: Input }],
    shownEvent: [{ type: Output }],
    hiddenEvent: [{ type: Output }]
};

class BsSelectModule {
}
BsSelectModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsSelectComponent],
                imports: [CommonModule],
                declarations: [BsSelectComponent],
            },] }
];

class BsChecksComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.display = 'default';
        this.look = 'check';
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initCheckedOptions();
    }
    detectPropertiesChanges(propName) {
        if (propName === 'disabled')
            this.enableOrDisableCheckboxes();
        if (propName === 'options') {
            this.refreshCheckboxes();
        }
    }
    bindClickEvents(event) {
        this.refreshCheckboxes();
        this.validateField();
        return event;
    }
    getCheckboxesValues() {
        const values = [];
        this.checkboxes.forEach((checkboxElementRef) => {
            const checkbox = checkboxElementRef.nativeElement;
            if (checkbox.checked === true) {
                values.push(checkbox.value);
            }
        });
        return values;
    }
    enableOrDisableCheckboxes() {
        setTimeout(() => {
            if (this.checkboxes !== undefined) {
                this.checkboxes.forEach((checkboxElementRef) => {
                    const checkbox = checkboxElementRef.nativeElement;
                    checkbox.disabled = this.disabled;
                });
            }
        });
    }
    initCheckedOptions() {
        setTimeout(() => {
            this.checkboxes.forEach((checkboxElementRef) => {
                const checkbox = checkboxElementRef.nativeElement;
                const values = this.model.getValue(this.name) || [];
                // tslint:disable-next-line: triple-equals
                const filteredValue = values.filter((value) => value == checkbox.value);
                if (filteredValue.length) {
                    checkbox.checked = true;
                }
                else {
                    checkbox.checked = false;
                }
            });
        });
    }
    refreshCheckboxes() {
        if (this.checkboxes !== undefined) {
            const values = this.getCheckboxesValues();
            this.fillModel(values);
        }
    }
    refresh() {
        this.initCheckedOptions();
    }
}
BsChecksComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-checks',
                template: `
    <label class="form-label" *ngIf="label">{{ label }}</label>
    <div class="form-group">
      <div
        class="custom-control custom-checkbox"
        [ngClass]="{
          'custom-control-inline': display === 'inline',
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error,
          'custom-checkbox-circle': look === 'circle',
          'custom-switch': look === 'switch'
        }"
        *ngFor="let option of options; let i = index"
      >
        <input
          #checkbox
          type="checkbox"
          class="custom-control-input"
          [ngClass]="{
            'is-invalid': error,
            'is-valid': touched && highlightOnValid && !error
          }"
          id="{{ id }}-{{ i }}-bs"
          [value]="option.value"
          [attr.checked]="option.checked"
          [attr.disabled]="option.disabled"
          (click)="click($event)"
          (change)="change($event)"
        />
        <label class="custom-control-label" for="{{ id }}-{{ i }}-bs">
          {{ option.viewValue }}
        </label>
        <ng-container *ngIf="i === options.length - 1 && display === 'default'">
          <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
        </ng-container>
      </div>
      <ng-container *ngIf="display === 'inline'">
        <div *ngIf="error" class="invalid-feedback invalid-feedback-inline">
          {{ error }}
        </div>
      </ng-container>
      <small *ngIf="help" class="form-text text-muted">
        {{ help }}
      </small>
    </div>
  `,
                styles: [`
      :host .custom-checkbox {
        margin-bottom: 0.8rem;
      }

      :host .form-label {
        margin-bottom: 0.7rem;
      }

      :host .invalid-feedback-inline {
        margin-top: -8px;
      }
    `]
            },] }
];
BsChecksComponent.propDecorators = {
    options: [{ type: Input }],
    display: [{ type: Input }],
    look: [{ type: Input }],
    checkboxes: [{ type: ViewChildren, args: ['checkbox',] }]
};

class BsChecksModule {
}
BsChecksModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsChecksComponent],
                imports: [CommonModule],
                declarations: [BsChecksComponent],
            },] }
];

class BsRadiosComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.display = 'default';
        this.look = 'radio';
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initCheckedOption();
    }
    detectPropertiesChanges(propName) {
        if (propName === 'disabled')
            this.enableOrDisableRadios();
        if (propName === 'options') {
            this.refreshRadios();
        }
    }
    bindClickEvents(event) {
        this.refreshRadios();
        this.validateField();
        return event;
    }
    getRadiosValue() {
        let value;
        this.radios.forEach((radioElementRef) => {
            const radio = radioElementRef.nativeElement;
            if (radio.checked === true) {
                value = radio.value;
            }
        });
        return value;
    }
    enableOrDisableRadios() {
        setTimeout(() => {
            if (this.radios !== undefined) {
                this.radios.forEach((radioElementRef) => {
                    const radio = radioElementRef.nativeElement;
                    radio.disabled = this.disabled;
                });
            }
        });
    }
    initCheckedOption() {
        setTimeout(() => {
            this.radios.forEach((radioElementRef) => {
                const radio = radioElementRef.nativeElement;
                const value = this.model.getValue(this.name);
                // tslint:disable-next-line: triple-equals
                if (radio.value == value) {
                    radio.checked = true;
                }
                else {
                    radio.checked = false;
                }
            });
        });
    }
    refreshRadios() {
        if (this.radios !== undefined) {
            const value = this.getRadiosValue();
            this.fillModel(value);
        }
    }
    refresh() {
        this.initCheckedOption();
    }
}
BsRadiosComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-radios',
                template: `
    <label class="form-label" *ngIf="label">{{ label }}</label>
    <div class="form-group">
      <div
        class="custom-control custom-radio"
        [ngClass]="{
          'custom-control-inline': display === 'inline',
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error,
          'custom-radio-rounded': look === 'radio',
          'custom-switch': look === 'switch'
        }"
        *ngFor="let option of options; let i = index"
      >
        <input
          #radio
          type="radio"
          class="custom-control-input"
          [ngClass]="{
            'is-invalid': error,
            'is-valid': touched && highlightOnValid && !error
          }"
          id="{{ id }}-{{ i }}-bs"
          name="{{ name }}-{{ id }}-bs[]"
          [value]="option.value"
          [attr.checked]="option.checked"
          [attr.disabled]="option.disabled"
          (click)="click($event)"
          (change)="change($event)"
        />
        <label class="custom-control-label" for="{{ id }}-{{ i }}-bs">
          {{ option.viewValue }}
        </label>
        <ng-container *ngIf="i === options.length - 1 && display === 'default'">
          <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
        </ng-container>
      </div>
      <ng-container *ngIf="display === 'inline'">
        <div *ngIf="error" class="invalid-feedback invalid-feedback-inline">
          {{ error }}
        </div>
      </ng-container>
      <small *ngIf="help" class="form-text text-muted">
        {{ help }}
      </small>
    </div>
  `,
                styles: [`
      :host .custom-radio {
        margin-bottom: 0.8rem;
      }

      :host .form-label {
        margin-bottom: 0.5rem;
      }

      :host .invalid-feedback-inline {
        margin-top: -8px;
      }
    `]
            },] }
];
BsRadiosComponent.propDecorators = {
    options: [{ type: Input }],
    display: [{ type: Input }],
    look: [{ type: Input }],
    radios: [{ type: ViewChildren, args: ['radio',] }]
};

class BsRadiosModule {
}
BsRadiosModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsRadiosComponent],
                imports: [CommonModule],
                declarations: [BsRadiosComponent],
            },] }
];

class BsFileComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'form-group';
        this.endSlotHtml = '<i class="fa fa-upload" aria-hidden="true"></i>';
        this.clicked = false;
    }
    bindChangeEvents(event) {
        const customFileLabel = this.customFileLabel.nativeElement;
        const value = this.getFileOrFiles();
        this.fillModel(value);
        this.validateField();
        setTimeout(() => {
            if (value === undefined || value.length === 0) {
                customFileLabel.innerText = this.placeholder;
            }
            else {
                const fileNames = this.getFileNames(value);
                customFileLabel.innerText = fileNames;
            }
        });
        return event;
    }
    bindFocusEvents(event) {
        const value = this.getFileOrFiles();
        if (this.clicked === true && value === undefined) {
            setTimeout(() => {
                this.validateField();
                this.clicked = false;
            }, 100);
        }
        return event;
    }
    clickFileInput() {
        this.clicked = true;
        this.fileInput.nativeElement.click();
    }
    getFileOrFiles() {
        const files = this.fileInput.nativeElement.files;
        return this.multiple === true ? files : files[0];
    }
    getFileNames(files) {
        let fileNames = '';
        if (files.length >= 1) {
            const fileItems = Object.values(files);
            fileItems.forEach((file) => {
                fileNames += `${file.name}, `;
            });
        }
        else {
            const file = files;
            fileNames += `${file.name}`;
            return fileNames;
        }
        return fileNames.slice(0, -2);
    }
    onClickHost() {
        this.clicked = true;
    }
}
BsFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-file',
                template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>

      <div class="custom-file">
        <input
          #fileInput
          [attr.name]="name"
          type="file"
          [attr.disabled]="disabled"
          [attr.multiple]="multiple"
          class="custom-file-input"
          [ngClass]="{
            'is-invalid': error,
            'is-valid': touched && highlightOnValid && !error
          }"
          id="{{ id }}-bs"
          (change)="change($event)"
          (focus)="focus($event)"
        />
        <label #customFileLabel class="custom-file-label" for="{{ id }}-bs">
          {{ placeholder }}
        </label>
      </div>

      <div
        *ngIf="endSlot"
        class="input-group-append upload-btn"
        (click)="clickFileInput()"
      >
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div
        *ngIf="endSlotHtml && endSlot === undefined"
        class="input-group-append"
        (click)="clickFileInput()"
      >
        <span
          class="input-group-text upload-btn"
          [innerHTML]="endSlotHtml"
        ></span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
                styles: [`
      :host {
        display: block;
      }

      :host .custom-file-label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      :host .custom-file-label::after {
        content: none !important;
      }

      :host .upload-btn {
        cursor: pointer;
      }
    `]
            },] }
];
BsFileComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    fileInput: [{ type: ViewChild, args: ['fileInput', { read: ElementRef },] }],
    customFileLabel: [{ type: ViewChild, args: ['customFileLabel', { read: ElementRef },] }],
    multiple: [{ type: Input }],
    onClickHost: [{ type: HostListener, args: ['click',] }]
};

class BsFileModule {
}
BsFileModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsFileComponent],
                imports: [CommonModule],
                declarations: [BsFileComponent],
            },] }
];

class BsDatepickerComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'ng-datepicker form-group';
        this.configs = {};
        this.autoclose = true;
        this.calendarWeeks = false;
        this.clearBtn = false;
        this.defaultViewDate = 'day';
        this.disableTouchKeyboard = false;
        this.enableOnReadonly = true;
        this.forceParse = true;
        this.format = 'yyyy-mm-dd';
        this.immediateUpdates = false;
        this.keyboardNavigation = true;
        this.maxViewMode = 'centuries';
        this.minViewMode = 'days';
        this.multidate = false;
        this.multidateSeparator = ', ';
        this.orientation = 'auto';
        this.showOnFocus = true;
        this.startView = 'days';
        this.showWeekDays = true;
        this.todayBtn = false;
        this.todayHighlight = false;
        this.weekStart = 0;
        this.zIndexOffset = 10;
        this.utc = false;
        this.autocomplete = false;
        this.showEvent = new EventEmitter();
        this.hideEvent = new EventEmitter();
        this.clearDateEvent = new EventEmitter();
        this.changeDateEvent = new EventEmitter();
        this.changeMonthEvent = new EventEmitter();
        this.changeYearEvent = new EventEmitter();
        this.changeDecadeEvent = new EventEmitter();
        this.changeCenturyEvent = new EventEmitter();
        this.datepickerConfigs = {};
        this.watchedProperties = [
            'configs',
            'autoclose',
            'calendarWeeks',
            'clearBtn',
            'datesDisabled',
            'daysOfWeekDisabled',
            'daysOfWeekHighlighted',
            'defaultViewDate',
            'disableTouchKeyboard',
            'enableOnReadonly',
            'endDate',
            'forceParse',
            'format',
            'immediateUpdates',
            'keyboardNavigation',
            'maxViewMode',
            'minViewMode',
            'multidate',
            'multidateSeparator',
            'orientation',
            'showOnFocus',
            'startDate',
            'startView',
            'showWeekDays',
            'title',
            'todayBtn',
            'todayHighlight',
            'weekStart',
            'zIndexOffset',
            'utc',
            'autocomplete',
        ];
    }
    setConfigsOnInit() {
        this.hostId = this.id + '-host';
    }
    ngAfterViewInit() {
        this.initJQueryEl();
        this.initDatepicker();
    }
    bindFocusoutEvents(event) {
        const value = this.getValue();
        this.fillModel(value);
        setTimeout(() => {
            if (!isNull(value)) {
                this.validateField();
            }
        }, 100);
        return event;
    }
    detectPropertiesChanges(propName) {
        if (this.datepicker !== undefined) {
            if (this.watchedProperties.indexOf(propName) > -1)
                this.refreshDatepicker();
        }
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initSelectedDate();
    }
    initSelectedDate() {
        this.setValue();
    }
    initJQueryEl() {
        this.datepicker = $(this.inputElementRef.nativeElement);
    }
    initDatepicker() {
        this.buildDatepickerConfigs();
        this.datepicker.datepicker(this.datepickerConfigs);
        this.bindEventsToDatepicker();
    }
    buildDatepickerConfigs() {
        const defaultConfigs = {
            autoclose: this.autoclose,
            container: '#' + this.hostId,
            calendarWeeks: this.calendarWeeks,
            clearBtn: this.clearBtn,
            defaultViewDate: this.defaultViewDate,
            disableTouchKeyboard: this.disableTouchKeyboard,
            datesDisabled: this.datesDisabled,
            daysOfWeekDisabled: this.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.daysOfWeekHighlighted,
            enableOnReadonly: this.enableOnReadonly,
            endDate: this.endDate,
            forceParse: this.forceParse,
            format: this.format,
            immediateUpdates: this.immediateUpdates,
            keyboardNavigation: this.keyboardNavigation,
            maxViewMode: this.maxViewMode,
            minViewMode: this.minViewMode,
            multidate: this.multidate,
            multidateSeparator: this.multidateSeparator,
            orientation: this.orientation,
            showOnFocus: this.showOnFocus,
            startDate: this.startDate,
            startView: this.startView,
            showWeekDays: this.showWeekDays,
            title: this.title,
            todayBtn: this.todayBtn,
            todayHighlight: this.todayHighlight,
            weekStart: this.weekStart,
            zIndexOffset: this.zIndexOffset,
        };
        this.datepickerConfigs = Object.assign(this.datepickerConfigs, defaultConfigs);
        this.setDatepickerConfigsOverrides();
    }
    setDatepickerConfigsOverrides() {
        this.datepickerConfigs = Object.assign(this.datepickerConfigs, this.configs);
    }
    bindEventsToDatepicker() {
        this.datepicker.on('show', (event) => {
            this.showEvent.emit(event);
        });
        this.datepicker.on('hide', (event) => {
            const value = this.getValue();
            if (isNull(value)) {
                this.validateField();
            }
            this.hideEvent.emit(event);
        });
        this.datepicker.on('clearDate', (event) => {
            this.clearDateEvent.emit(event);
        });
        this.datepicker.on('changeDate', (event) => {
            const value = this.getValue();
            this.fillModel(value);
            this.validateField();
            this.changeDateEvent.emit(event);
        });
        this.datepicker.on('changeMonth', (event) => {
            this.changeMonthEvent.emit(event);
        });
        this.datepicker.on('changeYear', (event) => {
            this.changeYearEvent.emit(event);
        });
        this.datepicker.on('changeDecade', (event) => {
            this.changeDecadeEvent.emit(event);
        });
        this.datepicker.on('changeCentury', (event) => {
            this.changeCenturyEvent.emit(event);
        });
        /**
         * Disables autocomplete
         */
        if (this.autocomplete === false) {
            this.datepicker.attr('autocomplete', 'off');
        }
    }
    getValue() {
        if (this.multidate === true) {
            return this.getDates();
        }
        return this.getDate();
    }
    setValue() {
        const value = this.model.getValue(this.name);
        if (value !== undefined) {
            if (this.multidate === true) {
                this.setDates(value);
            }
            this.setDate(value);
        }
    }
    setDate(value) {
        if (this.utc === true) {
            this.datepicker.datepicker('setUTCDate', value);
        }
        this.datepicker.datepicker('setDate', value);
    }
    setDates(value) {
        if (this.utc === true) {
            this.datepicker.datepicker('setUTCDates', value);
        }
        this.datepicker.datepicker('setDates', value);
    }
    getDate() {
        if (this.utc === true) {
            return this.datepicker.datepicker('getUTCDate');
        }
        return this.datepicker.datepicker('getDate');
    }
    getDates() {
        if (this.utc === true) {
            return this.datepicker.datepicker('getUTCDates');
        }
        return this.datepicker.datepicker('getDates');
    }
    refreshDatepicker() {
        this.datepicker.datepicker('destroy');
        this.initDatepicker();
        this.datepicker.datepicker('update', this.value);
    }
    refresh() {
        this.datepicker.datepicker('update', this.value);
    }
}
BsDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-datepicker',
                template: `
    <label class="form-label" *ngIf="label" attr.for="{{ id }}-bs">{{
      label
    }}</label>
    <div
      class="input-group {{ inputSize }}"
      [ngClass]="{
        'is-invalid': error,
        'is-valid': touched && highlightOnValid && !error
      }"
    >
      <div *ngIf="startSlot" class="input-group-prepend">
        <span class="input-group-text">{{ startSlot }}</span>
      </div>
      <div *ngIf="startSlotHtml" class="input-group-prepend">
        <span class="input-group-text" [innerHTML]="startSlotHtml"></span>
      </div>
      <input
        #inputElementRef
        [attr.name]="name"
        [attr.value]="value"
        [attr.placeholder]="placeholder"
        [attr.disabled]="disabled"
        [attr.readonly]="readonly"
        class="form-control"
        [ngClass]="{
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error
        }"
        id="{{ id }}-bs"
        (focusout)="focusout($event)"
      />

      <div *ngIf="endSlot" class="input-group-append">
        <span class="input-group-text">{{ endSlot }}</span>
      </div>
      <div *ngIf="endSlotHtml" class="input-group-append">
        <span class="input-group-text">{{ endSlotHtml }}</span>
      </div>
    </div>
    <small *ngIf="help" class="form-text text-muted">
      {{ help }}
    </small>
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .ng-datepicker {
        position: relative;
      }

      .ng-datepicker.form-group {
        display: block;
      }

      .ng-datepicker .datepicker td {
        padding: 5px;
      }

      .ng-datepicker .datepicker.dropdown-menu {
        font-size: 14px;
      }
    `]
            },] }
];
BsDatepickerComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    hostId: [{ type: HostBinding, args: ['id',] }],
    inputElementRef: [{ type: ViewChild, args: ['inputElementRef', { read: ElementRef },] }],
    configs: [{ type: Input }],
    autoclose: [{ type: Input }],
    calendarWeeks: [{ type: Input }],
    clearBtn: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    daysOfWeekDisabled: [{ type: Input }],
    daysOfWeekHighlighted: [{ type: Input }],
    defaultViewDate: [{ type: Input }],
    disableTouchKeyboard: [{ type: Input }],
    enableOnReadonly: [{ type: Input }],
    endDate: [{ type: Input }],
    forceParse: [{ type: Input }],
    format: [{ type: Input }],
    immediateUpdates: [{ type: Input }],
    keyboardNavigation: [{ type: Input }],
    maxViewMode: [{ type: Input }],
    minViewMode: [{ type: Input }],
    multidate: [{ type: Input }],
    multidateSeparator: [{ type: Input }],
    orientation: [{ type: Input }],
    showOnFocus: [{ type: Input }],
    startDate: [{ type: Input }],
    startView: [{ type: Input }],
    showWeekDays: [{ type: Input }],
    title: [{ type: Input }],
    todayBtn: [{ type: Input }],
    todayHighlight: [{ type: Input }],
    weekStart: [{ type: Input }],
    zIndexOffset: [{ type: Input }],
    utc: [{ type: Input }],
    autocomplete: [{ type: Input }],
    showEvent: [{ type: Output }],
    hideEvent: [{ type: Output }],
    clearDateEvent: [{ type: Output }],
    changeDateEvent: [{ type: Output }],
    changeMonthEvent: [{ type: Output }],
    changeYearEvent: [{ type: Output }],
    changeDecadeEvent: [{ type: Output }],
    changeCenturyEvent: [{ type: Output }]
};

class BsDatepickerModule {
}
BsDatepickerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BsDatepickerComponent],
                imports: [CommonModule],
                declarations: [BsDatepickerComponent],
            },] }
];

class NgFormsModule {
}
NgFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    BsInputModule,
                    BsSelect2Module,
                    BsSelectModule,
                    BsChecksModule,
                    BsRadiosModule,
                    DataGroupsModule,
                    BsFileModule,
                    BsDatepickerModule,
                ],
                exports: [
                    BsInputModule,
                    BsSelect2Module,
                    BsSelectModule,
                    BsChecksModule,
                    BsRadiosModule,
                    DataGroupsModule,
                    BsFileModule,
                    BsDatepickerModule,
                ],
            },] }
];

/*
 * Public API Surface of ng-forms
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BaseModel, BaseModelArray, DataInputBase, NgFormsModule, BsInputModule as ɵa, BsInputComponent as ɵb, BsSelect2Module as ɵc, BsSelect2Component as ɵd, BsSelectModule as ɵe, BsSelectComponent as ɵf, BsChecksModule as ɵg, BsChecksComponent as ɵh, BsRadiosModule as ɵi, BsRadiosComponent as ɵj, DataGroupsModule as ɵk, DataGroupsComponent as ɵl, DataGroupComponent as ɵm, BsFileModule as ɵn, BsFileComponent as ɵo, BsDatepickerModule as ɵp, BsDatepickerComponent as ɵq };
//# sourceMappingURL=ng-forms.js.map
