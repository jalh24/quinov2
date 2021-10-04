import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Colaborador } from '../_model/colaborador';
import { HttpClient } from '@angular/common/http';
import { ColaboradorFiltro } from '../_model/colaboradorFiltro';
import {NgForm,FormControl} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradoresComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  colaborador:any=null;
  pageEvent: PageEvent;
  pageIndex:number=0;
  pageSize:number=5;
  length:number;
  COLABORADOR_DATA: Colaborador[] = [];
  colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
  colaboradorColumns: string[] = ['nombre','a_paterno', 'a_materno', 'estatura', 'peso'];
  @ViewChild('colaboradoresTable',{static:true}) colaboradoresTable: MatTable<any>;
  sexos: any;
  permanencias: any;
  zonasLaborales: any;
  colaboradorFiltro:ColaboradorFiltro;
  habilidades: any;
  habilidadesSelected =[];
  selectedItems:any = [];
  zonasSettings: IDropdownSettings = {};
  habilidadesSettings: IDropdownSettings = {};

  constructor(
    private router:Router,
    private http: HttpClient
  ){ this.colaboradorFiltro= new ColaboradorFiltro();}

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

  public getColaboradores(event?:PageEvent){
    this.colaboradorFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.colaboradorFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.colaboradorFiltro.habilidades = this.habilidadesSelected;
    this.colaboradorFiltro.zonasLaborales = this.selectedItems;
    this.http.post<any>('/api/colaborador',this.colaboradorFiltro).subscribe(data => {
        this.COLABORADOR_DATA = data.data;
        this.colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
        //this.colaborador = data.data;
        this.length = data.count.total;
    });   
    return event;
  }
  
  public comboSexos(){
    this.http.get<any>('/api/catalogo/sexos').subscribe(data => {
        this.sexos = data.data;
    });
  }

  public comboPermanencias(){
    this.http.get<any>('/api/catalogo/permanencias').subscribe(data => {
        this.permanencias = data.data;
    });
  }
  
  public comboZonasLaborales(){
    this.http.get<any>('/api/catalogo/zonasLaborales').subscribe(data => {
        this.zonasLaborales = data.data;
    });
  }

  public comboHabilidades(){
    this.http.get<any>('/api/catalogo/habilidades').subscribe(data => {
        this.habilidades = data.data;
    });
  }

  public agregarColaborador(){
    this.router.navigateByUrl("/colaborador");
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }

}
