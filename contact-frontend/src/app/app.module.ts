import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContractFormComponent } from './features/contact/components/contract-form/contract-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './shared/components/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListContactsPageComponent } from './features/contact/pages/list-contacts-page/list-contacts-page.component';
import {MatTableModule} from '@angular/material/table';
import { CreateContactPageComponent } from './features/contact/pages/create-contact-page/create-contact-page.component';
import { ContactListComponent } from './features/contact/components/contact-list/contact-list.component';
import { ContactSearchComponent } from './features/contact/components/contact-search/contact-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ContractFormComponent,
    LoadingComponent,
    ButtonComponent,
    InputComponent,
    ListContactsPageComponent,
    CreateContactPageComponent,
    ContactListComponent,
    ContactSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
