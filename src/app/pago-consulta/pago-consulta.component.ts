import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faArrowRight, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTab } from '@angular/material/tabs';
import { ModalColaboradorComponent } from '../modal-colaborador/modal-colaborador.component';
import { faUserNurse, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Pago } from '../_model/pago';
import { Servicio } from '../_model/servicio';
import { PagoFiltro } from '../_model/pagoFiltro';

@Component({
  selector: 'app-pago-consulta',
  templateUrl: './pago-consulta.component.html',
  styleUrls: ['./pago-consulta.component.scss']
})
export class PagoConsultaComponent implements OnInit {
  faArrowRight = faArrowRight;
  faFileExcel = faFileExcel;
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pago: any = null;
  selectedPacienteItems: any = [];
  pacientes: any;
  pacientesSettings: IDropdownSettings = {};
  clientes: any;
  pagoFiltro: PagoFiltro;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = Number.MAX_SAFE_INTEGER;
  length: number;
  selectedItems: any = [];
  estatusPagos: any[];
  clientesSettings: IDropdownSettings = {};
  PAGO_DATA: Pago[] = [];
  pagoSource = new MatTableDataSource<Pago>(this.PAGO_DATA);
  pagoColumns: string[] = ['idPago', 'idServicio','nombre','montodePago', 'fechaCreacion', 'motivoPago', 'estatusPago'];
  @ViewChild('pagosTable', { static: true }) pagosTable: MatTable<any>;
  
  public servicio: Servicio;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  constructor(
    private router: Router,
    private http: HttpClient, private dialog: MatDialog
  ) { this.pagoFiltro = new PagoFiltro();
   }

  ngOnInit(): void {
    this.pagoFiltro = new PagoFiltro();
    this.pagoFiltro.estatusPago = null;
    this.getPagos();
    this.comboPacientes();
    this.comboEstatusPagos();

    this.pacientesSettings = {
      singleSelection: false,
      idField: 'cliente',
      textField: 'nombrecompleto',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  ngAfterViewInit() {
    this.pagoSource.paginator = this.paginator;
  }
  public comboPacientes() {
    this.http.get<any>('/api/servicio/lista2', this.httpOptions).subscribe(data => {
      
      this.pacientes = data.data;

      this.selectedItems = [{
        idPaciente: data.data[0].idPaciente,
        nombrecompleto: data.data[0].nombre
      }
      ];
      console.log(this.pacientes);
    });
  }
  public comboEstatusPagos() {
    this.http.get<any>('/api/catalogo/estatusPago', this.httpOptions).subscribe(data => {
      this.estatusPagos = data.data;
    });
  }
  public onDeselectPaciente(item: any) {
    this.inicializaObjetos();
  }
  inicializaObjetos() {
    this.servicio = new Servicio();
    this.servicio.precioServicio = null;
    
  }

  public onSelectedPaciente(item: any) {
    //this.onIdServicio(item.idServicio);
  }

  onEstatusPago(value: any) {
    this.pagoFiltro.estatusPago = value;
  }

  onSelectedCliente(item: any) {
    this.comboClientesById(item.idCliente);
    this.servicio.cliente = item.idCliente;
  }

  public getPagos(event?: PageEvent) {
    this.pagoFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.pagoFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.pagoFiltro.pacientes = this.selectedPacienteItems;
    console.log(this.pagoFiltro);
    this.http.post<any>('/api/pago', this.pagoFiltro, this.httpOptions).subscribe(data => {
      this.PAGO_DATA = data.data;
      this.pagoSource = new MatTableDataSource<Pago>(this.PAGO_DATA);
      this.length = data.count.total;
      console.log(this.PAGO_DATA);
    });
    return event;
  }

  public comboClientesById(idCliente) {
    this.http.get<any>('/api/catalogo/clientesById?idCliente=' + idCliente, this.httpOptions).subscribe(data => {
      this.servicio.nombre = data.data[0].nombre;
      this.servicio.a_paterno = data.data[0].a_paterno;
      this.servicio.a_materno = data.data[0].a_materno;
    });
  }
  public resetFields() {
    this.pagoFiltro.fecha1 = null;
    this.pagoFiltro.fecha2 = null;
    this.pagoFiltro.estatusPago = null;
  }

  public estadoCuenta() {
    this.router.navigateByUrl("/estadocuenta");
  }

  public antiguedadSaldos() {
    this.router.navigateByUrl("/antiguedadsaldos");
  }
}
