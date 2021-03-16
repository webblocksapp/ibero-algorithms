import { EventEmitter } from '@angular/core';
export interface KeyboardEventsInterface {
    /**
     * keydown event emitter.
     */
    keydownEvent: EventEmitter<any>;
    /**
     * keypress event emitter.
     */
    keypressEvent: EventEmitter<any>;
    /**
     * keyup event emitter.
     */
    keyupEvent: EventEmitter<any>;
    /**
     * Emits keydown event.
     */
    keydown(event: any): void;
    /**
     * Register on this method new actions to be bind on keydown event.
     */
    bindKeydownEvents(event: any): any;
    /**
     * Emits keypress event.
     */
    keypress(event: any): void;
    /**
     * Register on this method new actions to be bind on keypress event.
     */
    bindKeypressEvents(event: any): any;
    /**
     * Emits keyup event.
     */
    keyup(event: any): void;
    /**
     * Register on this method new actions to be bind on keyup event.
     */
    bindKeyupEvents(event: any): any;
}
