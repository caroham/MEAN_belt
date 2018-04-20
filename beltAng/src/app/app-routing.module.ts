import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { AllComponent } from './all/all.component';
import { NewComponent } from './new/new.component';
import { PetComponent } from './pet/pet.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AllComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'new', component: NewComponent },
  { path: 'details/:id', component: PetComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
