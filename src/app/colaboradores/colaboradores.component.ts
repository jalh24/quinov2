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
  diasLaboralesSelected=[];
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
      console.log(data.data[0]);
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '1110px',
        data: { data: data.data[0] }
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
    this.http.post<any>('/api/colaborador', this.colaboradorFiltro).subscribe(data => {
      this.COLABORADOR_DATA = data.data;
      this.colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
      //this.colaborador = data.data;
      this.length = data.count.total;
    });
    return event;
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

@Component({
  selector: 'modal',
  templateUrl: './modal.html',

  styleUrls: ['./colaboradores.component.scss'],
})
export class DialogOverviewExampleDialog {
  colaborador: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.getColaboradores2();

  }

  public getColaboradores2(event?: PageEvent) {
    console.log(this.data);
    if (this.data) {
      this.colaborador = this.data.data;
    }
    return event;
  }



}