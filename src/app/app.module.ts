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
import { ColaboradoresWhatsappComponent } from './colaboradores-whatsapp/colaboradores-whatsapp.component';
import { AltaServicioComponent } from './alta-servicio/alta-servicio.component';
import { GestionServicioComponent } from './gestion-servicio/gestion-servicio.component';
import { ReporteServicioComponent } from './reporte-servicio/reporte-servicio.component';
import { ReporteColaboradorComponent } from './reporte-colaborador/reporte-colaborador.component';
import { PagoPacienteComponent } from './pago-paciente/pago-paciente.component';
import { PagoConsultaComponent } from './pago-consulta/pago-consulta.component';
import { CotizadorInternoComponent } from './cotizador-interno/cotizador-interno.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReporteEstadoCuentaComponent } from './reporte-estado-cuenta/reporte-estado-cuenta.component';
import { ReporteAntiguedadSaldosComponent } from './reporte-antiguedad-saldos/reporte-antiguedad-saldos.component';
import { CotizadorClienteComponent } from './cotizador-cliente/cotizador-cliente.component';
// import { CotizadorServicioComponent } from './cotizador-servicio/cotizador-servicio.component';
// import { ModalCotizadorServicioComponent } from './modal-cotizador-servicio/modal-cotizador-servicio.component';
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
    ColaboradoresWhatsappComponent,
    AltaServicioComponent,
    GestionServicioComponent,
    ReporteServicioComponent,
    ReporteColaboradorComponent,
    PagoPacienteComponent,
    PagoConsultaComponent,
    CotizadorInternoComponent,
    ReporteEstadoCuentaComponent,
    ReporteAntiguedadSaldosComponent,
    CotizadorClienteComponent,
    // CotizadorServicioComponent,
    // ModalCotizadorServicioComponent,
  //  SigninComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    MatTabsModule,
    FormsModule,
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
    ReactiveFormsModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
