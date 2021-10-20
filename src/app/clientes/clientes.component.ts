import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Cliente } from '../_model/cliente';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faUserNurse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  length: number;
  CLIENTE_DATA: Cliente[] = [];
  clienteSource = new MatTableDataSource<Cliente>(this.CLIENTE_DATA);
  clienteColumns: string[] = ['nombre',  'telefono', 'correoElectronico'];

  @ViewChild('clientesTable', { static: true }) clientesTable: MatTable<any>;
  
  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
  }

  public getClientes() {
    this.http.get<any>('/api/cliente').subscribe(data => {      
      this.CLIENTE_DATA = data.data;     
      this.clienteSource = new MatTableDataSource<Cliente>(this.CLIENTE_DATA);      
      //this.length = data.count.total;
    });
  }
  public agregarClienteFisico() {
    this.router.navigateByUrl("/clientefisico");
  }
  public agregarClienteMoral() {
    this.router.navigateByUrl("/clientemoral");
  }
}
