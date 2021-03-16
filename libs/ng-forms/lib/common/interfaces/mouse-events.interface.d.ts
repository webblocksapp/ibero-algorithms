import { EventEmitter } from '@angular/core';
export interface MouseEventsInterface {
    /**
     * clickEvent event emitter.
     */
    clickEvent: EventEmitter<any>;
    /**
     * dblclickEvent event emitter.
     */
    dblclickEvent: EventEmitter<any>;
    /**
     * mousedownEvent event emitter.
     */
    mousedownEvent: EventEmitter<any>;
    /**
     * mousemoveEvent event emitter.
     */
    mousemoveEvent: EventEmitter<any>;
    /**
     * mouseoutEvent event emitter.
     */
    mouseoutEvent: EventEmitter<any>;
    /**
     * mouseoverEvent event emitter.
     */
    mouseoverEvent: EventEmitter<any>;
    /**
     * mouseupEvent event emitter.
     */
    mouseupEvent: EventEmitter<any>;
    /**
     * mousewheelEvent event emitter.
     */
    mousewheelEvent: EventEmitter<any>;
    /**
     * wheelEvent event emitter.
     */
    wheelEvent: EventEmitter<any>;
    /**
     * Emits click event.
     */
    click(event: any): void;
    /**
     * Register on this method new actions to be bind on click event.
     */
    bindClickEvents(event: any): any;
    /**
     * Emits dblclick event.
     */
    dblclick(event: any): void;
    /**
     * Register on this method new actions to be bind on dblclick event.
     */
    bindDblclickEvents(event: any): any;
    /**
     * Emits mousedown event.
     */
    mousedown(event: any): void;
    /**
     * Register on this method new actions to be bind on mousedown event.
     */
    bindMousedownEvents(event: any): any;
    /**
     * Emits mousemove event.
     */
    mousemove(event: any): void;
    /**
     * Register on this method new actions to be bind on mousemove event.
     */
    bindMousemoveEvents(event: any): any;
    /**
     * Emits mouseout event.
     */
    mouseout(event: any): void;
    /**
     * Register on this method new actions to be bind on mouseout event.
     */
    bindMouseoutEvents(event: any): any;
    /**
     * Emits mouseover event.
     */
    mouseover(event: any): void;
    /**
     * Register on this method new actions to be bind on mouseover event.
     */
    bindMouseoverEvents(event: any): any;
    /**
     * Emits mouseup event.
     */
    mouseup(event: any): void;
    /**
     * Register on this method new actions to be bind on mouseup event.
     */
    bindMouseupEvents(event: any): any;
    /**
     * Emits mousewheel event.
     */
    mousewheel(event: any): void;
    /**
     * Register on this method new actions to be bind on mousewheel event.
     */
    bindMousewheelEvents(event: any): any;
    /**
     * Emits wheel event.
     */
    wheel(event: any): void;
    /**
     * Register on this method new actions to be bind on bindWheelEvents event.
     */
    bindWheelEvents(event: any): any;
}
