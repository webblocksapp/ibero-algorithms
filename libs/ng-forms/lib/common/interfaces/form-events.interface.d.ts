import { EventEmitter } from '@angular/core';
export interface FormEventsInterface {
    /**
     * focus event emitter.
     */
    focusEvent: EventEmitter<any>;
    /**
     * focusout event emitter.
     */
    focusoutEvent: EventEmitter<any>;
    /**
     * blur event emitter.
     */
    blurEvent: EventEmitter<any>;
    /**
     * change event emitter.
     */
    changeEvent: EventEmitter<any>;
    /**
     * input event emitter.
     */
    inputEvent: EventEmitter<any>;
    /**
     * Emits focus event.
     */
    focus(event: any): void;
    /**
     * Emits focusout event.
     */
    focusout(event: any): void;
    /**
     * Register on this method new actions to be bind on focusout event.
     */
    bindFocusoutEvents(event: any): any;
    /**
     * Emits blur event.
     */
    blur(event: any): void;
    /**
     * Register on this method new actions to be bind on blur event.
     */
    bindBlurEvents(event: any): any;
    /**
     * Emits change event.
     */
    change(event: any): void;
    /**
     * Register on this method new actions to be bind on change event.
     */
    bindChangeEvents(event: any): any;
    /**
     * Emits input event.
     */
    input(event: any): void;
    /**
     * Register on this method new actions to be bind on input event.
     */
    bindInputEvents(event: any): any;
    /**
     * Fills the input value according to the model provided.
     */
    fillModel(event: any): void;
}
