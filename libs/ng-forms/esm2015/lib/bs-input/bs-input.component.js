import { Component, HostBinding } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export class BsInputComponent extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdG9zIE1hdXJvL0RvY3VtZW50b3MvRGVzYXJyb2xsb3MgV2ViL0FuZ3VsYXIgbGlicy9hbmd1bGFyLWJzLWZvcm0tY29tcG9uZW50cy9wcm9qZWN0cy9uZy1mb3Jtcy9zcmMvIiwic291cmNlcyI6WyJsaWIvYnMtaW5wdXQvYnMtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsV0FBVyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQXVFbEUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGFBQWE7SUFyRW5EOztRQXNFd0IsVUFBSyxHQUFHLFlBQVksQ0FBQztJQXFCN0MsQ0FBQztJQW5CQyxTQUFTO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQVU7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUExRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwRFQ7eUJBRUM7Ozs7S0FJQzthQUVKOzs7b0JBRUUsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERvQ2hlY2ssIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YUlucHV0QmFzZSB9IGZyb20gJy4uL2NvbW1vbi9jbGFzc2VzL2RhdGEtaW5wdXQtYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLWlucHV0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiIGF0dHIuZm9yPVwie3sgaWQgfX0tYnNcIj57e1xuICAgICAgbGFiZWxcbiAgICB9fTwvbGFiZWw+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cCB7eyBpbnB1dFNpemUgfX1cIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAnaXMtaW52YWxpZCc6IGVycm9yLFxuICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhcnRTbG90XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPnt7IHN0YXJ0U2xvdCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cInN0YXJ0U2xvdEh0bWxcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgW2lubmVySFRNTF09XCJzdGFydFNsb3RIdG1sXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8aW5wdXRcbiAgICAgICAgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZSA/ICdvbicgOiAnb2ZmJ1wiXG4gICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgIFt0eXBlXT1cInR5cGVcIlxuICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2lzLWludmFsaWQnOiBlcnJvcixcbiAgICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yXG4gICAgICAgIH1cIlxuICAgICAgICBpZD1cInt7IGlkIH19LWJzXCJcbiAgICAgICAgKGZvY3Vzb3V0KT1cImZvY3Vzb3V0KCRldmVudClcIlxuICAgICAgICAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiXG4gICAgICAgIChjaGFuZ2UpPVwiY2hhbmdlKCRldmVudClcIlxuICAgICAgICAoaW5wdXQpPVwiaW5wdXQoJGV2ZW50KVwiXG4gICAgICAgIChrZXl1cCk9XCJrZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgKGtleXByZXNzKT1cImtleXByZXNzKCRldmVudClcIlxuICAgICAgICAoY2xpY2spPVwiY2xpY2soJGV2ZW50KVwiXG4gICAgICAgIChkYmxjbGljayk9XCJkYmxjbGljaygkZXZlbnQpXCJcbiAgICAgICAgKG1vdXNlZG93bik9XCJtb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZW1vdmUpPVwibW91c2Vtb3ZlKCRldmVudClcIlxuICAgICAgICAobW91c2VvdXQpPVwibW91c2VvdXQoJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZW92ZXIpPVwibW91c2VvdmVyKCRldmVudClcIlxuICAgICAgICAobW91c2V1cCk9XCJtb3VzZXVwKCRldmVudClcIlxuICAgICAgICAod2hlZWwpPVwid2hlZWwoJGV2ZW50KVwiXG4gICAgICAvPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiZW5kU2xvdFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPnt7IGVuZFNsb3QgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJlbmRTbG90SHRtbFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIFtpbm5lckhUTUxdPVwiZW5kU2xvdEh0bWxcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c21hbGwgKm5nSWY9XCJoZWxwXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAge3sgaGVscCB9fVxuICAgIDwvc21hbGw+XG4gICAgPGRpdiAqbmdJZj1cImVycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCc0lucHV0Q29tcG9uZW50IGV4dGVuZHMgRGF0YUlucHV0QmFzZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3MgPSAnZm9ybS1ncm91cCc7XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMud2F0Y2hNb2RlbCgpO1xuICB9XG5cbiAgYmluZFdhdGNoTW9kZWxFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJpbmRGb2N1c291dEV2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICB0aGlzLnZhbGlkYXRlRmllbGQoKTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBiaW5kS2V5dXBFdmVudHMoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICB0aGlzLmZpbGxNb2RlbCh2YWx1ZSk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG59XG4iXX0=