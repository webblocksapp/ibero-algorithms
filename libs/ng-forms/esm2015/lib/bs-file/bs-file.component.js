import { Component, ElementRef, HostBinding, HostListener, Input, ViewChild, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export class BsFileComponent extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvRGF0b3MgTWF1cm8vRG9jdW1lbnRvcy9EZXNhcnJvbGxvcyBXZWIvQW5ndWxhciBsaWJzL2FuZ3VsYXItYnMtZm9ybS1jb21wb25lbnRzL3Byb2plY3RzL25nLWZvcm1zL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9icy1maWxlL2JzLWZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUNMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUF3RmxFLE1BQU0sT0FBTyxlQUFnQixTQUFRLGFBQWE7SUF0RmxEOztRQXVGd0IsVUFBSyxHQUFHLFlBQVksQ0FBQztRQVFwQyxnQkFBVyxHQUFHLGlEQUFpRCxDQUFDO1FBQy9ELFlBQU8sR0FBRyxLQUFLLENBQUM7SUFpRTFCLENBQUM7SUEvREMsZ0JBQWdCLENBQUMsS0FBVTtRQUN6QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUMzRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDN0MsZUFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNMLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBVTtRQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2hELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUs7UUFDaEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzlCLFNBQVMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbkIsU0FBUyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7O1lBaEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRUO3lCQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQkM7YUFFSjs7O29CQUVFLFdBQVcsU0FBQyxPQUFPO3dCQUVuQixTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTs4QkFDM0MsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTt1QkFHakQsS0FBSzswQkFnRUwsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YUlucHV0QmFzZSB9IGZyb20gJy4uL2NvbW1vbi9jbGFzc2VzL2RhdGEtaW5wdXQtYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLWZpbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImxhYmVsXCIgYXR0ci5mb3I9XCJ7eyBpZCB9fS1ic1wiPnt7XG4gICAgICBsYWJlbFxuICAgIH19PC9sYWJlbD5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImlucHV0LWdyb3VwIHt7IGlucHV0U2l6ZSB9fVwiXG4gICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICdpcy1pbnZhbGlkJzogZXJyb3IsXG4gICAgICAgICdpcy12YWxpZCc6IHRvdWNoZWQgJiYgaGlnaGxpZ2h0T25WYWxpZCAmJiAhZXJyb3JcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdGFydFNsb3RcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgc3RhcnRTbG90IH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhcnRTbG90SHRtbFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIiBbaW5uZXJIVE1MXT1cInN0YXJ0U2xvdEh0bWxcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImN1c3RvbS1maWxlXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICNmaWxlSW5wdXRcbiAgICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICAgIGNsYXNzPVwiY3VzdG9tLWZpbGUtaW5wdXRcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICdpcy1pbnZhbGlkJzogZXJyb3IsXG4gICAgICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yXG4gICAgICAgICAgfVwiXG4gICAgICAgICAgaWQ9XCJ7eyBpZCB9fS1ic1wiXG4gICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgI2N1c3RvbUZpbGVMYWJlbCBjbGFzcz1cImN1c3RvbS1maWxlLWxhYmVsXCIgZm9yPVwie3sgaWQgfX0tYnNcIj5cbiAgICAgICAgICB7eyBwbGFjZWhvbGRlciB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJlbmRTbG90XCJcbiAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmQgdXBsb2FkLWJ0blwiXG4gICAgICAgIChjbGljayk9XCJjbGlja0ZpbGVJbnB1dCgpXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgZW5kU2xvdCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICAqbmdJZj1cImVuZFNsb3RIdG1sICYmIGVuZFNsb3QgPT09IHVuZGVmaW5lZFwiXG4gICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCJcbiAgICAgICAgKGNsaWNrKT1cImNsaWNrRmlsZUlucHV0KClcIlxuICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCB1cGxvYWQtYnRuXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cImVuZFNsb3RIdG1sXCJcbiAgICAgICAgPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzbWFsbCAqbmdJZj1cImhlbHBcIiBjbGFzcz1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+XG4gICAgICB7eyBoZWxwIH19XG4gICAgPC9zbWFsbD5cbiAgICA8ZGl2ICpuZ0lmPVwiZXJyb3JcIiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2tcIj57eyBlcnJvciB9fTwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAuY3VzdG9tLWZpbGUtbGFiZWwge1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLmN1c3RvbS1maWxlLWxhYmVsOjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLnVwbG9hZC1idG4ge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNGaWxlQ29tcG9uZW50IGV4dGVuZHMgRGF0YUlucHV0QmFzZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzcyA9ICdmb3JtLWdyb3VwJztcblxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgZmlsZUlucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjdXN0b21GaWxlTGFiZWwnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSlcbiAgY3VzdG9tRmlsZUxhYmVsOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBlbmRTbG90SHRtbCA9ICc8aSBjbGFzcz1cImZhIGZhLXVwbG9hZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4nO1xuICBwcml2YXRlIGNsaWNrZWQgPSBmYWxzZTtcblxuICBiaW5kQ2hhbmdlRXZlbnRzKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGN1c3RvbUZpbGVMYWJlbCA9IHRoaXMuY3VzdG9tRmlsZUxhYmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEZpbGVPckZpbGVzKCk7XG5cbiAgICB0aGlzLmZpbGxNb2RlbCh2YWx1ZSk7XG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjdXN0b21GaWxlTGFiZWwuaW5uZXJUZXh0ID0gdGhpcy5wbGFjZWhvbGRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lcyA9IHRoaXMuZ2V0RmlsZU5hbWVzKHZhbHVlKTtcbiAgICAgICAgY3VzdG9tRmlsZUxhYmVsLmlubmVyVGV4dCA9IGZpbGVOYW1lcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGJpbmRGb2N1c0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0RmlsZU9yRmlsZXMoKTtcblxuICAgIGlmICh0aGlzLmNsaWNrZWQgPT09IHRydWUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgY2xpY2tGaWxlSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRGaWxlT3JGaWxlcygpOiBhbnkge1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IGZpbGVzIDogZmlsZXNbMF07XG4gIH1cblxuICBnZXRGaWxlTmFtZXMoZmlsZXMpOiBzdHJpbmcge1xuICAgIGxldCBmaWxlTmFtZXMgPSAnJztcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgY29uc3QgZmlsZUl0ZW1zID0gT2JqZWN0LnZhbHVlcyhmaWxlcyk7XG4gICAgICBmaWxlSXRlbXMuZm9yRWFjaCgoZmlsZTogYW55KSA9PiB7XG4gICAgICAgIGZpbGVOYW1lcyArPSBgJHtmaWxlLm5hbWV9LCBgO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBmaWxlcztcbiAgICAgIGZpbGVOYW1lcyArPSBgJHtmaWxlLm5hbWV9YDtcbiAgICAgIHJldHVybiBmaWxlTmFtZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lcy5zbGljZSgwLCAtMik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2tIb3N0KCkge1xuICAgIHRoaXMuY2xpY2tlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==