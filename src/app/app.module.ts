import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { DataTablesModule } from "angular-datatables";
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from  'ngb-toast';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

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
    HttpClientModule,
    NgbToastModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
