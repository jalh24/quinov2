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
import { MatTableExporterModule } from 'mat-table-exporter';
import { CommonModule } from "@angular/common";
import { ModalColaboradorComponent } from './modal-colaborador/modal-colaborador.component';
import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClienteFisicoComponent } from './cliente-fisico/cliente-fisico.component';
import { ClienteMoralComponent } from './cliente-moral/cliente-moral.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { ModalWhatsappComponent } from './modal-whatsapp/modal-whatsapp.component';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
//import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    ColaboradorComponent,
    ColaboradoresComponent,
    ModalColaboradorComponent,
    IndexComponent,
    ClienteFisicoComponent,
    ClienteMoralComponent,
    ClientesComponent,
    LoginComponent,
    ModalWhatsappComponent,
    ModalClienteComponent,
  //  SigninComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableExporterModule,
    MatDialogModule,
    HttpClientModule,
    NgbToastModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
