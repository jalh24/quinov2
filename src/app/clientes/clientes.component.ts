import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Cliente } from '../_model/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faUserNurse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ClienteFiltro } from '../_model/clienteFiltro';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientesComponent implements OnInit {
  faUserNurse = faUserNurse;
  faSignOutAlt = faSignOutAlt;
  @ViewChild(DataTableDirective, { static: false })
  
  clienteFiltro: ClienteFiltro;
  public cliente: Cliente;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tipoClientes: any;
  length: number;
  CLIENTE_DATA: Cliente[] = [];
  clienteSource = new MatTableDataSource<Cliente>(this.CLIENTE_DATA);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Token: localStorage.getItem('token')
    })
  };
  clienteColumns: string[] = ['nombre',  'telefono', 'correoElectronico','idTipoCliente', 'acciones', 'editar'];

  @ViewChild('clientesTable', { static: true }) clientesTable: MatTable<any>;
  
  constructor(private router: Router,
    private http: HttpClient) { 
    }

  ngOnInit(): void {
    this.resetFields();
    this.getClientes();
    this.comboTipoClientes();
  }

  public getClientes(event?: PageEvent) {
    
    this.clienteFiltro.limit = event != undefined ? event.pageSize : this.pageSize;
    this.clienteFiltro.start = event != undefined ? event.pageIndex : this.pageIndex;
    
    this.http.post<any>('/api/cliente',this.clienteFiltro,this.httpOptions).subscribe(data => {      
      this.CLIENTE_DATA = data.data;     
      this.clienteSource = new MatTableDataSource<Cliente>(this.CLIENTE_DATA);      
      this.length = data.count.total;
    });
    return event;
  }
  public agregarClienteFisico() {
    this.router.navigateByUrl("/clientefisico");
  }
  public agregarClienteMoral() {
    this.router.navigateByUrl("/clientemoral");
  }

  public resetFields() {
    this.clienteFiltro = new ClienteFiltro();
    this.clienteFiltro.idTipoCliente = "";   
    this.clienteFiltro.correoElectronico='';
  }

  public comboTipoClientes() {
    this.http.get<any>('/api/catalogo/tipoClientes',this.httpOptions).subscribe(data => {
     this.tipoClientes = data.data;
    });
  }

  ngAfterViewInit() {
    this.clienteSource.paginator = this.paginator;
  }
}
