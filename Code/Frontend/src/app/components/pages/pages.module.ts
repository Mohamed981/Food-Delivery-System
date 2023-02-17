import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { SaveModalComponent } from '../modals/save-modal/save-modal.component';
import { HeaderComponent } from '../header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SaveModalComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgSelectModule,
    MatCardModule,
    SharedModule
  ],
})
export class PagesModule {}
