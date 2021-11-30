import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faArrowRight, faFileExcel } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-reporte-servicio',
  templateUrl: './reporte-servicio.component.html',
  styleUrls: ['./reporte-servicio.component.scss']
})

export class ReporteServicioComponent implements OnInit {
  faArrowRight = faArrowRight;
  faFileExcel = faFileExcel;
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  servicio: any = null;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = Number.MAX_SAFE_INTEGER;
  length: number;
  SERVICIO_DATA: Servicio[] = [];
  servicioSource = new MatTableDataSource<Servicio>(this.SERVICIO_DATA);
  servicioColumns: string[] = ['idServicio', 'nombre', 'fechaCreacion', 'precioServicio', 'montoPagado', 'cantidadPorPagar'];
  @ViewChild('serviciosTable', { static: true }) serviciosTable: MatTable<any>;
  servicioFiltro: ServicioFiltro;
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
    this.getServicios();
  }

  ngAfterViewInit() {
    this.servicioSource.paginator = this.paginator;
  }

  public getServicios(event?: PageEvent) {
    this.servicioFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.servicioFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.http.post<any>('/api/servicio/lista', this.servicioFiltro, this.httpOptions).subscribe(data => {
      this.SERVICIO_DATA = data.data;
      this.servicioSource = new MatTableDataSource<Servicio>(this.SERVICIO_DATA);
      this.length = data.count.total;
      console.log(this.SERVICIO_DATA);
    });
    return event;
  }

  public resetFields() {
    this.servicioFiltro.fecha1 = null;
    this.servicioFiltro.fecha2 = null;
  }
}