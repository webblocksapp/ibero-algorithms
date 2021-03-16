import { Component, ElementRef, HostBinding, Input, Output, ViewChild, ViewEncapsulation, EventEmitter, } from '@angular/core';
import { DataInputBase } from '../common/classes/data-input-base';
import { isNull } from '../common/utils';
export class BsDatepickerComponent extends DataInputBase {
    constructor() {
        super(...arguments);
        this.class = 'ng-datepicker form-group';
        this.configs = {};
        this.autoclose = true;
        this.calendarWeeks = false;
        this.clearBtn = false;
        this.defaultViewDate = 'day';
        this.disableTouchKeyboard = false;
        this.enableOnReadonly = true;
        this.forceParse = true;
        this.format = 'yyyy-mm-dd';
        this.immediateUpdates = false;
        this.keyboardNavigation = true;
        this.maxViewMode = 'centuries';
        this.minViewMode = 'days';
        this.multidate = false;
        this.multidateSeparator = ', ';
        this.orientation = 'auto';
        this.showOnFocus = true;
        this.startView = 'days';
        this.showWeekDays = true;
        this.todayBtn = false;
        this.todayHighlight = false;
        this.weekStart = 0;
        this.zIndexOffset = 10;
        this.utc = false;
        this.autocomplete = false;
        this.showEvent = new EventEmitter();
        this.hideEvent = new EventEmitter();
        this.clearDateEvent = new EventEmitter();
        this.changeDateEvent = new EventEmitter();
        this.changeMonthEvent = new EventEmitter();
        this.changeYearEvent = new EventEmitter();
        this.changeDecadeEvent = new EventEmitter();
        this.changeCenturyEvent = new EventEmitter();
        this.datepickerConfigs = {};
        this.watchedProperties = [
            'configs',
            'autoclose',
            'calendarWeeks',
            'clearBtn',
            'datesDisabled',
            'daysOfWeekDisabled',
            'daysOfWeekHighlighted',
            'defaultViewDate',
            'disableTouchKeyboard',
            'enableOnReadonly',
            'endDate',
            'forceParse',
            'format',
            'immediateUpdates',
            'keyboardNavigation',
            'maxViewMode',
            'minViewMode',
            'multidate',
            'multidateSeparator',
            'orientation',
            'showOnFocus',
            'startDate',
            'startView',
            'showWeekDays',
            'title',
            'todayBtn',
            'todayHighlight',
            'weekStart',
            'zIndexOffset',
            'utc',
            'autocomplete',
        ];
    }
    setConfigsOnInit() {
        this.hostId = this.id + '-host';
    }
    ngAfterViewInit() {
        this.initJQueryEl();
        this.initDatepicker();
    }
    bindFocusoutEvents(event) {
        const value = this.getValue();
        this.fillModel(value);
        setTimeout(() => {
            if (!isNull(value)) {
                this.validateField();
            }
        }, 100);
        return event;
    }
    detectPropertiesChanges(propName) {
        if (this.datepicker !== undefined) {
            if (this.watchedProperties.indexOf(propName) > -1)
                this.refreshDatepicker();
        }
    }
    ngDoCheck() {
        this.watchModel();
    }
    bindWatchModelEvents() {
        this.initSelectedDate();
    }
    initSelectedDate() {
        this.setValue();
    }
    initJQueryEl() {
        this.datepicker = $(this.inputElementRef.nativeElement);
    }
    initDatepicker() {
        this.buildDatepickerConfigs();
        this.datepicker.datepicker(this.datepickerConfigs);
        this.bindEventsToDatepicker();
    }
    buildDatepickerConfigs() {
        const defaultConfigs = {
            autoclose: this.autoclose,
            container: '#' + this.hostId,
            calendarWeeks: this.calendarWeeks,
            clearBtn: this.clearBtn,
            defaultViewDate: this.defaultViewDate,
            disableTouchKeyboard: this.disableTouchKeyboard,
            datesDisabled: this.datesDisabled,
            daysOfWeekDisabled: this.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.daysOfWeekHighlighted,
            enableOnReadonly: this.enableOnReadonly,
            endDate: this.endDate,
            forceParse: this.forceParse,
            format: this.format,
            immediateUpdates: this.immediateUpdates,
            keyboardNavigation: this.keyboardNavigation,
            maxViewMode: this.maxViewMode,
            minViewMode: this.minViewMode,
            multidate: this.multidate,
            multidateSeparator: this.multidateSeparator,
            orientation: this.orientation,
            showOnFocus: this.showOnFocus,
            startDate: this.startDate,
            startView: this.startView,
            showWeekDays: this.showWeekDays,
            title: this.title,
            todayBtn: this.todayBtn,
            todayHighlight: this.todayHighlight,
            weekStart: this.weekStart,
            zIndexOffset: this.zIndexOffset,
        };
        this.datepickerConfigs = Object.assign(this.datepickerConfigs, defaultConfigs);
        this.setDatepickerConfigsOverrides();
    }
    setDatepickerConfigsOverrides() {
        this.datepickerConfigs = Object.assign(this.datepickerConfigs, this.configs);
    }
    bindEventsToDatepicker() {
        this.datepicker.on('show', (event) => {
            this.showEvent.emit(event);
        });
        this.datepicker.on('hide', (event) => {
            const value = this.getValue();
            if (isNull(value)) {
                this.validateField();
            }
            this.hideEvent.emit(event);
        });
        this.datepicker.on('clearDate', (event) => {
            this.clearDateEvent.emit(event);
        });
        this.datepicker.on('changeDate', (event) => {
            const value = this.getValue();
            this.fillModel(value);
            this.validateField();
            this.changeDateEvent.emit(event);
        });
        this.datepicker.on('changeMonth', (event) => {
            this.changeMonthEvent.emit(event);
        });
        this.datepicker.on('changeYear', (event) => {
            this.changeYearEvent.emit(event);
        });
        this.datepicker.on('changeDecade', (event) => {
            this.changeDecadeEvent.emit(event);
        });
        this.datepicker.on('changeCentury', (event) => {
            this.changeCenturyEvent.emit(event);
        });
        /**
         * Disables autocomplete
         */
        if (this.autocomplete === false) {
            this.datepicker.attr('autocomplete', 'off');
        }
    }
    getValue() {
        if (this.multidate === true) {
            return this.getDates();
        }
        return this.getDate();
    }
    setValue() {
        const value = this.model.getValue(this.name);
        if (value !== undefined) {
            if (this.multidate === true) {
                this.setDates(value);
            }
            this.setDate(value);
        }
    }
    setDate(value) {
        if (this.utc === true) {
            this.datepicker.datepicker('setUTCDate', value);
        }
        this.datepicker.datepicker('setDate', value);
    }
    setDates(value) {
        if (this.utc === true) {
            this.datepicker.datepicker('setUTCDates', value);
        }
        this.datepicker.datepicker('setDates', value);
    }
    getDate() {
        if (this.utc === true) {
            return this.datepicker.datepicker('getUTCDate');
        }
        return this.datepicker.datepicker('getDate');
    }
    getDates() {
        if (this.utc === true) {
            return this.datepicker.datepicker('getUTCDates');
        }
        return this.datepicker.datepicker('getDates');
    }
    refreshDatepicker() {
        this.datepicker.datepicker('destroy');
        this.initDatepicker();
        this.datepicker.datepicker('update', this.value);
    }
    refresh() {
        this.datepicker.datepicker('update', this.value);
    }
}
BsDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs-datepicker',
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
        #inputElementRef
        [attr.name]="name"
        [attr.value]="value"
        [attr.placeholder]="placeholder"
        [attr.disabled]="disabled"
        [attr.readonly]="readonly"
        class="form-control"
        [ngClass]="{
          'is-invalid': error,
          'is-valid': touched && highlightOnValid && !error
        }"
        id="{{ id }}-bs"
        (focusout)="focusout($event)"
      />

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
    <div *ngIf="error" class="invalid-feedback">{{ error }}</div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .ng-datepicker {
        position: relative;
      }

      .ng-datepicker.form-group {
        display: block;
      }

      .ng-datepicker .datepicker td {
        padding: 5px;
      }

      .ng-datepicker .datepicker.dropdown-menu {
        font-size: 14px;
      }
    `]
            },] }
];
BsDatepickerComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    hostId: [{ type: HostBinding, args: ['id',] }],
    inputElementRef: [{ type: ViewChild, args: ['inputElementRef', { read: ElementRef },] }],
    configs: [{ type: Input }],
    autoclose: [{ type: Input }],
    calendarWeeks: [{ type: Input }],
    clearBtn: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    daysOfWeekDisabled: [{ type: Input }],
    daysOfWeekHighlighted: [{ type: Input }],
    defaultViewDate: [{ type: Input }],
    disableTouchKeyboard: [{ type: Input }],
    enableOnReadonly: [{ type: Input }],
    endDate: [{ type: Input }],
    forceParse: [{ type: Input }],
    format: [{ type: Input }],
    immediateUpdates: [{ type: Input }],
    keyboardNavigation: [{ type: Input }],
    maxViewMode: [{ type: Input }],
    minViewMode: [{ type: Input }],
    multidate: [{ type: Input }],
    multidateSeparator: [{ type: Input }],
    orientation: [{ type: Input }],
    showOnFocus: [{ type: Input }],
    startDate: [{ type: Input }],
    startView: [{ type: Input }],
    showWeekDays: [{ type: Input }],
    title: [{ type: Input }],
    todayBtn: [{ type: Input }],
    todayHighlight: [{ type: Input }],
    weekStart: [{ type: Input }],
    zIndexOffset: [{ type: Input }],
    utc: [{ type: Input }],
    autocomplete: [{ type: Input }],
    showEvent: [{ type: Output }],
    hideEvent: [{ type: Output }],
    clearDateEvent: [{ type: Output }],
    changeDateEvent: [{ type: Output }],
    changeMonthEvent: [{ type: Output }],
    changeYearEvent: [{ type: Output }],
    changeDecadeEvent: [{ type: Output }],
    changeCenturyEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvRGF0b3MgTWF1cm8vRG9jdW1lbnRvcy9EZXNhcnJvbGxvcyBXZWIvQW5ndWxhciBsaWJzL2FuZ3VsYXItYnMtZm9ybS1jb21wb25lbnRzL3Byb2plY3RzL25nLWZvcm1zL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9icy1kYXRlcGlja2VyL2JzLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF1RXpDLE1BQU0sT0FBTyxxQkFDWCxTQUFRLGFBQWE7SUFyRXZCOztRQXVFd0IsVUFBSyxHQUFHLDBCQUEwQixDQUFDO1FBTWhELFlBQU8sR0FBOEIsRUFBRSxDQUFDO1FBQ3hDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUkxQixvQkFBZSxHQUFXLEtBQUssQ0FBQztRQUNoQyx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFDdEMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsV0FBTSxHQUFXLFlBQVksQ0FBQztRQUM5QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBQ25DLGdCQUFXLEdBQVcsV0FBVyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVcsTUFBTSxDQUFDO1FBQzdCLGNBQVMsR0FBcUIsS0FBSyxD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Ozs7Ozs7Ozs7O0tBZ0JDO2FBRUo7OztvQkFJRSxXQUFXLFNBQUMsT0FBTztxQkFDbkIsV0FBVyxTQUFDLElBQUk7OEJBRWhCLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7c0JBR2pELEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztpQ0FDTCxLQUFLO29DQUNMLEtBQUs7OEJBQ0wsS0FBSzttQ0FDTCxLQUFLOytCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLO2lDQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSztrQkFDTCxLQUFLOzJCQUNMLEtBQUs7d0JBRUwsTUFBTTt3QkFDTixNQUFNOzZCQUNOLE1BQU07OEJBQ04sTUFBTTsrQkFDTixNQUFNOzhCQUNOLE1BQU07Z0NBQ04sTUFBTTtpQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRXZlbnRFbWl0dGVyLFxuICBEb0NoZWNrLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFJbnB1dEJhc2UgfSBmcm9tICcuLi9jb21tb24vY2xhc3Nlcy9kYXRhLWlucHV0LWJhc2UnO1xuaW1wb3J0IHsgaXNOdWxsIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCBjbG9uZSBmcm9tICcuLi9jb21tb24vdXRpbHMvY2xvbmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiIGF0dHIuZm9yPVwie3sgaWQgfX0tYnNcIj57e1xuICAgICAgbGFiZWxcbiAgICB9fTwvbGFiZWw+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cCB7eyBpbnB1dFNpemUgfX1cIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAnaXMtaW52YWxpZCc6IGVycm9yLFxuICAgICAgICAnaXMtdmFsaWQnOiB0b3VjaGVkICYmIGhpZ2hsaWdodE9uVmFsaWQgJiYgIWVycm9yXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhcnRTbG90XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPnt7IHN0YXJ0U2xvdCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cInN0YXJ0U2xvdEh0bWxcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgW2lubmVySFRNTF09XCJzdGFydFNsb3RIdG1sXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8aW5wdXRcbiAgICAgICAgI2lucHV0RWxlbWVudFJlZlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdpcy1pbnZhbGlkJzogZXJyb3IsXG4gICAgICAgICAgJ2lzLXZhbGlkJzogdG91Y2hlZCAmJiBoaWdobGlnaHRPblZhbGlkICYmICFlcnJvclxuICAgICAgICB9XCJcbiAgICAgICAgaWQ9XCJ7eyBpZCB9fS1ic1wiXG4gICAgICAgIChmb2N1c291dCk9XCJmb2N1c291dCgkZXZlbnQpXCJcbiAgICAgIC8+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJlbmRTbG90XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgZW5kU2xvdCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImVuZFNsb3RIdG1sXCIgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgZW5kU2xvdEh0bWwgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c21hbGwgKm5nSWY9XCJoZWxwXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAge3sgaGVscCB9fVxuICAgIDwvc21hbGw+XG4gICAgPGRpdiAqbmdJZj1cImVycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLm5nLWRhdGVwaWNrZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5uZy1kYXRlcGlja2VyLmZvcm0tZ3JvdXAge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgLm5nLWRhdGVwaWNrZXIgLmRhdGVwaWNrZXIgdGQge1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICB9XG5cbiAgICAgIC5uZy1kYXRlcGlja2VyIC5kYXRlcGlja2VyLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyQ29tcG9uZW50XG4gIGV4dGVuZHMgRGF0YUlucHV0QmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIERvQ2hlY2sge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3MgPSAnbmctZGF0ZXBpY2tlciBmb3JtLWdyb3VwJztcbiAgQEhvc3RCaW5kaW5nKCdpZCcpIGhvc3RJZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudFJlZicsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICBpbnB1dEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgY29uZmlnczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBASW5wdXQoKSBhdXRvY2xvc2U6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjYWxlbmRhcldlZWtzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNsZWFyQnRuOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGVzRGlzYWJsZWQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGRheXNPZldlZWtEaXNhYmxlZDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcbiAgQElucHV0KCkgZGF5c09mV2Vla0hpZ2hsaWdodGVkOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nO1xuICBASW5wdXQoKSBkZWZhdWx0Vmlld0RhdGU6IHN0cmluZyA9ICdkYXknO1xuICBASW5wdXQoKSBkaXNhYmxlVG91Y2hLZXlib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVPblJlYWRvbmx5OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5kRGF0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVBhcnNlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZm9ybWF0OiBzdHJpbmcgPSAneXl5eS1tbS1kZCc7XG4gIEBJbnB1dCgpIGltbWVkaWF0ZVVwZGF0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkga2V5Ym9hcmROYXZpZ2F0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF4Vmlld01vZGU6IHN0cmluZyA9ICdjZW50dXJpZXMnO1xuICBASW5wdXQoKSBtaW5WaWV3TW9kZTogc3RyaW5nID0gJ2RheXMnO1xuICBASW5wdXQoKSBtdWx0aWRhdGU6IGJvb2xlYW4gfCBudW1iZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgbXVsdGlkYXRlU2VwYXJhdG9yOiBzdHJpbmcgPSAnLCAnO1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ2F1dG8nO1xuICBASW5wdXQoKSBzaG93T25Gb2N1czogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBzdGFydFZpZXc6IHN0cmluZyA9ICdkYXlzJztcbiAgQElucHV0KCkgc2hvd1dlZWtEYXlzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgdG9kYXlCdG46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9kYXlIaWdobGlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgd2Vla1N0YXJ0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSB6SW5kZXhPZmZzZXQ6IG51bWJlciA9IDEwO1xuICBASW5wdXQoKSB1dGM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNob3dFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBoaWRlRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2xlYXJEYXRlRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2hhbmdlRGF0ZUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYW5nZU1vbnRoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2hhbmdlWWVhckV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYW5nZURlY2FkZUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYW5nZUNlbnR1cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBkYXRlcGlja2VyOiBhbnk7XG4gIHByaXZhdGUgZGF0ZXBpY2tlckNvbmZpZ3M6IGFueSA9IHt9O1xuICBwcml2YXRlIHdhdGNoZWRQcm9wZXJ0aWVzID0gW1xuICAgICdjb25maWdzJyxcbiAgICAnYXV0b2Nsb3NlJyxcbiAgICAnY2FsZW5kYXJXZWVrcycsXG4gICAgJ2NsZWFyQnRuJyxcbiAgICAnZGF0ZXNEaXNhYmxlZCcsXG4gICAgJ2RheXNPZldlZWtEaXNhYmxlZCcsXG4gICAgJ2RheXNPZldlZWtIaWdobGlnaHRlZCcsXG4gICAgJ2RlZmF1bHRWaWV3RGF0ZScsXG4gICAgJ2Rpc2FibGVUb3VjaEtleWJvYXJkJyxcbiAgICAnZW5hYmxlT25SZWFkb25seScsXG4gICAgJ2VuZERhdGUnLFxuICAgICdmb3JjZVBhcnNlJyxcbiAgICAnZm9ybWF0JyxcbiAgICAnaW1tZWRpYXRlVXBkYXRlcycsXG4gICAgJ2tleWJvYXJkTmF2aWdhdGlvbicsXG4gICAgJ21heFZpZXdNb2RlJyxcbiAgICAnbWluVmlld01vZGUnLFxuICAgICdtdWx0aWRhdGUnLFxuICAgICdtdWx0aWRhdGVTZXBhcmF0b3InLFxuICAgICdvcmllbnRhdGlvbicsXG4gICAgJ3Nob3dPbkZvY3VzJyxcbiAgICAnc3RhcnREYXRlJyxcbiAgICAnc3RhcnRWaWV3JyxcbiAgICAnc2hvd1dlZWtEYXlzJyxcbiAgICAndGl0bGUnLFxuICAgICd0b2RheUJ0bicsXG4gICAgJ3RvZGF5SGlnaGxpZ2h0JyxcbiAgICAnd2Vla1N0YXJ0JyxcbiAgICAnekluZGV4T2Zmc2V0JyxcbiAgICAndXRjJyxcbiAgICAnYXV0b2NvbXBsZXRlJyxcbiAgXTtcblxuICBzZXRDb25maWdzT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaG9zdElkID0gdGhpcy5pZCArICctaG9zdCc7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0SlF1ZXJ5RWwoKTtcbiAgICB0aGlzLmluaXREYXRlcGlja2VyKCk7XG4gIH1cblxuICBiaW5kRm9jdXNvdXRFdmVudHMoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgdGhpcy5maWxsTW9kZWwodmFsdWUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWlzTnVsbCh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcblxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGRldGVjdFByb3BlcnRpZXNDaGFuZ2VzKHByb3BOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRlcGlja2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLndhdGNoZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcE5hbWUpID4gLTEpXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGVwaWNrZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy53YXRjaE1vZGVsKCk7XG4gIH1cblxuICBiaW5kV2F0Y2hNb2RlbEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRTZWxlY3RlZERhdGUoKTtcbiAgfVxuXG4gIGluaXRTZWxlY3RlZERhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRWYWx1ZSgpO1xuICB9XG5cbiAgaW5pdEpRdWVyeUVsKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZXBpY2tlciA9ICQodGhpcy5pbnB1dEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBpbml0RGF0ZXBpY2tlcigpOiB2b2lkIHtcbiAgICB0aGlzLmJ1aWxkRGF0ZXBpY2tlckNvbmZpZ3MoKTtcbiAgICB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcih0aGlzLmRhdGVwaWNrZXJDb25maWdzKTtcbiAgICB0aGlzLmJpbmRFdmVudHNUb0RhdGVwaWNrZXIoKTtcbiAgfVxuXG4gIGJ1aWxkRGF0ZXBpY2tlckNvbmZpZ3MoKTogdm9pZCB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZ3MgPSB7XG4gICAgICBhdXRvY2xvc2U6IHRoaXMuYXV0b2Nsb3NlLFxuICAgICAgY29udGFpbmVyOiAnIycgKyB0aGlzLmhvc3RJZCxcbiAgICAgIGNhbGVuZGFyV2Vla3M6IHRoaXMuY2FsZW5kYXJXZWVrcyxcbiAgICAgIGNsZWFyQnRuOiB0aGlzLmNsZWFyQnRuLFxuICAgICAgZGVmYXVsdFZpZXdEYXRlOiB0aGlzLmRlZmF1bHRWaWV3RGF0ZSxcbiAgICAgIGRpc2FibGVUb3VjaEtleWJvYXJkOiB0aGlzLmRpc2FibGVUb3VjaEtleWJvYXJkLFxuICAgICAgZGF0ZXNEaXNhYmxlZDogdGhpcy5kYXRlc0Rpc2FibGVkLFxuICAgICAgZGF5c09mV2Vla0Rpc2FibGVkOiB0aGlzLmRheXNPZldlZWtEaXNhYmxlZCxcbiAgICAgIGRheXNPZldlZWtIaWdobGlnaHRlZDogdGhpcy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQsXG4gICAgICBlbmFibGVPblJlYWRvbmx5OiB0aGlzLmVuYWJsZU9uUmVhZG9ubHksXG4gICAgICBlbmREYXRlOiB0aGlzLmVuZERhdGUsXG4gICAgICBmb3JjZVBhcnNlOiB0aGlzLmZvcmNlUGFyc2UsXG4gICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgaW1tZWRpYXRlVXBkYXRlczogdGhpcy5pbW1lZGlhdGVVcGRhdGVzLFxuICAgICAga2V5Ym9hcmROYXZpZ2F0aW9uOiB0aGlzLmtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIG1heFZpZXdNb2RlOiB0aGlzLm1heFZpZXdNb2RlLFxuICAgICAgbWluVmlld01vZGU6IHRoaXMubWluVmlld01vZGUsXG4gICAgICBtdWx0aWRhdGU6IHRoaXMubXVsdGlkYXRlLFxuICAgICAgbXVsdGlkYXRlU2VwYXJhdG9yOiB0aGlzLm11bHRpZGF0ZVNlcGFyYXRvcixcbiAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxuICAgICAgc2hvd09uRm9jdXM6IHRoaXMuc2hvd09uRm9jdXMsXG4gICAgICBzdGFydERhdGU6IHRoaXMuc3RhcnREYXRlLFxuICAgICAgc3RhcnRWaWV3OiB0aGlzLnN0YXJ0VmlldyxcbiAgICAgIHNob3dXZWVrRGF5czogdGhpcy5zaG93V2Vla0RheXMsXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIHRvZGF5QnRuOiB0aGlzLnRvZGF5QnRuLFxuICAgICAgdG9kYXlIaWdobGlnaHQ6IHRoaXMudG9kYXlIaWdobGlnaHQsXG4gICAgICB3ZWVrU3RhcnQ6IHRoaXMud2Vla1N0YXJ0LFxuICAgICAgekluZGV4T2Zmc2V0OiB0aGlzLnpJbmRleE9mZnNldCxcbiAgICB9O1xuXG4gICAgdGhpcy5kYXRlcGlja2VyQ29uZmlncyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB0aGlzLmRhdGVwaWNrZXJDb25maWdzLFxuICAgICAgZGVmYXVsdENvbmZpZ3MsXG4gICAgKTtcbiAgICB0aGlzLnNldERhdGVwaWNrZXJDb25maWdzT3ZlcnJpZGVzKCk7XG4gIH1cblxuICBzZXREYXRlcGlja2VyQ29uZmlnc092ZXJyaWRlcygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVwaWNrZXJDb25maWdzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHRoaXMuZGF0ZXBpY2tlckNvbmZpZ3MsXG4gICAgICB0aGlzLmNvbmZpZ3MsXG4gICAgKTtcbiAgfVxuXG4gIGJpbmRFdmVudHNUb0RhdGVwaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdzaG93JywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnNob3dFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0ZXBpY2tlci5vbignaGlkZScsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmIChpc051bGwodmFsdWUpKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0ZXBpY2tlci5vbignY2xlYXJEYXRlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNsZWFyRGF0ZUV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdjaGFuZ2VEYXRlJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgICAgdGhpcy5maWxsTW9kZWwodmFsdWUpO1xuICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgIHRoaXMuY2hhbmdlRGF0ZUV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdjaGFuZ2VNb250aCcsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VNb250aEV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdjaGFuZ2VZZWFyJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZVllYXJFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0ZXBpY2tlci5vbignY2hhbmdlRGVjYWRlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZURlY2FkZUV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdjaGFuZ2VDZW50dXJ5JywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUNlbnR1cnlFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIGF1dG9jb21wbGV0ZVxuICAgICAqL1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5hdHRyKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICBpZiAodGhpcy5tdWx0aWRhdGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGVzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgc2V0VmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm1vZGVsLmdldFZhbHVlKHRoaXMubmFtZSk7XG5cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMubXVsdGlkYXRlID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0ZXModmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldERhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGUodmFsdWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51dGMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VyKCdzZXRVVENEYXRlJywgdmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VyKCdzZXREYXRlJywgdmFsdWUpO1xuICB9XG5cbiAgc2V0RGF0ZXModmFsdWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51dGMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VyKCdzZXRVVENEYXRlcycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcignc2V0RGF0ZXMnLCB2YWx1ZSk7XG4gIH1cblxuICBnZXREYXRlKCk6IGFueSB7XG4gICAgaWYgKHRoaXMudXRjID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXIoJ2dldFVUQ0RhdGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXIoJ2dldERhdGUnKTtcbiAgfVxuXG4gIGdldERhdGVzKCk6IGFueSB7XG4gICAgaWYgKHRoaXMudXRjID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXIoJ2dldFVUQ0RhdGVzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VyKCdnZXREYXRlcycpO1xuICB9XG5cbiAgcmVmcmVzaERhdGVwaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXIoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLmluaXREYXRlcGlja2VyKCk7XG4gICAgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXIoJ3VwZGF0ZScsIHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcigndXBkYXRlJywgdGhpcy52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==