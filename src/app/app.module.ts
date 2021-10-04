import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { DataTablesModule } from "angular-datatables";
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from  'ngb-toast';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    ColaboradorComponent,
    ColaboradoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    MatTabsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDialogModule,
    HttpClientModule,
    NgbToastModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
