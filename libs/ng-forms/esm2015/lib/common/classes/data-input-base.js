import { Input, Output, EventEmitter, HostBinding, KeyValueDiffers, Directive, NgZone, } from '@angular/core';
import * as uuid from 'uuid';
import { BaseModel } from '../classes/base-model';
import { capitalize } from '../utils';
// tslint:disable-next-line: no-conflicting-lifecycle
// tslint:disable-next-line: directive-class-suffix
export class DataInputBase {
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
            this.id = uuid.v4();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1pbnB1dC1iYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdG9zIE1hdXJvL0RvY3VtZW50b3MvRGVzYXJyb2xsb3MgV2ViL0FuZ3VsYXIgbGlicy9hbmd1bGFyLWJzLWZvcm0tY29tcG9uZW50cy9wcm9qZWN0cy9uZy1mb3Jtcy9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NsYXNzZXMvZGF0YS1pbnB1dC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFJWixXQUFXLEVBQ1gsZUFBZSxFQUVmLFNBQVMsRUFDVCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdEMscURBQXFEO0FBRXJELG1EQUFtRDtBQUNuRCxNQUFNLE9BQWdCLGFBQWE7SUF1RGpDLFlBQW9CLE9BQXdCLEVBQVMsTUFBYztRQUEvQyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUF6QzFELFNBQUksR0FBYyxNQUFNLENBQUM7UUFDekIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQVczQixlQUFVLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUQsa0JBQWEsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3RCxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsZ0JBQVcsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckQsaUJBQVksR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvRCxrQkFBYSxHQUFnQyxJQUFJLFlBQVksRUFB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QUFDOzs7WUE3WGhDLFNBQVM7OztZQWxCUixlQUFlO1lBR2YsTUFBTTs7O2lCQXlCTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLElBQUk7b0JBR2hCLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7bUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7c0JBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBRUwsTUFBTTs0QkFDTixNQUFNO3dCQUNOLE1BQU07MEJBQ04sTUFBTTt5QkFDTixNQUFNOzJCQUVOLE1BQU07NEJBQ04sTUFBTTt5QkFDTixNQUFNO3lCQUVOLE1BQU07NEJBQ04sTUFBTTs2QkFDTixNQUFNOzZCQUNOLE1BQU07NEJBQ04sTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07OEJBQ04sTUFBTTt5QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdEJpbmRpbmcsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIERpcmVjdGl2ZSxcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgRGF0YUlucHV0QmFzZUludGVyZmFjZSxcbiAgRm9ybUV2ZW50c0ludGVyZmFjZSxcbiAgS2V5Ym9hcmRFdmVudHNJbnRlcmZhY2UsXG4gIE1vdXNlRXZlbnRzSW50ZXJmYWNlLFxufSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9jbGFzc2VzL2Jhc2UtbW9kZWwnO1xuaW1wb3J0IHsgSW5wdXRUeXBlLCBJbnB1dFNpemUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjYXBpdGFsaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbmZsaWN0aW5nLWxpZmVjeWNsZVxuQERpcmVjdGl2ZSgpXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhSW5wdXRCYXNlXG4gIGltcGxlbWVudHNcbiAgICBPbkluaXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIERhdGFJbnB1dEJhc2VJbnRlcmZhY2UsXG4gICAgRm9ybUV2ZW50c0ludGVyZmFjZSxcbiAgICBLZXlib2FyZEV2ZW50c0ludGVyZmFjZSxcbiAgICBNb3VzZUV2ZW50c0ludGVyZmFjZSB7XG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnaWQnKVxuICBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdHlwZTogSW5wdXRUeXBlID0gJ3RleHQnO1xuICBASW5wdXQoKSBzaXplOiBJbnB1dFNpemUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgQElucHV0KCkgaGVscDogc3RyaW5nO1xuICBASW5wdXQoKSBzdGFydFNsb3Q6IHN0cmluZztcbiAgQElucHV0KCkgc3RhcnRTbG90SHRtbDogc3RyaW5nO1xuICBASW5wdXQoKSBlbmRTbG90OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVuZFNsb3RIdG1sOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgZm9jdXNFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZm9jdXNvdXRFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ckV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGlucHV0RXZlbnQ6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIGtleWRvd25FdmVudDogRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkga2V5cHJlc3NFdmVudDogRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkga2V5dXBFdmVudDogRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSBjbGlja0V2ZW50OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkYmxjbGlja0V2ZW50OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtb3VzZWRvd25FdmVudDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbW91c2Vtb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1vdXNlb3V0RXZlbnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1vdXNlb3ZlckV2ZW50OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtb3VzZXVwRXZlbnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1vdXNld2hlZWxFdmVudDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgd2hlZWxFdmVudDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBpbnB1dFNpemU6IHN0cmluZztcbiAgcHVibGljIGVycm9yOiBzdHJpbmc7XG4gIHB1YmxpYyB2YWx1ZTogYW55ID0gbnVsbDtcbiAgcHVibGljIG1vZGVsOiBCYXNlTW9kZWw7XG4gIHB1YmxpYyBpc1JlYWN0aXZlRm9ybSA9IHRydWU7XG4gIHB1YmxpYyBoaWdobGlnaHRPblZhbGlkID0gZmFsc2U7XG4gIHB1YmxpYyB0b3VjaGVkID0gZmFsc2U7XG4gIHByaXZhdGUgbW9kZWxEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgcHVibGljIG5nWm9uZTogTmdab25lKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWx3YXlzU2V0Q29uZmlnc09uSW5pdCgpO1xuICAgIHRoaXMuc2V0Q29uZmlnc09uSW5pdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5hbHdheXNEZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZSk7XG4gICAgICB0aGlzLmRldGVjdFByb3BlcnRpZXNDaGFuZ2VzKHByb3BOYW1lKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC0tLS0tLS0gQ29tcG9uZW50IGNvbmZpZ3Mgb24gaW5pdCBhbmQgY2hhbmdlcyBkZXRlY3Rpb24gIC0tLS0tLS1cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tIGZvciBjb21wdXRlZCBhdHRyaWJ1dGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgYWx3YXlzU2V0Q29uZmlnc09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENvbXBvbmVudFVuaXF1ZUlkKCk7XG4gIH1cblxuICBzZXRDb25maWdzT25Jbml0KCk6IHZvaWQge31cblxuICBhbHdheXNEZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHByb3BOYW1lID09PSAnc2l6ZScpIHRoaXMuZ2V0SW5wdXRTaXplKCk7XG4gICAgaWYgKHByb3BOYW1lID09PSAnZGlzYWJsZWQnKSB0aGlzLmNvbXB1dGVEaXNhYmxlZFByb3BlcnR5KCk7XG4gICAgaWYgKHByb3BOYW1lID09PSAncmVhZG9ubHknKSB0aGlzLmNvbXB1dGVSZWFkb25seVByb3BlcnR5KCk7XG4gIH1cblxuICBkZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZTogc3RyaW5nKTogdm9pZCB7fVxuXG4gIHNldENvbXBvbmVudFVuaXF1ZUlkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlkID09PSB1bmRlZmluZWQpIHRoaXMuaWQgPSB1dWlkLnY0KCk7XG4gIH1cblxuICBnZXRJbnB1dFNpemUoKTogdm9pZCB7XG4gICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgIGNhc2UgJ2RlZmF1bHQnOlxuICAgICAgICB0aGlzLmlucHV0U2l6ZSA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xhcmdlJzpcbiAgICAgICAgdGhpcy5pbnB1dFNpemUgPSAnaW5wdXQtZ3JvdXAtbGcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NtYWxsJzpcbiAgICAgICAgdGhpcy5pbnB1dFNpemUgPSAnaW5wdXQtZ3JvdXAtc20nO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuaW5wdXRTaXplID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVEaXNhYmxlZFByb3BlcnR5KCk6IHZvaWQge1xuICAgIHN3aXRjaCAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVSZWFkb25seVByb3BlcnR5KCk6IHZvaWQge1xuICAgIHN3aXRjaCAodGhpcy5yZWFkb25seSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICB0aGlzLnJlYWRvbmx5ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICB0aGlzLnJlYWRvbmx5ID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVhZG9ubHkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC0tLS0tLS0gQ29tcG9uZW50IGZvcm1zIGV2ZW50cyAtLS0tLS0tXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgZm9jdXMoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kRm9jdXNFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGJpbmRGb2N1c0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBmb2N1c291dChldmVudDogYW55KTogdm9pZCB7XG4gICAgZXZlbnQgPSB0aGlzLmJpbmRGb2N1c291dEV2ZW50cyhldmVudCk7XG4gICAgdGhpcy5mb2N1c291dEV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZEZvY3Vzb3V0RXZlbnRzKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGJsdXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kQmx1ckV2ZW50cyhldmVudCk7XG4gICAgdGhpcy5ibHVyRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBiaW5kQmx1ckV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBjaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kQ2hhbmdlRXZlbnRzKGV2ZW50KTtcbiAgICB0aGlzLmNoYW5nZUV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZENoYW5nZUV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBpbnB1dChldmVudDogYW55KTogdm9pZCB7XG4gICAgZXZlbnQgPSB0aGlzLmJpbmRJbnB1dEV2ZW50cyhldmVudCk7XG4gICAgdGhpcy5pbnB1dEV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZElucHV0RXZlbnRzKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC0tLS0tIENvbXBvbmVudCBrZXlib2FyZCBldmVudHMgLS0tLS0tXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAga2V5dXAoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kS2V5dXBFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMua2V5dXBFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGJpbmRLZXl1cEV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBrZXlkb3duKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBldmVudCA9IHRoaXMuYmluZEtleWRvd25FdmVudHMoZXZlbnQpO1xuICAgIHRoaXMua2V5ZG93bkV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZEtleWRvd25FdmVudHMoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAga2V5cHJlc3MoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kS2V5cHJlc3NFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMua2V5cHJlc3NFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGJpbmRLZXlwcmVzc0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAtLS0tLSBDb21wb25lbnQgbW91c2UgZXZlbnRzIC0tLS0tLVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGNsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBldmVudCA9IHRoaXMuYmluZENsaWNrRXZlbnRzKGV2ZW50KTtcbiAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBiaW5kQ2xpY2tFdmVudHMoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZGJsY2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kRGJsY2xpY2tFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMuZGJsY2xpY2tFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGJpbmREYmxjbGlja0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBtb3VzZWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kTW91c2Vkb3duRXZlbnRzKGV2ZW50KTtcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZE1vdXNlZG93bkV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBtb3VzZW1vdmUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kTW91c2Vtb3ZlRXZlbnRzKGV2ZW50KTtcbiAgICB0aGlzLm1vdXNlbW92ZUV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZE1vdXNlbW92ZUV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBtb3VzZW91dChldmVudDogYW55KTogdm9pZCB7XG4gICAgZXZlbnQgPSB0aGlzLmJpbmRNb3VzZW91dEV2ZW50cyhldmVudCk7XG4gICAgdGhpcy5tb3VzZW91dEV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZE1vdXNlb3V0RXZlbnRzKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIG1vdXNlb3ZlcihldmVudDogYW55KTogdm9pZCB7XG4gICAgZXZlbnQgPSB0aGlzLmJpbmRNb3VzZW92ZXJFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMubW91c2VvdmVyRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBiaW5kTW91c2VvdmVyRXZlbnRzKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIG1vdXNldXAoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kTW91c2V1cEV2ZW50cyhldmVudCk7XG4gICAgdGhpcy5tb3VzZXVwRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBiaW5kTW91c2V1cEV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBtb3VzZXdoZWVsKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBldmVudCA9IHRoaXMuYmluZE1vdXNld2hlZWxFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmluZE1vdXNld2hlZWxFdmVudHMoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgd2hlZWwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50ID0gdGhpcy5iaW5kV2hlZWxFdmVudHMoZXZlbnQpO1xuICAgIHRoaXMud2hlZWxFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGJpbmRXaGVlbEV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAtLS0tLSBDb21wb25lbnQgZGF0YSBtZXRob2RzIC0tLS0tLS0tLVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZpbGxNb2RlbCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCEodGhpcy5tb2RlbCBpbnN0YW5jZW9mIEJhc2VNb2RlbCkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnTW9kZWwgaXMgbm90IGluc3RhbmNlIG9mIEJhc2VNb2RlbCBmcm9tIEB3ZWJibG9ja3NhcHAvY2xhc3MtdmFsaWRhdG9yJyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignWW91ciBpbnB1dCBjb21wb25lbnQgbXVzdCBjb250YWluIGEgbmFtZSBhdHRyaWJ1dGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vZGVsLnNldFZhbHVlKHRoaXMubmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUZpZWxkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUmVhY3RpdmVGb3JtID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuaXNSZWFjdGl2ZUZvcm0gPT09IHRydWUpIHtcbiAgICAgIHRoaXMubW9kZWxcbiAgICAgICAgLnZhbGlkYXRlRmllbGQodGhpcy5uYW1lKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICAgIHRoaXMuc2V0VG91Y2hlZCgpO1xuICAgICAgICAgIHRoaXMuYmluZEV2ZW50c0FmdGVyVmFsaWRhdGVGaWVsZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgdGhpcy5iaW5kRXZlbnRzQWZ0ZXJWYWxpZGF0ZUZpZWxkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvdWNoZWQoKSB7XG4gICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1vZGVsLmdldFByb3BlcnR5TWFwKHRoaXMubmFtZSk7XG4gICAgbWFwLnRvdWNoZWQgPSB0cnVlO1xuICB9XG5cbiAgYmluZEV2ZW50c0FmdGVyVmFsaWRhdGVGaWVsZCgpOiB2b2lkIHt9XG5cbiAgc2V0RXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29uc3RyYWludHMgfSA9IGVycm9yWzBdO1xuICAgIHRoaXMuZXJyb3IgPSAoT2JqZWN0LnZhbHVlcyhjb25zdHJhaW50cylbMF0gYXMgc3RyaW5nKSB8fCAnJztcbiAgICB0aGlzLmVycm9yID0gY2FwaXRhbGl6ZSh0aGlzLmVycm9yKTtcbiAgfVxuXG4gIHJlZnJlc2goKTogdm9pZCB7fVxuXG4gIHdhdGNoTW9kZWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMubW9kZWxEaWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1vZGVsRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5tb2RlbCkuY3JlYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5tb2RlbERpZmZlci5kaWZmKHZhbHVlKTtcblxuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5iaW5kV2F0Y2hNb2RlbEV2ZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJpbmRXYXRjaE1vZGVsRXZlbnRzKCk6IHZvaWQge31cbn1cbiJdfQ==