import { Component, Input, ViewChildren, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
export class BsChecksComponent extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY2hlY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9EYXRvcyBNYXVyby9Eb2N1bWVudG9zL0Rlc2Fycm9sbG9zIFdlYi9Bbmd1bGFyIGxpYnMvYW5ndWxhci1icy1mb3JtLWNvbXBvbmVudHMvcHJvamVjdHMvbmctZm9ybXMvc3JjLyIsInNvdXJjZXMiOlsibGliL2JzLWNoZWNrcy9icy1jaGVja3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUVMLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFtRWxFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBaEVwRDs7UUFrRVcsWUFBTyxHQUFpQixTQUFTLENBQUM7UUFDbEMsU0FBSSxHQUFjLE9BQU8sQ0FBQztJQTZFckMsQ0FBQztJQXpFQyxTQUFTO1FBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQWdCO1FBQ3RDLElBQUksUUFBUSxLQUFLLFVBQVU7WUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUM5RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQVU7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQzdDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztZQUVsRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHlCQUF5QjtRQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO29CQUM3QyxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7b0JBQ2xELFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7Z0JBQ2xELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXBELDBDQUEwQztnQkFDMUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEUsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO29CQUN4QixRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQS9JRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUO3lCQUVDOzs7Ozs7Ozs7Ozs7S0FZQzthQUVKOzs7c0JBRUUsS0FBSztzQkFDTCxLQUFLO21CQUNMLEtBQUs7eUJBRUwsWUFBWSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhSW5wdXRCYXNlIH0gZnJvbSAnLi4vY29tbW9uL2NsYXNzZXMvZGF0YS1pbnB1dC1iYXNlJztcbmltcG9ydCB7IENoZWNrRGlzcGxheSwgQ2hlY2tMb29rIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnMtY2hlY2tzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jaGVja2JveFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAnY3VzdG9tLWNvbnRyb2wtaW5saW5lJzogZGlzcGxheSA9PT0gJ2lubGluZScsXG4gICAgICAgICAgJ2lzLWludmFsaWQnOiBlcnJvcixcbiAgICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yLFxuICAgICAgICAgICdjdXN0b20tY2hlY2tib3gtY2lyY2xlJzogbG9vayA9PT0gJ2NpcmNsZScsXG4gICAgICAgICAgJ2N1c3RvbS1zd2l0Y2gnOiBsb29rID09PSAnc3dpdGNoJ1xuICAgICAgICB9XCJcbiAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgI2NoZWNrYm94XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjbGFzcz1cImN1c3RvbS1jb250cm9sLWlucHV0XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAnaXMtaW52YWxpZCc6IGVycm9yLFxuICAgICAgICAgICAgJ2lzLXZhbGlkJzogdG91Y2hlZCAmJiBoaWdobGlnaHRPblZhbGlkICYmICFlcnJvclxuICAgICAgICAgIH1cIlxuICAgICAgICAgIGlkPVwie3sgaWQgfX0te3sgaSB9fS1ic1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgW2F0dHIuY2hlY2tlZF09XCJvcHRpb24uY2hlY2tlZFwiXG4gICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImN1c3RvbS1jb250cm9sLWxhYmVsXCIgZm9yPVwie3sgaWQgfX0te3sgaSB9fS1ic1wiPlxuICAgICAgICAgIHt7IG9wdGlvbi52aWV3VmFsdWUgfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImkgPT09IG9wdGlvbnMubGVuZ3RoIC0gMSAmJiBkaXNwbGF5ID09PSAnZGVmYXVsdCdcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZXJyb3JcIiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2tcIj57eyBlcnJvciB9fTwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdpbmxpbmUnXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJlcnJvclwiIGNsYXNzPVwiaW52YWxpZC1mZWVkYmFjayBpbnZhbGlkLWZlZWRiYWNrLWlubGluZVwiPlxuICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8c21hbGwgKm5nSWY9XCJoZWxwXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAgICB7eyBoZWxwIH19XG4gICAgICA8L3NtYWxsPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCAuY3VzdG9tLWNoZWNrYm94IHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAuZm9ybS1sYWJlbCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgLmludmFsaWQtZmVlZGJhY2staW5saW5lIHtcbiAgICAgICAgbWFyZ2luLXRvcDogLThweDtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCc0NoZWNrc0NvbXBvbmVudCBleHRlbmRzIERhdGFJbnB1dEJhc2UgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgZGlzcGxheTogQ2hlY2tEaXNwbGF5ID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBsb29rOiBDaGVja0xvb2sgPSAnY2hlY2snO1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2NoZWNrYm94JykgY2hlY2tib3hlczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLndhdGNoTW9kZWwoKTtcbiAgfVxuXG4gIGJpbmRXYXRjaE1vZGVsRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdENoZWNrZWRPcHRpb25zKCk7XG4gIH1cblxuICBkZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHByb3BOYW1lID09PSAnZGlzYWJsZWQnKSB0aGlzLmVuYWJsZU9yRGlzYWJsZUNoZWNrYm94ZXMoKTtcbiAgICBpZiAocHJvcE5hbWUgPT09ICdvcHRpb25zJykge1xuICAgICAgdGhpcy5yZWZyZXNoQ2hlY2tib3hlcygpO1xuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja0V2ZW50cyhldmVudDogYW55KTogYW55IHtcbiAgICB0aGlzLnJlZnJlc2hDaGVja2JveGVzKCk7XG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZ2V0Q2hlY2tib3hlc1ZhbHVlcygpOiBBcnJheTxhbnk+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3hFbGVtZW50UmVmKSA9PiB7XG4gICAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YWx1ZXMucHVzaChjaGVja2JveC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgZW5hYmxlT3JEaXNhYmxlQ2hlY2tib3hlcygpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3hFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBjaGVja2JveEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjaGVja2JveC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdENoZWNrZWRPcHRpb25zKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94RWxlbWVudFJlZikgPT4ge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSkgfHwgW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB0cmlwbGUtZXF1YWxzXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZXMuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgPT0gY2hlY2tib3gudmFsdWUpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJlZFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZWZyZXNoQ2hlY2tib3hlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0Q2hlY2tib3hlc1ZhbHVlcygpO1xuICAgICAgdGhpcy5maWxsTW9kZWwodmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdENoZWNrZWRPcHRpb25zKCk7XG4gIH1cbn1cbiJdfQ==