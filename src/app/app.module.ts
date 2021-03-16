import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Exercise1Component } from './exercises/exercise-1/exercise-1.component';
import { NgFormsModule } from '@webblocksapp/ng-forms';

@NgModule({
  declarations: [AppComponent, Exercise1Component],
  imports: [BrowserModule, AppRoutingModule, NgFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
