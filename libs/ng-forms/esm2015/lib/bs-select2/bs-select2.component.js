import { Component, HostBinding, ViewChild, ElementRef, Input, Output, ViewEncapsulation, EventEmitter, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { isNull } from '../common/utils';
export class BsSelect2Component extends DataInputBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvRGF0b3MgTWF1cm8vRG9jdW1lbnRvcy9EZXNhcnJvbGxvcyBXZWIvQW5ndWxhciBsaWJzL2FuZ3VsYXItYnMtZm9ybS1jb21wb25lbnRzL3Byb2plY3RzL25nLWZvcm1zL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9icy1zZWxlY3QyL2JzLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUVYLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwRXpDLE1BQU0sT0FBTyxrQkFDWCxTQUFRLGFBQWE7SUF6RXZCOztRQTJFd0IsVUFBSyxHQUFHLHVCQUF1QixDQUFDO1FBTzdDLFlBQU8sR0FBMkIsRUFBRSxDQUFDO1FBRXJDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixRQUFHLEdBQVcsS0FBSyxDQUFDO1FBQ3BCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUMvQiwyQkFBc0IsR0FBVyxDQUFDLENBQUM7UUFDbkMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBQy9CLDRCQUF1QixHQUFXLENBQUMsQ0FBQztRQUNwQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIs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TCxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSztnQ0FDTCxLQUFLOzBCQUVMLE1BQU07eUJBQ04sTUFBTTt5QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRXZlbnRFbWl0dGVyLFxuICBEb0NoZWNrLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFJbnB1dEJhc2UgfSBmcm9tICcuLi9jb21tb24vY2xhc3Nlcy9kYXRhLWlucHV0LWJhc2UnO1xuaW1wb3J0IHsgU2VsZWN0T3B0aW9uLCBTZWxlY3RPcHRpb25Hcm91cCB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBpc051bGwgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1zZWxlY3QyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiIGF0dHIuZm9yPVwie3sgaWQgfX0tYnNcIj57e1xuICAgICAgbGFiZWxcbiAgICB9fTwvbGFiZWw+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cCB7eyBpbnB1dFNpemUgfX1cIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAnaXMtaW52YWxpZCc6IGVycm9yLFxuICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhcnRTbG90XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPnt7IHN0YXJ0U2xvdCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cInN0YXJ0U2xvdEh0bWxcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgW2lubmVySFRNTF09XCJzdGFydFNsb3RIdG1sXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgI3NlbGVjdDJFbGVtZW50UmVmXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzZWxlY3QyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdoYXMtcHJlcGVuZCc6IHN0YXJ0U2xvdCB8fCBzdGFydFNsb3RIdG1sLFxuICAgICAgICAgICdoYXMtYXBwZW5kJzogZW5kU2xvdCB8fCBlbmRTbG90SHRtbCxcbiAgICAgICAgICAnaXMtaW52YWxpZCc6IGVycm9yLFxuICAgICAgICAgICdpcy12YWxpZCc6IHRvdWNoZWQgJiYgaGlnaGxpZ2h0T25WYWxpZCAmJiAhZXJyb3JcbiAgICAgICAgfVwiXG4gICAgICAgIGlkPVwie3sgaWQgfX0tYnNcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uICpuZ0lmPVwicGxhY2Vob2xkZXIgJiYgIW11bHRpcGxlXCI+PC9vcHRpb24+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCI+XG4gICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgKm5nSWY9XCJvcHRpb24uZ3JvdXAgPT09IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2F0dHIuc2VsZWN0ZWRdPVwib3B0aW9uLnNlbGVjdGVkXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IG9wdGlvbi52aWV3VmFsdWUgfX1cbiAgICAgICAgICA8L29wdGlvbj5cblxuICAgICAgICAgIDxvcHRncm91cCAqbmdJZj1cIm9wdGlvbi5ncm91cCAhPT0gdW5kZWZpbmVkXCIgW2xhYmVsXT1cIm9wdGlvbi5ncm91cFwiPlxuICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbi5ncm91cFZhbHVlc1wiXG4gICAgICAgICAgICAgIFthdHRyLmRpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cIm9wdGlvbi5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBvcHRpb24udmlld1ZhbHVlIH19XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc2VsZWN0PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiZW5kU2xvdFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPnt7IGVuZFNsb3QgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJlbmRTbG90SHRtbFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIFtpbm5lckhUTUxdPVwiZW5kU2xvdEh0bWxcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c21hbGwgKm5nSWY9XCJoZWxwXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAge3sgaGVscCB9fVxuICAgIDwvc21hbGw+XG4gICAgPGRpdiAqbmdJZj1cImVycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYnMtc2VsZWN0Mi5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEJzU2VsZWN0MkNvbXBvbmVudFxuICBleHRlbmRzIERhdGFJbnB1dEJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBEb0NoZWNrIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzID0gJ25nLXNlbGVjdDIgZm9ybS1ncm91cCc7XG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdDJFbGVtZW50UmVmJywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIHNlbGVjdDJFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxpdmVTZWFyY2g6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PFNlbGVjdE9wdGlvbj4gfCBBcnJheTxTZWxlY3RPcHRpb25Hcm91cD47XG4gIEBJbnB1dCgpIGNvbmZpZ3M6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgQElucHV0KCkgbm9SZXN1bHRzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFsbG93Q2xlYXI6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZGF0YTogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGlyOiBzdHJpbmcgPSAnbHRyJztcbiAgQElucHV0KCkgZHJvcGRvd25BdXRvV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZHJvcGRvd25Dc3NDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBsYW5ndWFnZTogc3RyaW5nID0gJ2VuJztcbiAgQElucHV0KCkgbWF4aW11bUlucHV0TGVuZ3RoOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtaW5pbXVtSW5wdXRMZW5ndGg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3Rpb25Dc3NDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3RPbkNsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRhZ3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZyA9ICdyZXNvbHZlJztcbiAgQElucHV0KCkgc2Nyb2xsQWZ0ZXJTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2xlYXJFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbG9zZUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHNlbGVjdDI6IGFueTtcbiAgcHJpdmF0ZSB2YWxpZGF0ZSA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdDJDb25maWdzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSB3YXRjaGVkUHJvcGVydGllcyA9IFtcbiAgICAndGhlbWUnLFxuICAgICdsaXZlU2VhcmNoJyxcbiAgICAnb3B0aW9ucycsXG4gICAgJ2NvbmZpZ3MnLFxuICAgICdjb25maWdzJyxcbiAgICAnbm9SZXN1bHRzJyxcbiAgICAnYWxsb3dDbGVhcicsXG4gICAgJ2Nsb3NlT25TZWxlY3QnLFxuICAgICdkYXRhJyxcbiAgICAnZGVidWcnLFxuICAgICdkaXInLFxuICAgICdkcm9wZG93bkF1dG9XaWR0aCcsXG4gICAgJ2Ryb3Bkb3duQ3NzQ2xhc3MnLFxuICAgICdsYW5ndWFnZScsXG4gICAgJ21heGltdW1JbnB1dExlbmd0aCcsXG4gICAgJ21heGltdW1TZWxlY3Rpb25MZW5ndGgnLFxuICAgICdtaW5pbXVtSW5wdXRMZW5ndGgnLFxuICAgICdtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCcsXG4gICAgJ211bHRpcGxlJyxcbiAgICAncGxhY2Vob2xkZXInLFxuICAgICdzZWxlY3Rpb25Dc3NDbGFzcycsXG4gICAgJ3NlbGVjdE9uQ2xvc2UnLFxuICAgICd0YWdzJyxcbiAgICAnd2lkdGgnLFxuICAgICdzY3JvbGxBZnRlclNlbGVjdCcsXG4gIF07XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdEpRdWVyeUVsKCk7XG4gICAgdGhpcy5pbml0U2VsZWN0MigpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMud2F0Y2hNb2RlbCgpO1xuICB9XG5cbiAgYmluZFdhdGNoTW9kZWxFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0U2VsZWN0ZWRPcHRpb25zKCk7XG4gIH1cblxuICBkZXRlY3RQcm9wZXJ0aWVzQ2hhbmdlcyhwcm9wTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHByb3BOYW1lID09PSAnZGlzYWJsZWQnKSB0aGlzLmVuYWJsZU9yRGlzYWJsZVNlbGVjdDIoKTtcbiAgICBpZiAodGhpcy53YXRjaGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BOYW1lKSA+IC0xKSB0aGlzLnJlZnJlc2hTZWxlY3QyKCk7XG4gIH1cblxuICBpbml0SlF1ZXJ5RWwoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QyID0gJCh0aGlzLnNlbGVjdDJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgaW5pdFNlbGVjdDIoKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZFNlbGVjdDJDb25maWdzKCk7XG4gICAgdGhpcy5zZWxlY3QyLnNlbGVjdDIodGhpcy5zZWxlY3QyQ29uZmlncyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzVG9TZWxlY3QyKCk7XG4gICAgdGhpcy5lbmFibGVPckRpc2FibGVTZWxlY3QyKCk7XG4gICAgdGhpcy5kaXNhYmxlU2VsZWN0MldoZW5PcHRpb25zQXJlRW1wdHkoKTtcbiAgfVxuXG4gIGJpbmRFdmVudHNUb1NlbGVjdDIoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QyLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zZWxlY3QyLnNlbGVjdDIoJ3ZhbCcpO1xuICAgICAgdGhpcy5maWxsTW9kZWwodmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlRmllbGQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoYW5nZShldmVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdDIub24oJ3NlbGVjdDI6c2VsZWN0JywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEV2ZW50LmVtaXQoZXZlbnQucGFyYW1zLmRhdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3QyLm9uKCdzZWxlY3QyOmNsZWFyJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmZpbGxNb2RlbChudWxsKTtcbiAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgdGhpcy5jbGVhckV2ZW50LmVtaXQoZXZlbnQucGFyYW1zLmRhdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3QyLm9uKCdzZWxlY3QyOmNsb3NlJywgKGV2ZW50KSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIEVxdWl2YWxlbnQgdG8gYSB2YWxpZGF0ZSBvbiBmb2N1c291dFxuICAgICAgICovXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGlzTnVsbCh0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSkpKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG4gICAgICAgICAgdGhpcy5jbG9zZUV2ZW50LmVtaXQoZXZlbnQucGFyYW1zLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRFdmVudHNBZnRlclZhbGlkYXRlRmllbGQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRPclJlbW92ZVZhbGlkYXRpb25DbGFzc2VzKCk7XG4gIH1cblxuICBidWlsZFNlbGVjdDJDb25maWdzKCk6IHZvaWQge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWdzID0ge1xuICAgICAgdGhlbWU6IHRoaXMudGhlbWUsXG4gICAgICBhbGxvd0NsZWFyOiB0aGlzLmFsbG93Q2xlYXIsXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0aGlzLmNsb3NlT25TZWxlY3QsXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBkZWJ1ZzogdGhpcy5kZWJ1ZyxcbiAgICAgIGRpcjogdGhpcy5kaXIsXG4gICAgICBkcm9wZG93bkF1dG9XaWR0aDogdGhpcy5kcm9wZG93bkF1dG9XaWR0aCxcbiAgICAgIGRyb3Bkb3duQ3NzQ2xhc3M6IHRoaXMuZHJvcGRvd25Dc3NDbGFzcyxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgbWF4aW11bUlucHV0TGVuZ3RoOiB0aGlzLm1heGltdW1JbnB1dExlbmd0aCxcbiAgICAgIG1heGltdW1TZWxlY3Rpb25MZW5ndGg6IHRoaXMubWF4aW11bVNlbGVjdGlvbkxlbmd0aCxcbiAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogdGhpcy5taW5pbXVtSW5wdXRMZW5ndGgsXG4gICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogdGhpcy5nZXRNaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCgpLFxuICAgICAgbXVsdGlwbGU6IHRoaXMubXVsdGlwbGUsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgIHNlbGVjdGlvbkNzc0NsYXNzOiB0aGlzLnNlbGVjdGlvbkNzc0NsYXNzLFxuICAgICAgc2VsZWN0T25DbG9zZTogdGhpcy5zZWxlY3RPbkNsb3NlLFxuICAgICAgdGFnczogdGhpcy50YWdzLFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBzY3JvbGxBZnRlclNlbGVjdDogdGhpcy5zY3JvbGxBZnRlclNlbGVjdCxcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3QyQ29uZmlncyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZ3MsIHRoaXMuY29uZmlncyk7XG4gICAgdGhpcy5zZXRTZWxlY3QyQ29uZmlnc092ZXJyaWRlcygpO1xuICB9XG5cbiAgZ2V0TWluaW11bVJlc3VsdHNGb3JTZWFyY2goKSB7XG4gICAgaWYgKHRoaXMubGl2ZVNlYXJjaCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saXZlU2VhcmNoID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaDtcbiAgfVxuXG4gIHNldFNlbGVjdDJDb25maWdzT3ZlcnJpZGVzKCk6IHZvaWQge1xuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlc1xuICAgICAqXG4gICAgICogLSBhbGxvd0NsZWFyIGlzIG5vdCB1c2VkIGluIG11bHRpcGxlIHNlbGVjdFxuICAgICAqL1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNlbGVjdDJDb25maWdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNlbGVjdDJDb25maWdzLCB7XG4gICAgICAgIGFsbG93Q2xlYXI6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3QyQ29uZmlncyA9IE9iamVjdC5hc3NpZ24odGhpcy5zZWxlY3QyQ29uZmlncywgdGhpcy5jb25maWdzKTtcbiAgfVxuXG4gIGFkZE9yUmVtb3ZlVmFsaWRhdGlvbkNsYXNzZXMoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIEZvciBhIGN1c3RvbSBib290c3RyYXAgdGhlbWUsIG1ha2UgdGhlIGJvcmRlci1jb2xvciBwcm9wZXJ0eSBpbXBvcnRhbnQgaW5zaWRlIHRoaXNcbiAgICAgICAqIHN0eWxlIGxpbmUgb2YgY3NzIGNsYXNzZXMgb24geW91ciBib290c3RyYXAgY3VzdG9tIG1haW4gdGhlbWUgc3R5bGVzaGVldCxcbiAgICAgICAqIHRvIHNob3cgdGhlIGludmFsaWQgYm9yZGVyIGNvbG9yIG9uIHNlbGVjdDIgY29tcG9uZW50XG4gICAgICAgKlxuICAgICAgICogLndhcy12YWxpZGF0ZWQgLmN1c3RvbS1zZWxlY3Q6aW52YWxpZCwgLmN1c3RvbS1zZWxlY3QuaXMtaW52YWxpZCB7XG4gICAgICAgKiAgIGJvcmRlci1jb2xvcjogI3lvdXItY29sb3IgIWltcG9ydGFudDtcbiAgICAgICAqIH1cbiAgICAgICAqL1xuXG4gICAgICBjb25zdCBzZWxlY3QyU2VsZWN0aW9uID0gJCh0aGlzLnNlbGVjdDIuZGF0YSgnc2VsZWN0MicpLiRjb250YWluZXIpLmZpbmQoXG4gICAgICAgICcuc2VsZWN0Mi1zZWxlY3Rpb24nLFxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgICAgc2VsZWN0MlNlbGVjdGlvbi5hZGRDbGFzcygnY3VzdG9tLXNlbGVjdCcpO1xuICAgICAgICBzZWxlY3QyU2VsZWN0aW9uLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3QyU2VsZWN0aW9uLnJlbW92ZUNsYXNzKCdjdXN0b20tc2VsZWN0Jyk7XG4gICAgICAgIHNlbGVjdDJTZWxlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcblxuICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRPblZhbGlkICYmIHRoaXMudG91Y2hlZCkge1xuICAgICAgICAgIHNlbGVjdDJTZWxlY3Rpb24uYWRkQ2xhc3MoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICAgIHNlbGVjdDJTZWxlY3Rpb24uYWRkQ2xhc3MoJ2lzLXZhbGlkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0T25WYWxpZCB8fCAhdGhpcy50b3VjaGVkKSB7XG4gICAgICAgICAgc2VsZWN0MlNlbGVjdGlvbi5yZW1vdmVDbGFzcygnZm9ybS1jb250cm9sJyk7XG4gICAgICAgICAgc2VsZWN0MlNlbGVjdGlvbi5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdFNlbGVjdGVkT3B0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0Mi52YWwoc2VsZWN0ZWRPcHRpb25zKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgfVxuXG4gIGRpc2FibGVTZWxlY3QyV2hlbk9wdGlvbnNBcmVFbXB0eSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3QyICE9PSB1bmRlZmluZWQgJiYgaXNOdWxsKHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMuc2VsZWN0Mi5zZWxlY3QyKCdlbmFibGUnLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlT3JEaXNhYmxlU2VsZWN0MigpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdDIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0Mi5zZWxlY3QyKCdlbmFibGUnLCBbIXRoaXMuZGlzYWJsZWRdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hTZWxlY3QyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdDIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkRm9ybUNvbnRyb2xDbGFzcygpO1xuICAgICAgICB0aGlzLmFkZEZvcm1Db250cm9sQ2xhc3NEZWxheWVkKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdDJXaGVuT3B0aW9uc0FyZUVtcHR5KCk7XG4gICAgICAgIHRoaXMuYWRkT3JSZW1vdmVWYWxpZGF0aW9uQ2xhc3NlcygpO1xuICAgICAgICB0aGlzLmJ1aWxkU2VsZWN0MkNvbmZpZ3MoKTtcbiAgICAgICAgdGhpcy5zZWxlY3QyLnNlbGVjdDIodGhpcy5zZWxlY3QyQ29uZmlncyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRGb3JtQ29udHJvbENsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdDJDb250YWluZXIgPSAkKHRoaXMuc2VsZWN0Mi5kYXRhKCdzZWxlY3QyJykuJGNvbnRhaW5lcik7XG4gICAgc2VsZWN0MkNvbnRhaW5lci5hZGRDbGFzcygnZm9ybS1jb250cm9sJyk7XG4gIH1cblxuICBhZGRGb3JtQ29udHJvbENsYXNzRGVsYXllZCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdDJDb250YWluZXIgPSAkKHRoaXMuc2VsZWN0Mi5kYXRhKCdzZWxlY3QyJykuJGNvbnRhaW5lcik7XG4gICAgICBzZWxlY3QyQ29udGFpbmVyLmFkZENsYXNzKCdmb3JtLWNvbnRyb2wnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2goKTogdm9pZCB7XG4gICAgdGhpcy5hZGRGb3JtQ29udHJvbENsYXNzKCk7XG4gICAgdGhpcy5hZGRPclJlbW92ZVZhbGlkYXRpb25DbGFzc2VzKCk7XG4gICAgdGhpcy5pbml0U2VsZWN0ZWRPcHRpb25zKCk7XG4gIH1cbn1cbiJdfQ==