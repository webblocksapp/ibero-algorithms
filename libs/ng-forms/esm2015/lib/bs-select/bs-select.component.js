import { Component, ElementRef, HostBinding, ViewChild, ViewEncapsulation, Input, Output, EventEmitter, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { isNull } from '../common/utils';
export class BsSelectComponent extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9EYXRvcyBNYXVyby9Eb2N1bWVudG9zL0Rlc2Fycm9sbG9zIFdlYi9Bbmd1bGFyIGxpYnMvYW5ndWxhci1icy1mb3JtLWNvbXBvbmVudHMvcHJvamVjdHMvbmctZm9ybXMvc3JjLyIsInNvdXJjZXMiOlsibGliL2JzLXNlbGVjdC9icy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFpSXpDLE1BQU0sT0FBTyxpQkFDWCxTQUFRLGFBQWE7SUFoSXZCOztRQWtJd0IsVUFBSyxHQUFHLHNCQUFzQixDQUFDO1FBSzVDLFlBQU8sR0FBMkIsRUFBRSxDQUFDO1FBQ3JDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFXLGNBQWMsQ0FBQztRQUNuQyxnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixhQUFRLEdBQVcsYUFBYSxDQUFDO1FBY2hDLGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzVCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsc0JBQWlCLEdBQWtCO1lBQ3pDLFNBQVM7WUFDVCxPQUFPO1lBQ1AsV0FBVztZQUNYLGFBQWE7WUFDYixVQUFVO1lBQ1YsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixZ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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUZUO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO3lCQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ0M7YUFFSjs7O29CQUlFLFdBQVcsU0FBQyxPQUFPOytCQUNuQixTQUFTLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3NCQUdsRCxLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSztpQ0FDTCxLQUFLO3VCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFFTCxNQUFNOzBCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRG9DaGVjayxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YUlucHV0QmFzZSB9IGZyb20gJy4uL2NvbW1vbi9jbGFzc2VzL2RhdGEtaW5wdXQtYmFzZSc7XG5pbXBvcnQgeyBTZWxlY3RPcHRpb24sIFNlbGVjdE9wdGlvbkdyb3VwIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGlzTnVsbCB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwibGFiZWxcIiBhdHRyLmZvcj1cInt7IGlkIH19LWJzXCI+e3tcbiAgICAgIGxhYmVsXG4gICAgfX08L2xhYmVsPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAge3sgaW5wdXRTaXplIH19XCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgJ2lzLWludmFsaWQnOiBlcnJvcixcbiAgICAgICAgJ2lzLXZhbGlkJzogdG91Y2hlZCAmJiBoaWdobGlnaHRPblZhbGlkICYmICFlcnJvclxuICAgICAgfVwiXG4gICAgPlxuICAgICAgPGRpdiAqbmdJZj1cInN0YXJ0U2xvdFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj57eyBzdGFydFNsb3QgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdGFydFNsb3RIdG1sXCIgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIFtpbm5lckhUTUxdPVwic3RhcnRTbG90SHRtbFwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNlbGVjdFxuICAgICAgICAjc2VsZWN0RWxlbWVudFJlZlxuICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlXCJcbiAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzZWxlY3RwaWNrZXJcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkLFxuICAgICAgICAgICdzaG93LXRpY2snOiBzaG93VGljayxcbiAgICAgICAgICBkcm9wdXA6ICFkcm9wdXBBdXRvXG4gICAgICAgIH1cIlxuICAgICAgICBpZD1cInt7IGlkIH19LWJzXCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIj5cbiAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwibXVsdGlwbGUgPT09IGZhbHNlXCIgaGlkZGVuPjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICpuZ0lmPVwib3B0aW9uLmdyb3VwID09PSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cIm9wdGlvbi5zZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXRva2Vuc109XCJvcHRpb24ua2V5V29yZHNcIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwib3B0aW9uLnRpdGxlXCJcbiAgICAgICAgICAgIFthdHRyLmNsYXNzXT1cIm9wdGlvbi5jbGFzc1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWljb25dPVwib3B0aW9uLmljb25cIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1jb250ZW50XT1cIm9wdGlvbi5jb250ZW50XCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtc3VidGV4dF09XCJvcHRpb24uc3VidGV4dFwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJvcHRpb24uc3R5bGVcIlxuICAgICAgICAgICAgW2F0dHIudmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtZGl2aWRlcl09XCJvcHRpb24uZGl2aWRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgb3B0aW9uLnZpZXdWYWx1ZSB9fVxuICAgICAgICAgIDwvb3B0aW9uPlxuXG4gICAgICAgICAgPG9wdGdyb3VwXG4gICAgICAgICAgICAqbmdJZj1cIm9wdGlvbi5ncm91cCAhPT0gdW5kZWZpbmVkXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJvcHRpb24uZ3JvdXBcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1tYXgtb3B0aW9uc109XCJvcHRpb24ubWF4T3B0aW9uc1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWljb25dPVwib3B0aW9uLmljb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb24uZ3JvdXBWYWx1ZXNcIlxuICAgICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICBbYXR0ci5zZWxlY3RlZF09XCJvcHRpb24uc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLXRva2Vuc109XCJvcHRpb24ua2V5V29yZHNcIlxuICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJvcHRpb24udGl0bGVcIlxuICAgICAgICAgICAgICBbYXR0ci5jbGFzc109XCJvcHRpb24uY2xhc3NcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWljb25dPVwib3B0aW9uLmljb25cIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWNvbnRlbnRdPVwib3B0aW9uLmNvbnRlbnRcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLXN1YnRleHRdPVwib3B0aW9uLnN1YnRleHRcIlxuICAgICAgICAgICAgICBbbmdTdHlsZV09XCJvcHRpb24uc3R5bGVcIlxuICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWRpdmlkZXJdPVwib3B0aW9uLmRpdmlkZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBvcHRpb24udmlld1ZhbHVlIH19XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPGRpdiAqbmdJZj1cImVuZFNsb3RcIiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj57eyBlbmRTbG90IH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZW5kU2xvdEh0bWxcIiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj57eyBlbmRTbG90SHRtbCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzbWFsbCAqbmdJZj1cImhlbHBcIiBjbGFzcz1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+XG4gICAgICB7eyBoZWxwIH19XG4gICAgPC9zbWFsbD5cbiAgICA8ZGl2ICpuZ0lmPVwib25WYWxpZGF0ZWRcIiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2tcIj5cbiAgICAgIHt7IGVycm9yIH19XG4gICAgPC9kaXY+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5uZy1zZWxlY3QuZm9ybS1ncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAubmctc2VsZWN0IC5ib290c3RyYXAtc2VsZWN0IC5kcm9wZG93bi1tZW51LmlubmVyIHtcbiAgICAgICAgZGlzcGxheTogaW5pdGlhbDtcbiAgICAgIH1cblxuICAgICAgLm5nLXNlbGVjdCAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgIHZpc2liaWxpdHk6IGluaXRpYWw7XG4gICAgICB9XG5cbiAgICAgIC5uZy1zZWxlY3QgLmRyb3Bkb3duLXRvZ2dsZTpmb2N1cyB7XG4gICAgICAgIG91dGxpbmU6IDAgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLm5nLXNlbGVjdCAuaW5wdXQtZ3JvdXAtc20gPiAuZHJvcGRvd24gPiBidXR0b24sXG4gICAgICAubmctc2VsZWN0IC5pbnB1dC1ncm91cC1sZyA+IC5kcm9wZG93biA+IGJ1dHRvbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgICAgICBsaW5lLWhlaWdodDogaW5pdGlhbDtcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgfVxuXG4gICAgICAubmctc2VsZWN0IC5pbnB1dC1ncm91cC1zbSA+IC5kcm9wZG93biA+IGJ1dHRvbiA+IC5maWx0ZXItb3B0aW9uLFxuICAgICAgLm5nLXNlbGVjdCAuaW5wdXQtZ3JvdXAtbGcgPiAuZHJvcGRvd24gPiBidXR0b24gPiAuZmlsdGVyLW9wdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNTZWxlY3RDb21wb25lbnRcbiAgZXh0ZW5kcyBEYXRhSW5wdXRCYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjayB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzcyA9ICduZy1zZWxlY3QgZm9ybS1ncm91cCc7XG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdEVsZW1lbnRSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSlcbiAgc2VsZWN0RWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxTZWxlY3RPcHRpb24+IHwgQXJyYXk8U2VsZWN0T3B0aW9uR3JvdXA+O1xuICBASW5wdXQoKSBjb25maWdzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gIEBJbnB1dCgpIHN0eWxlOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc3R5bGVCYXNlOiBzdHJpbmcgPSAnZm9ybS1jb250cm9sJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnICc7XG4gIEBJbnB1dCgpIGljb25CYXNlOiBzdHJpbmcgPSAnZm9udEF3ZXNvbWUnO1xuICBASW5wdXQoKSBzZWxlY3RBbGxUZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlc2VsZWN0QWxsVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBsaXZlU2VhcmNoOiBib29sZWFuO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgbWF4T3B0aW9uczogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhPcHRpb25zVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3RlZFRleHRGb3JtYXQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd1RpY2s6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvdW50U2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjdGlvbnNCb3g6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBkcm9wdXBBdXRvOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHNob3duRXZlbnQ6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBoaWRkZW5FdmVudDogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgb25WYWxpZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIHNlbGVjdDogYW55O1xuICBwcml2YXRlIG9uU2hvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RDb25maWdzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSB3YXRjaGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAnY29uZmlncycsXG4gICAgJ3N0eWxlJyxcbiAgICAnc3R5bGVCYXNlJyxcbiAgICAncGxhY2Vob2xkZXInLFxuICAgICdpY29uQmFzZScsXG4gICAgJ3NlbGVjdEFsbFRleHQnLFxuICAgICdkZXNlbGVjdEFsbFRleHQnLFxuICAgICdsaXZlU2VhcmNoJyxcbiAgICAnbXVsdGlwbGUnLFxuICAgICdtYXhPcHRpb25zJyxcbiAgICAnbWF4T3B0aW9uc1RleHQnLFxuICAgICdzZWxlY3RlZFRleHRGb3JtYXQnLFxuICAgICdzaG93VGljaycsXG4gICAgJ2NvdW50U2VsZWN0ZWRUZXh0JyxcbiAgICAnYWN0aW9uc0JveCcsXG4gICAgJ2hlYWRlcicsXG4gICAgJ2Ryb3B1cEF1dG8nLFxuICBdO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRKUXVlcnlFbCgpO1xuICAgIHRoaXMuaW5pdFNlbGVjdCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMud2F0Y2hNb2RlbCgpO1xuICB9XG5cbiAgYmluZFdhdGNoTW9kZWxFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0U2VsZWN0ZWRPcHRpb25zKCk7XG4gIH1cblxuICBkZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHByb3BOYW1lID09PSAnZGlzYWJsZWQnKSB0aGlzLmVuYWJsZU9yRGlzYWJsZVNlbGVjdCgpO1xuICAgIGlmIChwcm9wTmFtZSA9PT0gJ29wdGlvbnMnKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTZWxlY3QoKTtcbiAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdFdoZW5PcHRpb25zQXJlRW1wdHkoKTtcbiAgICB9XG4gICAgaWYgKHByb3BOYW1lID09PSAnbWF4T3B0aW9ucycpIHtcbiAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGVkT3B0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChwcm9wTmFtZSA9PT0gJ21heE9wdGlvbnNUZXh0Jykge1xuICAgICAgaWYgKGlzTnVsbCh0aGlzLm1heE9wdGlvbnNUZXh0KSkgdGhpcy5tYXhPcHRpb25zVGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAocHJvcE5hbWUgPT09ICdjb3VudFNlbGVjdGVkVGV4dCcpIHtcbiAgICAgIGlmIChpc051bGwodGhpcy5jb3VudFNlbGVjdGVkVGV4dCkpIHRoaXMuY291bnRTZWxlY3RlZFRleHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHByb3BOYW1lID09PSAnZGVzZWxlY3RBbGxUZXh0Jykge1xuICAgICAgaWYgKGlzTnVsbCh0aGlzLmRlc2VsZWN0QWxsVGV4dCkpIHRoaXMuZGVzZWxlY3RBbGxUZXh0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChwcm9wTmFtZSA9PT0gJ3NlbGVjdEFsbFRleHQnKSB7XG4gICAgICBpZiAoaXNOdWxsKHRoaXMuc2VsZWN0QWxsVGV4dCkpIHRoaXMuc2VsZWN0QWxsVGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAocHJvcE5hbWUgPT09ICdoZWFkZXInKSB7XG4gICAgICBpZiAoaXNOdWxsKHRoaXMuaGVhZGVyKSkgdGhpcy5oZWFkZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2F0Y2hlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wTmFtZSkgPiAtMSkge1xuICAgICAgdGhpcy5yZWJ1aWxkU2VsZWN0KCk7XG5cbiAgICAgIC8vIENvZGUgZXZlbnRzIHRoYXQgbXVzdCBiZSBwbGFjZWQgYWZ0ZXIgcmVidWlsZFNlbGVjdFxuICAgICAgaWYgKCFpc051bGwodGhpcy5tYXhPcHRpb25zKSkgdGhpcy5oaWRlU2VsZWN0QWxsQnV0dG9uKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEpRdWVyeUVsKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ID0gJCh0aGlzLnNlbGVjdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBpbml0U2VsZWN0KCk6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRTZWxlY3RDb25maWdzKCk7XG4gICAgdGhpcy5zZWxlY3Quc2VsZWN0cGlja2VyKHRoaXMuc2VsZWN0Q29uZmlncyk7XG4gICAgdGhpcy5lbmFibGVPckRpc2FibGVTZWxlY3QoKTtcbiAgICB0aGlzLmFkZEF1dG9DbG9zZUNsYXNzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzVG9TZWxlY3QoKTtcbiAgfVxuXG4gIGJ1aWxkU2VsZWN0Q29uZmlncygpOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlncyA9IHtcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgc3R5bGVCYXNlOiB0aGlzLnN0eWxlQmFzZSxcbiAgICAgIHRpdGxlOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgaWNvbkJhc2U6IHRoaXMuaWNvbkJhc2UsXG4gICAgICBzZWxlY3RBbGxUZXh0OiB0aGlzLnNlbGVjdEFsbFRleHQsXG4gICAgICBkZXNlbGVjdEFsbFRleHQ6IHRoaXMuZGVzZWxlY3RBbGxUZXh0LFxuICAgICAgbGl2ZVNlYXJjaDogdGhpcy5saXZlU2VhcmNoLFxuICAgICAgbXVsdGlwbGU6IHRoaXMubXVsdGlwbGUsXG4gICAgICBtYXhPcHRpb25zOiB0aGlzLm1heE9wdGlvbnMsXG4gICAgICBtYXhPcHRpb25zVGV4dDogdGhpcy5tYXhPcHRpb25zVGV4dCxcbiAgICAgIHNlbGVjdGVkVGV4dEZvcm1hdDogdGhpcy5zZWxlY3RlZFRleHRGb3JtYXQsXG4gICAgICBzaG93VGljazogdGhpcy5zaG93VGljayxcbiAgICAgIGNvdW50U2VsZWN0ZWRUZXh0OiB0aGlzLmNvdW50U2VsZWN0ZWRUZXh0LFxuICAgICAgYWN0aW9uc0JveDogdGhpcy5hY3Rpb25zQm94LFxuICAgICAgaGVhZGVyOiB0aGlzLmhlYWRlcixcbiAgICAgIGRyb3B1cEF1dG86IHRoaXMuZHJvcHVwQXV0byxcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3RDb25maWdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNlbGVjdENvbmZpZ3MsIGRlZmF1bHRDb25maWdzKTtcbiAgICB0aGlzLnNldFNlbGVjdENvbmZpZ3NPdmVycmlkZXMoKTtcbiAgfVxuXG4gIHNldFNlbGVjdENvbmZpZ3NPdmVycmlkZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RDb25maWdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNlbGVjdENvbmZpZ3MsIHRoaXMuY29uZmlncyk7XG4gIH1cblxuICBkaXNhYmxlU2VsZWN0V2hlbk9wdGlvbnNBcmVFbXB0eSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3QgIT09IHVuZGVmaW5lZCAmJiBpc051bGwodGhpcy5vcHRpb25zKSkge1xuICAgICAgdGhpcy5zZWxlY3QucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgIHRoaXMucmVmcmVzaFNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZU9yRGlzYWJsZVNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkID09PSB1bmRlZmluZWQpIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3QucHJvcCgnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzVG9TZWxlY3QoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Qub24oJ2NoYW5nZScsIHRoaXMuc2VsZWN0LCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zZWxlY3QudmFsKCk7XG4gICAgICB0aGlzLm9uU2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuZmlsbE1vZGVsKHZhbHVlKTtcbiAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgdGhpcy5jaGFuZ2UoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3QucGFyZW50KCkub24oJ3Nob3duLmJzLmRyb3Bkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLm9uU2hvd24gPSB0cnVlO1xuXG4gICAgICBpZiAoaXNOdWxsKHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKSkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hvd25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2VsZWN0LnBhcmVudCgpLm9uKCdoaWRkZW4uYnMuc2VsZWN0JywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLm9uU2hvd24gPSBmYWxzZTtcblxuICAgICAgaWYgKGlzTnVsbCh0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSkpKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGRlbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgdGhpcy5zZXRPblZhbGlkYXRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50c0FmdGVyVmFsaWRhdGVGaWVsZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vblNob3duID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5hZGRPclJlbW92ZVZhbGlkYXRpb25DbGFzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQXV0b0Nsb3NlQ2xhc3MoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QucGFyZW50KCkuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5hZGRDbGFzcygnanMtYXV0by1jbG9zZScpO1xuICB9XG5cbiAgYWRkT3JSZW1vdmVWYWxpZGF0aW9uQ2xhc3NlcygpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gdGhpcy5zZWxlY3QuY2xvc2VzdCgnLmlucHV0LWdyb3VwJyk7XG4gICAgY29uc3Qgc2VsZWN0QnV0dG9uID0gdGhpcy5zZWxlY3QucGFyZW50KCkuZmluZCgnYnV0dG9uLmZvcm0tY29udHJvbCcpO1xuXG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgIGlucHV0R3JvdXAuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIHNlbGVjdEJ1dHRvbi5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dEdyb3VwLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgICBzZWxlY3RCdXR0b24ucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcblxuICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0T25WYWxpZCAmJiB0aGlzLnRvdWNoZWQpIHtcbiAgICAgICAgaW5wdXRHcm91cC5hZGRDbGFzcygnaXMtdmFsaWQnKTtcbiAgICAgICAgc2VsZWN0QnV0dG9uLmFkZENsYXNzKCdpcy12YWxpZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0T25WYWxpZCB8fCAhdGhpcy50b3VjaGVkKSB7XG4gICAgICAgIGlucHV0R3JvdXAucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJyk7XG4gICAgICAgIHNlbGVjdEJ1dHRvbi5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWZyZXNoU2VsZWN0ZWRPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkT3B0aW9ucyA9IHRoaXMubW9kZWwuZ2V0VmFsdWUodGhpcy5uYW1lKSB8fCBbXTtcbiAgICAgIGN1cnJlbnRTZWxlY3RlZE9wdGlvbnMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPCB0aGlzLm1heE9wdGlvbnMpIHtcbiAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmZpbGxNb2RlbChzZWxlY3RlZE9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRTZWxlY3RlZE9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Quc2VsZWN0cGlja2VyKCd2YWwnLCB0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSkpO1xuICB9XG5cbiAgaGlkZVNlbGVjdEFsbEJ1dHRvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0XG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmZpbmQoJy5icy1hY3Rpb25zYm94ID4gLmJ0bi1ncm91cCA+IC5icy1zZWxlY3QtYWxsJylcbiAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoU2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3Quc2VsZWN0cGlja2VyKCdyZWZyZXNoJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWJ1aWxkU2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3Quc2VsZWN0cGlja2VyKCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuaW5pdFNlbGVjdCgpO1xuICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlVmFsaWRhdGlvbkNsYXNzZXMoKTtcbiAgICAgICAgdGhpcy5pbml0U2VsZWN0ZWRPcHRpb25zKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRPblZhbGlkYXRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5vblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVsLmdldFN1Ym1pdHRlZCgpKSB7XG4gICAgICB0aGlzLnNldE9uVmFsaWRhdGVkKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRPclJlbW92ZVZhbGlkYXRpb25DbGFzc2VzKCk7XG4gIH1cbn1cbiJdfQ==