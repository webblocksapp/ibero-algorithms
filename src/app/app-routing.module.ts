import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exercise1Component } from './exercises/exercise-1/exercise-1.component';
import { Exercise2Component } from './exercises/exercise-2/exercise-2.component';
import { Exercise3Component } from './exercises/exercise-3/exercise-3.component';
import { Exercise4Component } from './exercises/exercise-4/exercise-4.component';
import { Exercise5Component } from './exercises/exercise-5/exercise-5.component';

const routes: Routes = [
  { path: '', component: Exercise1Component },
  { path: 'exercise-1', component: Exercise1Component },
  { path: 'exercise-2', component: Exercise2Component },
  { path: 'exercise-3', component: Exercise3Component },
  { path: 'exercise-4', component: Exercise4Component },
  { path: 'exercise-5', component: Exercise5Component },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
