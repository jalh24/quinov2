import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faBriefcaseMedical, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Servicio } from '../_model/servicio';
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
import { ServicioFiltro } from '../_model/servicioFiltro';

@Component({
  selector: 'app-gestion-servicio',
  templateUrl: './gestion-servicio.component.html',
  styleUrls: ['./gestion-servicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GestionServicioComponent implements OnInit {
  faBriefcaseMedical = faBriefcaseMedical;
  faArrowRight = faArrowRight;
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  servicio: any = null;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 25;
  length: number;
  SERVICIO_DATA: Servicio[] = [];
  servicioSource = new MatTableDataSource<Servicio>(this.SERVICIO_DATA);
  servicioColumns: string[] = ['idServicio', 'fechaCreacion','semanaAlta', 'nombre', 'responsable', 'estatus', 'estatusPago', 'cantidadPorPagar', 'acciones'];
  @ViewChild('serviciosTable', { static: true }) serviciosTable: MatTable<any>;
  responsables: any;
  pacientes: any;
  estatusOperaciones: any[];
  responsablesSelected = [];
  pacientesSelected = [];
  estatusPagos: any[];
  servicioFiltro: ServicioFiltro;
  responsablesSettings: IDropdownSettings = {};
  pacientesSettings: IDropdownSettings = {};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  constructor(
    private router: Router,
    private http: HttpClient, private dialog: MatDialog
  ) { this.servicioFiltro = new ServicioFiltro(); }

  ngOnInit(): void {
    this.comboResponsables();
    this.comboPacientes();
    this.getServicios();
    this.comboEstatusOperaciones();
    this.comboEstatusPagos();
    this.servicioFiltro.estatusOperativo = null;
    this.servicioFiltro.estatusPago = null;

    this.responsablesSettings = {
      singleSelection: false,
      idField: 'idResponsable',
      textField: 'nombre',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.pacientesSettings = {
      singleSelection: false,
      idField: 'cliente',
      textField: 'nombrecompleto',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onEstatusOperacion(value: any) {
    this.servicioFiltro.estatusOperativo = value;
  }

  onEstatusPago(value: any) {
    this.servicioFiltro.estatusPago = value;
  }

  public comboEstatusPagos() {
    this.http.get<any>('/api/catalogo/estatusPago', this.httpOptions).subscribe(data => {
      this.estatusPagos = data.data;
    });
  }

  public comboEstatusOperaciones() {
    this.http.get<any>('/api/catalogo/estatusOperacion', this.httpOptions).subscribe(data => {
      
      this.estatusOperaciones = data.data;
    });
  }

  public comboResponsables() {
    this.http.get<any>('/api/catalogo/responsables', this.httpOptions).subscribe(data => {
      this.responsables = data.data;
    });
  }

  public comboPacientes() {
    this.http.get<any>('/api/servicio/lista2', this.httpOptions).subscribe(data => {
      this.pacientes = data.data;
    });
  }

  public agregarServicio() {
    this.router.navigateByUrl("/altaservicios");
  }

  public crearReporte() {
    this.router.navigateByUrl("/reporteservicios");
  }

  public crearReporteColaborador() {
    this.router.navigateByUrl("/reportecolaborador");
  }

  ngAfterViewInit() {
    this.servicioSource.paginator = this.paginator;
  }

  public getServicios(event?: PageEvent) {
    this.servicioFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.servicioFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.servicioFiltro.start = this.servicioFiltro.limit * this.servicioFiltro.start;
    this.servicioFiltro.responsables = this.responsablesSelected;
    this.servicioFiltro.pacientes = this.pacientesSelected;
    this.http.post<any>('/api/servicio/lista', this.servicioFiltro, this.httpOptions).subscribe(data => {
      // this.SERVICIO_DATA = data.data;
      if (data.data.semanaAlta == 0) {
        data.data.semanaAlta = null;
      }
      this.SERVICIO_DATA = data.data;
     // this.SERVICIO_DATA.sort((a, b) => (a.idServicio > b.idServicio ? -1 : 1));

      this.servicioSource = new MatTableDataSource<Servicio>(this.SERVICIO_DATA);
      this.length = data.count.total;
      console.log(this.SERVICIO_DATA);
    });
    return event;
  }

  public modificacionServicio(item: any) {
    const url = '/altaservicios?idColaborador=' + item;
    this.router.navigateByUrl(url);
  }

  public resetFields() {
    this.servicioFiltro.fecha1 = null;
    this.servicioFiltro.fecha2 = null;
    this.responsablesSelected = null;
    this.pacientesSelected = null;
    this.servicioFiltro.estatus = null;
    this.servicioFiltro.estatusOperativo = null;
    this.servicioFiltro.estatusPago = null;
  }
}