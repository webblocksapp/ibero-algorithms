import { Component, ContentChildren, HostBinding, Input, } from '@angular/core';
export class DataGroupComponent {
    constructor() {
        this.class = 'd-block';
        this.dataInputComponents = [];
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this.loadDataInputComponents();
    }
    loadDataInputComponents() {
        this.dataInputs.forEach((dataInput) => {
            this.dataInputComponents.push(dataInput);
        });
    }
    getDataInputComponents() {
        return this.dataInputComponents;
    }
}
DataGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'data-group',
                template: `<ng-content></ng-content>`
            },] }
];
DataGroupComponent.ctorParameters = () => [];
DataGroupComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    dataInputs: [{ type: ContentChildren, args: ['dataInput', { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvRGF0b3MgTWF1cm8vRG9jdW1lbnRvcy9EZXNhcnJvbGxvcyBXZWIvQW5ndWxhciBsaWJzL2FuZ3VsYXItYnMtZm9ybS1jb21wb25lbnRzL3Byb2plY3RzL25nLWZvcm1zL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWdyb3VwL2NvbXBvbmVudHMvZGF0YS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxlQUFlLEVBR2YsV0FBVyxFQUNYLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQU12QixNQUFNLE9BQU8sa0JBQWtCO0lBUzdCO1FBTkEsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUlYLHdCQUFtQixHQUFlLEVBQUUsQ0FBQztJQUU3QixDQUFDO0lBRWhCLFFBQVEsS0FBVSxDQUFDO0lBRW5CLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQzs7O1lBN0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7OztvQkFFRSxXQUFXLFNBQUMsT0FBTyxjQUNuQixLQUFLO3lCQUdMLGVBQWUsU0FBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhLWdyb3VwJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YUdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIEBJbnB1dCgpXG4gIGNsYXNzID0gJ2QtYmxvY2snO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oJ2RhdGFJbnB1dCcsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgZGF0YUlucHV0czogUXVlcnlMaXN0PGFueT47XG4gIHB1YmxpYyBkYXRhSW5wdXRDb21wb25lbnRzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkRGF0YUlucHV0Q29tcG9uZW50cygpO1xuICB9XG5cbiAgbG9hZERhdGFJbnB1dENvbXBvbmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhSW5wdXRzLmZvckVhY2goKGRhdGFJbnB1dCkgPT4ge1xuICAgICAgdGhpcy5kYXRhSW5wdXRDb21wb25lbnRzLnB1c2goZGF0YUlucHV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldERhdGFJbnB1dENvbXBvbmVudHMoKTogQXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUlucHV0Q29tcG9uZW50cztcbiAgfVxufVxuIl19