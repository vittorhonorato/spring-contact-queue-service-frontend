import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactsPageComponent } from './features/contact/pages/list-contacts-page/list-contacts-page.component';
import { CreateContactPageComponent } from './features/contact/pages/create-contact-page/create-contact-page.component';

const routes: Routes = [
  { path: '', component: CreateContactPageComponent },
  { path: 'list-all', component: ListContactsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
