import { Component, ContentChildren, Input, Output, EventEmitter, HostBinding, } from '@angular/core';
import { DataGroupComponent } from './components/data-group.component';
import { BaseModel } from '../common/classes/base-model';
import { capitalize, isNull } from '../common/utils';
import { BaseModelArray } from '../common/classes/base-model-array';
export class DataGroupsComponent {
    constructor() {
        this.class = 'd-block';
        this.multiple = false;
        this.highlightOnValid = false;
        this.autocomplete = false;
        this.submitEvent = new EventEmitter();
        this.modelResetSubscriptions$ = [];
        this.firstMount = false;
    }
    ngOnInit() {
        this.initBaseModel();
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.initModelMap();
            this.listenDataGroupsListChanges();
            this.listenDataInputsListChanges();
        });
    }
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (propName === 'model' && this.firstMount === true) {
                this.initBaseModel();
                this.initModelMap();
            }
            if (propName === 'highlightOnValid') {
                if (Array.isArray(this.model) &&
                    this.dataGroupComponents !== undefined) {
                    this.initModelMap();
                }
            }
        }
    }
    addModelResetSubscription(subscription) {
        this.modelResetSubscriptions$.push(subscription);
    }
    unsubscribeAllModelResetSubscriptions() {
        this.modelResetSubscriptions$.forEach((subscription, i) => {
            subscription.unsubscribe();
        });
        this.modelResetSubscriptions$ = [];
    }
    initBaseModel() {
        if (Array.isArray(this.model)) {
            this._model = this.model;
        }
        if (this.model instanceof BaseModelArray) {
            this._model = this.model.get();
            this.subscribeToBaseModelArrayChanges();
        }
        if (this.model instanceof BaseModel) {
            this._model = [this.model];
        }
        this.firstMount = true;
    }
    subscribeToBaseModelArrayChanges() {
        const subscription = this.model.getChange();
        subscription.subscribe(() => {
            if (this.firstMount === true) {
                this.modelResetSubscriptions$ = [];
                this.refreshBaseModelArray();
            }
        });
    }
    refreshBaseModelArray() {
        this._model = this.model.get();
        setTimeout(() => {
            this.initModelMap();
        });
    }
    unsubscribeToBaseModelArrayChanges() {
        if (this.model.getChange === 'function') {
            const subscription = this.model.getChange();
            subscription.unsubscribe();
        }
    }
    initModelMap() {
        this.generateModelMap();
        this.applyToAllModelMap();
        this.applyToAllModelPropertiesMap();
    }
    generateModelMap() {
        this.modelMap = [];
        this._model.forEach((model, index) => {
            this.modelMap.push({ model, dataInputComponents: [] });
            const dataGroupComponent = this.dataGroupComponents.toArray()[index];
            const dataInputComponents = dataGroupComponent.getDataInputComponents();
            dataInputComponents.forEach((dataInputComponent, i) => {
                this.modelMap[index].dataInputComponents[i] = {
                    component: dataInputComponent,
                    name: dataInputComponent.name,
                };
            });
        });
    }
    applyToAllModelMap() {
        this.modelMap.forEach((map) => {
            this.applyModelMap(map);
            this.subscribeToModelReset(map);
        });
    }
    applyModelMap(map) {
        map.dataInputComponents.forEach((dataInputComponent) => {
            const { name } = dataInputComponent.component;
            const errors = this.formatErrors(map.model.getErrors());
            dataInputComponent.component.model = map.model;
            dataInputComponent.component.highlightOnValid = this.highlightOnValid;
            if (dataInputComponent.component.autocomplete === undefined) {
                dataInputComponent.component.autocomplete = this.autocomplete;
            }
            dataInputComponent.component.fillModel(map.model.getValue(name));
            dataInputComponent.component.refresh();
            this.setDataInputComponentError(dataInputComponent, errors);
        });
    }
    subscribeToModelReset(map) {
        const subscription = map.model.getResetTimes();
        this.addModelResetSubscription(subscription);
        subscription.subscribe(() => {
            this.applyModelMap(map);
            this.applyModelPropertiesMap(map);
        });
    }
    applyToAllModelPropertiesMap() {
        this.modelMap.forEach((map) => {
            this.applyModelPropertiesMap(map);
        });
    }
    applyModelPropertiesMap(map) {
        map.model.initMap();
        map.dataInputComponents.forEach((dataInputComponent) => {
            const { name } = dataInputComponent.component;
            const propertyMap = map.model.getPropertyMap(name);
            dataInputComponent.component.touched = propertyMap.touched;
        });
    }
    listenDataGroupsListChanges() {
        if (Array.isArray(this.model)) {
            this.dataGroupComponents.changes.subscribe(() => {
                setTimeout(() => {
                    this.initModelMap();
                });
            });
        }
    }
    listenDataInputsListChanges() {
        if (Array.isArray(this.model)) {
            this.dataGroupComponents.forEach((dataGroupComponent) => {
                dataGroupComponent.dataInputs.changes.subscribe(() => {
                    dataGroupComponent.loadDataInputComponents();
                    setTimeout(() => {
                        this.initModelMap();
                    });
                });
            });
        }
    }
    submitData() {
        const promises = [];
        const groups = this.group !== undefined ? { groups: [this.group] } : {};
        this.modelMap.forEach((map) => {
            map.model.setSubmitted(true);
            promises.push(new Promise((resolve) => {
                map.model
                    .validate(groups)
                    .then((validationResult) => {
                    const { isValid, errors } = validationResult;
                    if (isValid) {
                        resolve(validationResult);
                    }
                    else {
                        const formattedErrors = this.formatErrors(errors);
                        const formattedValidationResult = {
                            isValid,
                            errors: formattedErrors,
                        };
                        resolve(formattedValidationResult);
                    }
                });
            }));
        });
        this.submitEvent.emit(new Promise((resolve) => {
            const currentPromise = promises.length > 1 ? Promise.all(promises) : promises[0];
            currentPromise.then((validationResult) => {
                this.manageErrors(validationResult);
                if (this.enctype === 'multipart/form-data') {
                    if (!Array.isArray(validationResult)) {
                        validationResult.validatedData = this.generateFormData(validationResult.validatedData);
                    }
                    else {
                        validationResult.forEach((item) => {
                            item.validatedData = this.generateFormData(item.validatedData);
                        });
                    }
                }
                validationResult = this.parseValidationResult(validationResult);
                resolve(validationResult);
            });
        }));
    }
    parseValidationResult(validationResult) {
        if (this.multiple === true && !Array.isArray(validationResult)) {
            validationResult = [validationResult];
        }
        if (Array.isArray(validationResult)) {
            validationResult = this.groupMultipleValidationResult(validationResult);
        }
        return validationResult;
    }
    groupMultipleValidationResult(validationResult) {
        const groupedMultipleValidationResults = {
            isValid: true,
        };
        validationResult.forEach((validationResultItem) => {
            if (groupedMultipleValidationResults.isValid) {
                groupedMultipleValidationResults.isValid = validationResultItem.isValid;
            }
            if (validationResultItem.validatedData !== undefined) {
                if (groupedMultipleValidationResults.validatedData === undefined) {
                    groupedMultipleValidationResults.validatedData = [];
                }
                groupedMultipleValidationResults.validatedData.push(validationResultItem.validatedData);
            }
            if (validationResultItem.errors !== undefined) {
                if (groupedMultipleValidationResults.errors === undefined) {
                    groupedMultipleValidationResults.errors = [];
                }
                groupedMultipleValidationResults.errors.push(validationResultItem.errors);
            }
        });
        return groupedMultipleValidationResults;
    }
    generateFormData(validatedData) {
        const formData = new FormData();
        if (!isNull(validatedData)) {
            const keys = Object.keys(validatedData);
            keys.forEach((key) => {
                formData.append(key, validatedData[key]);
            });
        }
        return formData;
    }
    formatErrors(errors) {
        const formattedErrors = [];
        errors.forEach((error, index) => {
            const errorData = {
                property: error.property,
                message: Object.values(error.constraints)[0],
            };
            formattedErrors[index] = errorData;
        });
        return formattedErrors;
    }
    manageErrors(validationResults) {
        validationResults = !Array.isArray(validationResults)
            ? [validationResults]
            : validationResults;
        this.modelMap.forEach((map, index) => {
            const { dataInputComponents } = map;
            const { isValid, errors } = validationResults[index];
            if (isValid) {
                dataInputComponents.forEach((dataInputComponent) => {
                    dataInputComponent.component.error = null;
                    dataInputComponent.component.touched = true;
                });
            }
            else {
                dataInputComponents.forEach((dataInputComponent) => {
                    this.setDataInputComponentError(dataInputComponent, errors);
                    dataInputComponent.component.touched = true;
                });
            }
        });
    }
    setDataInputComponentError(dataInputComponent, errors) {
        const { name } = dataInputComponent;
        const filteredError = errors.filter((error) => error.property === name);
        const errorMessage = filteredError.length ? filteredError[0].message : null;
        dataInputComponent.component.error = capitalize(errorMessage);
        dataInputComponent.component.refresh();
    }
    unsubscribeAll() {
        this.unsubscribeAllModelResetSubscriptions();
        this.unsubscribeToBaseModelArrayChanges();
    }
    ngOnDestroy() {
        this.unsubscribeAll();
    }
}
DataGroupsComponent.decorators = [
    { type: Component, args: [{
                selector: 'data-groups',
                template: `
    <form (ngSubmit)="submitData()">
      <ng-content></ng-content>
    </form>
  `,
                styles: [`
      form {
        position: relative;
      }
    `]
            },] }
];
DataGroupsComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }],
    model: [{ type: Input }],
    group: [{ type: Input }],
    enctype: [{ type: Input }],
    multiple: [{ type: Input }],
    highlightOnValid: [{ type: Input }],
    autocomplete: [{ type: Input }],
    submitEvent: [{ type: Output }],
    dataGroupComponents: [{ type: ContentChildren, args: [DataGroupComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncm91cHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdG9zIE1hdXJvL0RvY3VtZW50b3MvRGVzYXJyb2xsb3MgV2ViL0FuZ3VsYXIgbGlicy9hbmd1bGFyLWJzLWZvcm0tY29tcG9uZW50cy9wcm9qZWN0cy9uZy1mb3Jtcy9zcmMvIiwic291cmNlcyI6WyJsaWIvZGF0YS1ncm91cC9kYXRhLWdyb3Vwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxlQUFlLEVBRWYsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBSVosV0FBVyxHQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVF6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQWlCcEUsTUFBTSxPQUFPLG1CQUFtQjtJQWZoQztRQWlCd0IsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUsvQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU3QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3RELDZCQUF3QixHQUFnQyxFQUFFLENBQUM7UUFDM0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQXdXdEMsQ0FBQztJQXRXQyxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENB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QWtDLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUF6WUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDt5QkFFQzs7OztLQUlDO2FBRUo7OztvQkFHRSxXQUFXLFNBQUMsT0FBTztvQkFFbkIsS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBRUwsTUFBTTtrQ0FFTixlQUFlLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YS1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnQHdlYmJsb2Nrc2FwcC9jbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vY29tbW9uL2NsYXNzZXMvYmFzZS1tb2RlbCc7XG5pbXBvcnQge1xuICBFcnJvcixcbiAgVmFsaWRhdGlvblJlc3VsdCxcbiAgRm9ybWF0dGVkVmFsaWRhdGlvblJlc3VsdCxcbiAgTW9kZWxNYXAsXG4gIERhdGFJbnB1dENvbXBvbmVudCxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjYXBpdGFsaXplLCBpc051bGwgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCYXNlTW9kZWxBcnJheSB9IGZyb20gJy4uL2NvbW1vbi9jbGFzc2VzL2Jhc2UtbW9kZWwtYXJyYXknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhLWdyb3VwcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGZvcm0gKG5nU3VibWl0KT1cInN1Ym1pdERhdGEoKVwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZm9ybT5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgZm9ybSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JvdXBzQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzcyA9ICdkLWJsb2NrJztcblxuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBncm91cDogc3RyaW5nO1xuICBASW5wdXQoKSBlbmN0eXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhpZ2hsaWdodE9uVmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHN1Ym1pdEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAQ29udGVudENoaWxkcmVuKERhdGFHcm91cENvbXBvbmVudClcbiAgZGF0YUdyb3VwQ29tcG9uZW50czogUXVlcnlMaXN0PERhdGFHcm91cENvbXBvbmVudD47XG5cbiAgcHJpdmF0ZSBfbW9kZWw6IEFycmF5PEJhc2VNb2RlbD47XG4gIHByaXZhdGUgbW9kZWxNYXA6IEFycmF5PE1vZGVsTWFwPjtcbiAgcHJpdmF0ZSBtb2RlbFJlc2V0U3Vic2NyaXB0aW9ucyQ6IEFycmF5PEJlaGF2aW9yU3ViamVjdDxhbnk+PiA9IFtdO1xuICBwcml2YXRlIGZpcnN0TW91bnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRCYXNlTW9kZWwoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdE1vZGVsTWFwKCk7XG4gICAgICB0aGlzLmxpc3RlbkRhdGFHcm91cHNMaXN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5saXN0ZW5EYXRhSW5wdXRzTGlzdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ21vZGVsJyAmJiB0aGlzLmZpcnN0TW91bnQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5pbml0QmFzZU1vZGVsKCk7XG4gICAgICAgIHRoaXMuaW5pdE1vZGVsTWFwKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2hpZ2hsaWdodE9uVmFsaWQnKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpICYmXG4gICAgICAgICAgdGhpcy5kYXRhR3JvdXBDb21wb25lbnRzICE9PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5pbml0TW9kZWxNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkTW9kZWxSZXNldFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb246IEJlaGF2aW9yU3ViamVjdDxhbnk+KSB7XG4gICAgdGhpcy5tb2RlbFJlc2V0U3Vic2NyaXB0aW9ucyQucHVzaChzdWJzY3JpcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZUFsbE1vZGVsUmVzZXRTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMubW9kZWxSZXNldFN1YnNjcmlwdGlvbnMkLmZvckVhY2goKHN1YnNjcmlwdGlvbiwgaSkgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZGVsUmVzZXRTdWJzY3JpcHRpb25zJCA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0QmFzZU1vZGVsKCk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpKSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kZWwgaW5zdGFuY2VvZiBCYXNlTW9kZWxBcnJheSkge1xuICAgICAgdGhpcy5fbW9kZWwgPSB0aGlzLm1vZGVsLmdldCgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb0Jhc2VNb2RlbEFycmF5Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1vZGVsIGluc3RhbmNlb2YgQmFzZU1vZGVsKSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IFt0aGlzLm1vZGVsXTtcbiAgICB9XG5cbiAgICB0aGlzLmZpcnN0TW91bnQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0Jhc2VNb2RlbEFycmF5Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLm1vZGVsLmdldENoYW5nZSgpO1xuICAgIHN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZmlyc3RNb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm1vZGVsUmVzZXRTdWJzY3JpcHRpb25zJCA9IFtdO1xuICAgICAgICB0aGlzLnJlZnJlc2hCYXNlTW9kZWxBcnJheSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQmFzZU1vZGVsQXJyYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fbW9kZWwgPSB0aGlzLm1vZGVsLmdldCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0TW9kZWxNYXAoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb0Jhc2VNb2RlbEFycmF5Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlbC5nZXRDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwuZ2V0Q2hhbmdlKCk7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRNb2RlbE1hcCgpOiB2b2lkIHtcbiAgICB0aGlzLmdlbmVyYXRlTW9kZWxNYXAoKTtcbiAgICB0aGlzLmFwcGx5VG9BbGxNb2RlbE1hcCgpO1xuICAgIHRoaXMuYXBwbHlUb0FsbE1vZGVsUHJvcGVydGllc01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1vZGVsTWFwKCk6IHZvaWQge1xuICAgIHRoaXMubW9kZWxNYXAgPSBbXTtcbiAgICB0aGlzLl9tb2RlbC5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMubW9kZWxNYXAucHVzaCh7IG1vZGVsLCBkYXRhSW5wdXRDb21wb25lbnRzOiBbXSB9KTtcblxuICAgICAgY29uc3QgZGF0YUdyb3VwQ29tcG9uZW50ID0gdGhpcy5kYXRhR3JvdXBDb21wb25lbnRzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgICBjb25zdCBkYXRhSW5wdXRDb21wb25lbnRzID0gZGF0YUdyb3VwQ29tcG9uZW50LmdldERhdGFJbnB1dENvbXBvbmVudHMoKTtcblxuICAgICAgZGF0YUlucHV0Q29tcG9uZW50cy5mb3JFYWNoKChkYXRhSW5wdXRDb21wb25lbnQsIGkpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbE1hcFtpbmRleF0uZGF0YUlucHV0Q29tcG9uZW50c1tpXSA9IHtcbiAgICAgICAgICBjb21wb25lbnQ6IGRhdGFJbnB1dENvbXBvbmVudCxcbiAgICAgICAgICBuYW1lOiBkYXRhSW5wdXRDb21wb25lbnQubmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRvQWxsTW9kZWxNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbE1hcC5mb3JFYWNoKChtYXApID0+IHtcbiAgICAgIHRoaXMuYXBwbHlNb2RlbE1hcChtYXApO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb01vZGVsUmVzZXQobWFwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlNb2RlbE1hcChtYXA6IE1vZGVsTWFwKTogdm9pZCB7XG4gICAgbWFwLmRhdGFJbnB1dENvbXBvbmVudHMuZm9yRWFjaCgoZGF0YUlucHV0Q29tcG9uZW50KSA9PiB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IGRhdGFJbnB1dENvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLmZvcm1hdEVycm9ycyhtYXAubW9kZWwuZ2V0RXJyb3JzKCkpO1xuXG4gICAgICBkYXRhSW5wdXRDb21wb25lbnQuY29tcG9uZW50Lm1vZGVsID0gbWFwLm1vZGVsO1xuICAgICAgZGF0YUlucHV0Q29tcG9uZW50LmNvbXBvbmVudC5oaWdobGlnaHRPblZhbGlkID0gdGhpcy5oaWdobGlnaHRPblZhbGlkO1xuICAgICAgaWYgKGRhdGFJbnB1dENvbXBvbmVudC5jb21wb25lbnQuYXV0b2NvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YUlucHV0Q29tcG9uZW50LmNvbXBvbmVudC5hdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZTtcbiAgICAgIH1cbiAgICAgIGRhdGFJbnB1dENvbXBvbmVudC5jb21wb25lbnQuZmlsbE1vZGVsKG1hcC5tb2RlbC5nZXRWYWx1ZShuYW1lKSk7XG4gICAgICBkYXRhSW5wdXRDb21wb25lbnQuY29tcG9uZW50LnJlZnJlc2goKTtcblxuICAgICAgdGhpcy5zZXREYXRhSW5wdXRDb21wb25lbnRFcnJvcihkYXRhSW5wdXRDb21wb25lbnQsIGVycm9ycyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvTW9kZWxSZXNldChtYXA6IE1vZGVsTWFwKTogdm9pZCB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbWFwLm1vZGVsLmdldFJlc2V0VGltZXMoKTtcbiAgICB0aGlzLmFkZE1vZGVsUmVzZXRTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICBzdWJzY3JpcHRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXBwbHlNb2RlbE1hcChtYXApO1xuICAgICAgdGhpcy5hcHBseU1vZGVsUHJvcGVydGllc01hcChtYXApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRvQWxsTW9kZWxQcm9wZXJ0aWVzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMubW9kZWxNYXAuZm9yRWFjaCgobWFwKSA9PiB7XG4gICAgICB0aGlzLmFwcGx5TW9kZWxQcm9wZXJ0aWVzTWFwKG1hcCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5TW9kZWxQcm9wZXJ0aWVzTWFwKG1hcDogTW9kZWxNYXApOiB2b2lkIHtcbiAgICBtYXAubW9kZWwuaW5pdE1hcCgpO1xuICAgIG1hcC5kYXRhSW5wdXRDb21wb25lbnRzLmZvckVhY2goKGRhdGFJbnB1dENvbXBvbmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBkYXRhSW5wdXRDb21wb25lbnQuY29tcG9uZW50O1xuICAgICAgY29uc3QgcHJvcGVydHlNYXAgPSBtYXAubW9kZWwuZ2V0UHJvcGVydHlNYXAobmFtZSk7XG5cbiAgICAgIGRhdGFJbnB1dENvbXBvbmVudC5jb21wb25lbnQudG91Y2hlZCA9IHByb3BlcnR5TWFwLnRvdWNoZWQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkRhdGFHcm91cHNMaXN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm1vZGVsKSkge1xuICAgICAgdGhpcy5kYXRhR3JvdXBDb21wb25lbnRzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0TW9kZWxNYXAoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkRhdGFJbnB1dHNMaXN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm1vZGVsKSkge1xuICAgICAgdGhpcy5kYXRhR3JvdXBDb21wb25lbnRzLmZvckVhY2goKGRhdGFHcm91cENvbXBvbmVudCkgPT4ge1xuICAgICAgICBkYXRhR3JvdXBDb21wb25lbnQuZGF0YUlucHV0cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgZGF0YUdyb3VwQ29tcG9uZW50LmxvYWREYXRhSW5wdXRDb21wb25lbnRzKCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRNb2RlbE1hcCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdWJtaXREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cCAhPT0gdW5kZWZpbmVkID8geyBncm91cHM6IFt0aGlzLmdyb3VwXSB9IDoge307XG5cbiAgICB0aGlzLm1vZGVsTWFwLmZvckVhY2goKG1hcCkgPT4ge1xuICAgICAgbWFwLm1vZGVsLnNldFN1Ym1pdHRlZCh0cnVlKTtcbiAgICAgIHByb21pc2VzLnB1c2goXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgbWFwLm1vZGVsXG4gICAgICAgICAgICAudmFsaWRhdGUoZ3JvdXBzKVxuICAgICAgICAgICAgLnRoZW4oKHZhbGlkYXRpb25SZXN1bHQ6IFZhbGlkYXRpb25SZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpc1ZhbGlkLCBlcnJvcnMgfSA9IHZhbGlkYXRpb25SZXN1bHQ7XG4gICAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRFcnJvcnM6IEVycm9yW10gPSB0aGlzLmZvcm1hdEVycm9ycyhlcnJvcnMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbGlkYXRpb25SZXN1bHQ6IEZvcm1hdHRlZFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICBpc1ZhbGlkLFxuICAgICAgICAgICAgICAgICAgZXJyb3JzOiBmb3JtYXR0ZWRFcnJvcnMsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoZm9ybWF0dGVkVmFsaWRhdGlvblJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1Ym1pdEV2ZW50LmVtaXQoXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50UHJvbWlzZSA9XG4gICAgICAgICAgcHJvbWlzZXMubGVuZ3RoID4gMSA/IFByb21pc2UuYWxsKHByb21pc2VzKSA6IHByb21pc2VzWzBdO1xuXG4gICAgICAgIGN1cnJlbnRQcm9taXNlLnRoZW4oKHZhbGlkYXRpb25SZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLm1hbmFnZUVycm9ycyh2YWxpZGF0aW9uUmVzdWx0KTtcblxuICAgICAgICAgIGlmICh0aGlzLmVuY3R5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbGlkYXRpb25SZXN1bHQpKSB7XG4gICAgICAgICAgICAgICh2YWxpZGF0aW9uUmVzdWx0IGFzIGFueSkudmFsaWRhdGVkRGF0YSA9IHRoaXMuZ2VuZXJhdGVGb3JtRGF0YShcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnZhbGlkYXRlZERhdGEsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAodmFsaWRhdGlvblJlc3VsdCBhcyBGb3JtYXR0ZWRWYWxpZGF0aW9uUmVzdWx0W10pLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW0udmFsaWRhdGVkRGF0YSA9IHRoaXMuZ2VuZXJhdGVGb3JtRGF0YShcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWxpZGF0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQgPSB0aGlzLnBhcnNlVmFsaWRhdGlvblJlc3VsdCh2YWxpZGF0aW9uUmVzdWx0KTtcblxuICAgICAgICAgIHJlc29sdmUodmFsaWRhdGlvblJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VWYWxpZGF0aW9uUmVzdWx0KHZhbGlkYXRpb25SZXN1bHQpOiBGb3JtYXR0ZWRWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiAhQXJyYXkuaXNBcnJheSh2YWxpZGF0aW9uUmVzdWx0KSkge1xuICAgICAgdmFsaWRhdGlvblJlc3VsdCA9IFt2YWxpZGF0aW9uUmVzdWx0XTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWxpZGF0aW9uUmVzdWx0KSkge1xuICAgICAgdmFsaWRhdGlvblJlc3VsdCA9IHRoaXMuZ3JvdXBNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHQodmFsaWRhdGlvblJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGdyb3VwTXVsdGlwbGVWYWxpZGF0aW9uUmVzdWx0KFxuICAgIHZhbGlkYXRpb25SZXN1bHQsXG4gICk6IEZvcm1hdHRlZFZhbGlkYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzOiBGb3JtYXR0ZWRWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICB9O1xuXG4gICAgdmFsaWRhdGlvblJlc3VsdC5mb3JFYWNoKCh2YWxpZGF0aW9uUmVzdWx0SXRlbSkgPT4ge1xuICAgICAgaWYgKGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzLmlzVmFsaWQpIHtcbiAgICAgICAgZ3JvdXBlZE11bHRpcGxlVmFsaWRhdGlvblJlc3VsdHMuaXNWYWxpZCA9IHZhbGlkYXRpb25SZXN1bHRJdGVtLmlzVmFsaWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWxpZGF0aW9uUmVzdWx0SXRlbS52YWxpZGF0ZWREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzLnZhbGlkYXRlZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzLnZhbGlkYXRlZERhdGEgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzLnZhbGlkYXRlZERhdGEucHVzaChcbiAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0SXRlbS52YWxpZGF0ZWREYXRhLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsaWRhdGlvblJlc3VsdEl0ZW0uZXJyb3JzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGdyb3VwZWRNdWx0aXBsZVZhbGlkYXRpb25SZXN1bHRzLmVycm9ycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZ3JvdXBlZE11bHRpcGxlVmFsaWRhdGlvblJlc3VsdHMuZXJyb3JzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBncm91cGVkTXVsdGlwbGVWYWxpZGF0aW9uUmVzdWx0cy5lcnJvcnMucHVzaChcbiAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0SXRlbS5lcnJvcnMsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZ3JvdXBlZE11bHRpcGxlVmFsaWRhdGlvblJlc3VsdHM7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRm9ybURhdGEodmFsaWRhdGVkRGF0YSk6IGFueSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgIGlmICghaXNOdWxsKHZhbGlkYXRlZERhdGEpKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsaWRhdGVkRGF0YSk7XG5cbiAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbGlkYXRlZERhdGFba2V5XSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEVycm9ycyhlcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdKTogYW55IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRFcnJvcnMgPSBbXTtcblxuICAgIGVycm9ycy5mb3JFYWNoKChlcnJvciwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yRGF0YTogRXJyb3IgPSB7XG4gICAgICAgIHByb3BlcnR5OiBlcnJvci5wcm9wZXJ0eSxcbiAgICAgICAgbWVzc2FnZTogT2JqZWN0LnZhbHVlcyhlcnJvci5jb25zdHJhaW50cylbMF0sXG4gICAgICB9O1xuXG4gICAgICBmb3JtYXR0ZWRFcnJvcnNbaW5kZXhdID0gZXJyb3JEYXRhO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZEVycm9ycztcbiAgfVxuXG4gIHByaXZhdGUgbWFuYWdlRXJyb3JzKHZhbGlkYXRpb25SZXN1bHRzOiBGb3JtYXR0ZWRWYWxpZGF0aW9uUmVzdWx0W10pOiB2b2lkIHtcbiAgICB2YWxpZGF0aW9uUmVzdWx0cyA9ICFBcnJheS5pc0FycmF5KHZhbGlkYXRpb25SZXN1bHRzKVxuICAgICAgPyBbdmFsaWRhdGlvblJlc3VsdHNdXG4gICAgICA6IHZhbGlkYXRpb25SZXN1bHRzO1xuXG4gICAgdGhpcy5tb2RlbE1hcC5mb3JFYWNoKChtYXAsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB7IGRhdGFJbnB1dENvbXBvbmVudHMgfSA9IG1hcDtcbiAgICAgIGNvbnN0IHsgaXNWYWxpZCwgZXJyb3JzIH0gPSB2YWxpZGF0aW9uUmVzdWx0c1tpbmRleF07XG5cbiAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgIGRhdGFJbnB1dENvbXBvbmVudHMuZm9yRWFjaCgoZGF0YUlucHV0Q29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgZGF0YUlucHV0Q29tcG9uZW50LmNvbXBvbmVudC5lcnJvciA9IG51bGw7XG4gICAgICAgICAgZGF0YUlucHV0Q29tcG9uZW50LmNvbXBvbmVudC50b3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhSW5wdXRDb21wb25lbnRzLmZvckVhY2goKGRhdGFJbnB1dENvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YUlucHV0Q29tcG9uZW50RXJyb3IoZGF0YUlucHV0Q29tcG9uZW50LCBlcnJvcnMpO1xuICAgICAgICAgIGRhdGFJbnB1dENvbXBvbmVudC5jb21wb25lbnQudG91Y2hlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREYXRhSW5wdXRDb21wb25lbnRFcnJvcihcbiAgICBkYXRhSW5wdXRDb21wb25lbnQ6IERhdGFJbnB1dENvbXBvbmVudCxcbiAgICBlcnJvcnM6IGFueSxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBkYXRhSW5wdXRDb21wb25lbnQ7XG4gICAgY29uc3QgZmlsdGVyZWRFcnJvciA9IGVycm9ycy5maWx0ZXIoKGVycm9yKSA9PiBlcnJvci5wcm9wZXJ0eSA9PT0gbmFtZSk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZmlsdGVyZWRFcnJvci5sZW5ndGggPyBmaWx0ZXJlZEVycm9yWzBdLm1lc3NhZ2UgOiBudWxsO1xuXG4gICAgZGF0YUlucHV0Q29tcG9uZW50LmNvbXBvbmVudC5lcnJvciA9IGNhcGl0YWxpemUoZXJyb3JNZXNzYWdlKTtcbiAgICBkYXRhSW5wdXRDb21wb25lbnQuY29tcG9uZW50LnJlZnJlc2goKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVBbGwoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZUFsbE1vZGVsUmVzZXRTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvQmFzZU1vZGVsQXJyYXlDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XG4gIH1cbn1cbiJdfQ==