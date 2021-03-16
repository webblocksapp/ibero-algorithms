import { NgModule } from '@angular/core';
import { BsInputModule } from './bs-input/bs-input.module';
import { DataGroupsModule } from './data-group/data-groups.module';
import { BsSelect2Module } from './bs-select2/bs-select2.module';
import { BsSelectModule } from './bs-select/bs-select.module';
import { BsChecksModule } from './bs-checks/bs-checks.module';
import { BsRadiosModule } from './bs-radios/bs-radios.module';
import { BsFileModule } from './bs-file/bs-file.module';
import { BsDatepickerModule } from './bs-datepicker/bs-datepicker.module';
export class NgFormsModule {
}
NgFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    BsInputModule,
                    BsSelect2Module,
                    BsSelectModule,
                    BsChecksModule,
                    BsRadiosModule,
                    DataGroupsModule,
                    BsFileModule,
                    BsDatepickerModule,
                ],
                exports: [
                    BsInputModule,
                    BsSelect2Module,
                    BsSelectModule,
                    BsChecksModule,
                    BsRadiosModule,
                    DataGroupsModule,
                    BsFileModule,
                    BsDatepickerModule,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZm9ybXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdG9zIE1hdXJvL0RvY3VtZW50b3MvRGVzYXJyb2xsb3MgV2ViL0FuZ3VsYXIgbGlicy9hbmd1bGFyLWJzLWZvcm0tY29tcG9uZW50cy9wcm9qZWN0cy9uZy1mb3Jtcy9zcmMvIiwic291cmNlcyI6WyJsaWIvbmctZm9ybXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUF5QjFFLE1BQU0sT0FBTyxhQUFhOzs7WUF2QnpCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixrQkFBa0I7aUJBQ25CO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNJbnB1dE1vZHVsZSB9IGZyb20gJy4vYnMtaW5wdXQvYnMtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IERhdGFHcm91cHNNb2R1bGUgfSBmcm9tICcuL2RhdGEtZ3JvdXAvZGF0YS1ncm91cHMubW9kdWxlJztcbmltcG9ydCB7IEJzU2VsZWN0Mk1vZHVsZSB9IGZyb20gJy4vYnMtc2VsZWN0Mi9icy1zZWxlY3QyLm1vZHVsZSc7XG5pbXBvcnQgeyBCc1NlbGVjdE1vZHVsZSB9IGZyb20gJy4vYnMtc2VsZWN0L2JzLXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgQnNDaGVja3NNb2R1bGUgfSBmcm9tICcuL2JzLWNoZWNrcy9icy1jaGVja3MubW9kdWxlJztcbmltcG9ydCB7IEJzUmFkaW9zTW9kdWxlIH0gZnJvbSAnLi9icy1yYWRpb3MvYnMtcmFkaW9zLm1vZHVsZSc7XG5pbXBvcnQgeyBCc0ZpbGVNb2R1bGUgfSBmcm9tICcuL2JzLWZpbGUvYnMtZmlsZS5tb2R1bGUnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyL2JzLWRhdGVwaWNrZXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIEJzSW5wdXRNb2R1bGUsXG4gICAgQnNTZWxlY3QyTW9kdWxlLFxuICAgIEJzU2VsZWN0TW9kdWxlLFxuICAgIEJzQ2hlY2tzTW9kdWxlLFxuICAgIEJzUmFkaW9zTW9kdWxlLFxuICAgIERhdGFHcm91cHNNb2R1bGUsXG4gICAgQnNGaWxlTW9kdWxlLFxuICAgIEJzRGF0ZXBpY2tlck1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEJzSW5wdXRNb2R1bGUsXG4gICAgQnNTZWxlY3QyTW9kdWxlLFxuICAgIEJzU2VsZWN0TW9kdWxlLFxuICAgIEJzQ2hlY2tzTW9kdWxlLFxuICAgIEJzUmFkaW9zTW9kdWxlLFxuICAgIERhdGFHcm91cHNNb2R1bGUsXG4gICAgQnNGaWxlTW9kdWxlLFxuICAgIEJzRGF0ZXBpY2tlck1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdGb3Jtc01vZHVsZSB7fVxuIl19