import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Colaborador } from '../_model/colaborador';
import { HttpClient } from '@angular/common/http';
import { ColaboradorFiltro } from '../_model/colaboradorFiltro';
import { NgForm, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTab } from '@angular/material/tabs';
import { ModalColaboradorComponent } from '../modal-colaborador/modal-colaborador.component';
import { faUserNurse, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  data: any;
}
@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradoresComponent implements OnInit {
  faUserNurse = faUserNurse;
  faTimes = faTimes;
  idModal: string;
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  colaborador: any = null;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  COLABORADOR_DATA: Colaborador[] = [];
  colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
  colaboradorColumns: string[] = ['nombre', 'a_paterno', 'a_materno', 'telefono', 'correoElectronico','idCalificacion', 'acciones'];
  @ViewChild('colaboradoresTable', { static: true }) colaboradoresTable: MatTable<any>;
  sexos: any;
  diasLaborales: any = [] = [
    {id: 1, nombre: 'Lunes'},
    {id: 2, nombre: 'Martes'},
    {id: 3, nombre: 'Miercoles'},
    {id: 4, nombre: 'Jueves'},
    {id: 5, nombre: 'Viernes'},
    {id: 6, nombre: 'Sabado'},
    {id: 7, nombre: 'Domingo'},
  ];
  permanencias: any;
  zonasLaborales: any;
  colaboradorFiltro: ColaboradorFiltro;
  habilidades: any;
  habilidadesSelected = [];
  diasLaboralesSelected = [];
  selectedItems: any = [];
  diasLaboralesSettings: IDropdownSettings = {};
  zonasSettings: IDropdownSettings = {};
  habilidadesSettings: IDropdownSettings = {};

  constructor(
    private router: Router,
    private http: HttpClient, private dialog: MatDialog
  ) { this.colaboradorFiltro = new ColaboradorFiltro(); }

  openDialog(idCol): void {
    this.http.post<any>('/api/colaborador/colaboradorId', { idColaborador: idCol }).subscribe(data => {
      let envio = data.data[0];
      envio.cuentasColaborador=data.data.cuentas;
      envio.estudios = data.data.estudios;
      envio.experiencia = data.data.experiencia;
      const dialogRef = this.dialog.open(ModalColaboradorComponent, {
        width: '1110px',
        data: { data: envio }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });

  }

  ngOnInit(): void {
    this.getColaboradores();
    this.comboSexos();
    this.comboPermanencias();
    this.comboZonasLaborales();
    this.comboHabilidades();

    this.zonasSettings = {
      singleSelection: false,
      idField: 'idZonaLaboral',
      textField: 'nombre',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.diasLaboralesSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Todos los dias',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.habilidadesSettings = {
      singleSelection: false,
      idField: 'idHabilidad',
      textField: 'nombre',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngAfterViewInit() {
    this.colaboradorSource.paginator = this.paginator;
  }


  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  public getColaboradores(event?: PageEvent) {
    this.colaboradorFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.colaboradorFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.colaboradorFiltro.habilidades = this.habilidadesSelected;
    this.colaboradorFiltro.zonasLaborales = this.selectedItems;
    this.colaboradorFiltro.diasLaborales = this.diasLaboralesSelected;
    console.log(this.colaboradorFiltro.diasLaborales);
    this.http.post<any>('/api/colaborador', this.colaboradorFiltro).subscribe(data => {
      this.COLABORADOR_DATA = data.data;
      this.colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
      //this.colaborador = data.data;
      this.length = data.count.total;
    });
    return event;
  }
  
  public resetFieldGenero() {
    this.colaboradorFiltro.genero = null;
  }

  public resetFieldPermanencia() {
    this.colaboradorFiltro.permanencia = null;
  }

  public resetFieldTurnoLaboral() {
    this.colaboradorFiltro.turnoHorario = null;
  }

  public resetFields() {
    this.colaboradorFiltro.edad1 = null;
    this.colaboradorFiltro.edad2 = null;
    this.colaboradorFiltro.peso1 = null;
    this.colaboradorFiltro.peso2 = null;
    this.colaboradorFiltro.genero = null;
    this.colaboradorFiltro.estatura1 = null;
    this.colaboradorFiltro.estatura2 = null;
    this.colaboradorFiltro.calificacion1 = null;
    this.colaboradorFiltro.calificacion2 = null;
    this.colaboradorFiltro.permanencia = null;
    this.colaboradorFiltro.zonasLaborales = null;
    this.colaboradorFiltro.diasLaborales = null;
    this.colaboradorFiltro.turnoHorario = null;
    this.colaboradorFiltro.atiendeCovid = null;
    this.colaboradorFiltro.antecedentePenales = null;
    this.colaboradorFiltro.autoPropio = null;
    this.colaboradorFiltro.dispuestoViajar = null;
    this.colaboradorFiltro.especialidades = null;
    this.colaboradorFiltro.habilidades = null;
    this.habilidadesSelected = null;
    this.selectedItems = null;
    this.diasLaboralesSelected = null;
  }

  public comboSexos() {
    this.http.get<any>('/api/catalogo/sexos').subscribe(data => {
      this.sexos = data.data;
    });
  }

  public comboPermanencias() {
    this.http.get<any>('/api/catalogo/permanencias').subscribe(data => {
      this.permanencias = data.data;
    });
  }
  
  public comboZonasLaborales() {
    this.http.get<any>('/api/catalogo/zonasLaborales').subscribe(data => {
      this.zonasLaborales = data.data;
    });
  }

  public comboHabilidades() {
    this.http.get<any>('/api/catalogo/habilidades').subscribe(data => {
      this.habilidades = data.data;
    });
  }

  public agregarColaborador() {
    this.router.navigateByUrl("/colaborador");
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
