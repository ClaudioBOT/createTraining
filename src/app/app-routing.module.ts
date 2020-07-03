import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenTrainingComponent } from './gen-training/gen-training.component';

const routes: Routes = [
  { path: '', component:GenTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
