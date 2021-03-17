import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFormsModule } from '@webblocksapp/ng-forms';
import { Exercise1Component } from './exercises/exercise-1/exercise-1.component';
import { Exercise2Component } from './exercises/exercise-2/exercise-2.component';
import { Exercise3Component } from './exercises/exercise-3/exercise-3.component';
import { Exercise4Component } from './exercises/exercise-4/exercise-4.component';
import { Exercise5Component } from './exercises/exercise-5/exercise-5.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Exercise2Component,
    Exercise3Component,
    Exercise4Component,
    Exercise5Component,
  ],
  imports: [BrowserModule, AppRoutingModule, NgFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
