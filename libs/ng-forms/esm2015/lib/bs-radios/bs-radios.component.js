import { Component, Input, ViewChildren, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export class BsRadiosComponent extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtcmFkaW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9EYXRvcyBNYXVyby9Eb2N1bWVudG9zL0Rlc2Fycm9sbG9zIFdlYi9Bbmd1bGFyIGxpYnMvYW5ndWxhci1icy1mb3JtLWNvbXBvbmVudHMvcHJvamVjdHMvbmctZm9ybXMvc3JjLyIsInNvdXJjZXMiOlsibGliL2JzLXJhZGlvcy9icy1yYWRpb3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUVMLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFvRWxFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBakVwRDs7UUFtRVcsWUFBTyxHQUFpQixTQUFTLENBQUM7UUFDbEMsU0FBSSxHQUFjLE9BQU8sQ0FBQztJQTRFckMsQ0FBQztJQXhFQyxTQUFTO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQWdCO1FBQ3RDLElBQUksUUFBUSxLQUFLLFVBQVU7WUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksS0FBSyxDQUFDO1FBRVYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDO1lBRTVDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQzFCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7b0JBQ3RDLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUM7b0JBQzVDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDO2dCQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTdDLDBDQUEwQztnQkFDMUMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtvQkFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNMLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUN2QjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQS9JRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDVDt5QkFFQzs7Ozs7Ozs7Ozs7O0tBWUM7YUFFSjs7O3NCQUVFLEtBQUs7c0JBQ0wsS0FBSzttQkFDTCxLQUFLO3FCQUVMLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YUlucHV0QmFzZSB9IGZyb20gJy4uL2NvbW1vbi9jbGFzc2VzL2RhdGEtaW5wdXQtYmFzZSc7XG5pbXBvcnQgeyBSYWRpb0Rpc3BsYXksIFJhZGlvTG9vayB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLXJhZGlvcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwibGFiZWxcIj57eyBsYWJlbCB9fTwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tcmFkaW9cIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2N1c3RvbS1jb250cm9sLWlubGluZSc6IGRpc3BsYXkgPT09ICdpbmxpbmUnLFxuICAgICAgICAgICdpcy1pbnZhbGlkJzogZXJyb3IsXG4gICAgICAgICAgJ2lzLXZhbGlkJzogdG91Y2hlZCAmJiBoaWdobGlnaHRPblZhbGlkICYmICFlcnJvcixcbiAgICAgICAgICAnY3VzdG9tLXJhZGlvLXJvdW5kZWQnOiBsb29rID09PSAncmFkaW8nLFxuICAgICAgICAgICdjdXN0b20tc3dpdGNoJzogbG9vayA9PT0gJ3N3aXRjaCdcbiAgICAgICAgfVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICNyYWRpb1xuICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgJ2lzLWludmFsaWQnOiBlcnJvcixcbiAgICAgICAgICAgICdpcy12YWxpZCc6IHRvdWNoZWQgJiYgaGlnaGxpZ2h0T25WYWxpZCAmJiAhZXJyb3JcbiAgICAgICAgICB9XCJcbiAgICAgICAgICBpZD1cInt7IGlkIH19LXt7IGkgfX0tYnNcIlxuICAgICAgICAgIG5hbWU9XCJ7eyBuYW1lIH19LXt7IGlkIH19LWJzW11cIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFthdHRyLmNoZWNrZWRdPVwib3B0aW9uLmNoZWNrZWRcIlxuICAgICAgICAgIFthdHRyLmRpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsaWNrKCRldmVudClcIlxuICAgICAgICAgIChjaGFuZ2UpPVwiY2hhbmdlKCRldmVudClcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cInt7IGlkIH19LXt7IGkgfX0tYnNcIj5cbiAgICAgICAgICB7eyBvcHRpb24udmlld1ZhbHVlIH19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpID09PSBvcHRpb25zLmxlbmd0aCAtIDEgJiYgZGlzcGxheSA9PT0gJ2RlZmF1bHQnXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImVycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5ID09PSAnaW5saW5lJ1wiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZXJyb3JcIiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2sgaW52YWxpZC1mZWVkYmFjay1pbmxpbmVcIj5cbiAgICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHNtYWxsICpuZ0lmPVwiaGVscFwiIGNsYXNzPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5cbiAgICAgICAge3sgaGVscCB9fVxuICAgICAgPC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3QgLmN1c3RvbS1yYWRpbyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDAuOHJlbTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLmZvcm0tbGFiZWwge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIDpob3N0IC5pbnZhbGlkLWZlZWRiYWNrLWlubGluZSB7XG4gICAgICAgIG1hcmdpbi10b3A6IC04cHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNSYWRpb3NDb21wb25lbnQgZXh0ZW5kcyBEYXRhSW5wdXRCYXNlIGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIGRpc3BsYXk6IFJhZGlvRGlzcGxheSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbG9vazogUmFkaW9Mb29rID0gJ3JhZGlvJztcblxuICBAVmlld0NoaWxkcmVuKCdyYWRpbycpIHJhZGlvczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLndhdGNoTW9kZWwoKTtcbiAgfVxuXG4gIGJpbmRXYXRjaE1vZGVsRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdENoZWNrZWRPcHRpb24oKTtcbiAgfVxuXG4gIGRldGVjdFByb3BlcnRpZXNDaGFuZ2VzKHByb3BOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAocHJvcE5hbWUgPT09ICdkaXNhYmxlZCcpIHRoaXMuZW5hYmxlT3JEaXNhYmxlUmFkaW9zKCk7XG4gICAgaWYgKHByb3BOYW1lID09PSAnb3B0aW9ucycpIHtcbiAgICAgIHRoaXMucmVmcmVzaFJhZGlvcygpO1xuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICB0aGlzLnJlZnJlc2hSYWRpb3MoKTtcbiAgICB0aGlzLnZhbGlkYXRlRmllbGQoKTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBnZXRSYWRpb3NWYWx1ZSgpOiBBcnJheTxhbnk+IHtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICB0aGlzLnJhZGlvcy5mb3JFYWNoKChyYWRpb0VsZW1lbnRSZWYpID0+IHtcbiAgICAgIGNvbnN0IHJhZGlvID0gcmFkaW9FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGlmIChyYWRpby5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgIHZhbHVlID0gcmFkaW8udmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBlbmFibGVPckRpc2FibGVSYWRpb3MoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5yYWRpb3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJhZGlvcy5mb3JFYWNoKChyYWRpb0VsZW1lbnRSZWYpID0+IHtcbiAgICAgICAgICBjb25zdCByYWRpbyA9IHJhZGlvRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIHJhZGlvLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0Q2hlY2tlZE9wdGlvbigpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmFkaW9zLmZvckVhY2goKHJhZGlvRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBjb25zdCByYWRpbyA9IHJhZGlvRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcbiAgICAgICAgaWYgKHJhZGlvLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgICAgcmFkaW8uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmFkaW8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hSYWRpb3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmFkaW9zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRSYWRpb3NWYWx1ZSgpO1xuICAgICAgdGhpcy5maWxsTW9kZWwodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2goKTogdm9pZCB7XG4gICAgdGhpcy5pbml0Q2hlY2tlZE9wdGlvbigpO1xuICB9XG59XG4iXX0=