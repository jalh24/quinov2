import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Colaborador } from '../_model/colaborador';
import { HttpClient } from '@angular/common/http';
import { ColaboradorFiltro } from '../_model/colaboradorFiltro';
@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;

  colaborador:any=null;
  
  COLABORADOR_DATA: Colaborador[] = [];
  colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
  colaboradorColumns: string[] = ['nombre','a_paterno', 'a_materno', 'estatura', 'peso'];
  @ViewChild('colaboradoresTable',{static:true}) colaboradoresTable: MatTable<any>;
  sexos: any;
  permanencias: any;
  zonasLaborales: any;
  colaboradorFiltro:ColaboradorFiltro;
  habilidades: any;

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
  }
 
  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  public getColaboradores(){
    console.log(this.colaboradorFiltro);
    this.http.post<any>('/api/colaborador',this.colaboradorFiltro).subscribe(data => {
        this.COLABORADOR_DATA = data.data;
        this.colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
        //this.colaborador = data.data;
    });   
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
}
