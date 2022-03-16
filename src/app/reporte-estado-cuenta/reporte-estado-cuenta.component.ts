import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstadoCuentaFiltro } from '../_model/estadoCuentaFiltro';

@Component({
  selector: 'app-reporte-estado-cuenta',
  templateUrl: './reporte-estado-cuenta.component.html',
  styleUrls: ['./reporte-estado-cuenta.component.scss']
})
export class ReporteEstadoCuentaComponent implements OnInit {
  estadoCuentaFiltro: EstadoCuentaFiltro;
  pacientesSelected = [];
  ItemsArray = [];
  pacientesSettings: IDropdownSettings = {};
  pacientes: any;
  idServicioAnterior: any = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  flagSubTotal: boolean = false;
  flagLast: boolean = false;
  precioServicioTemp: number = 0;
  precioTotal: number = 0;
  precioServicioTempAnterior: number = 0;
  montoPagoTemp: number = 0;
  montoPagoTempAnterior: number = 0;
  constructor(private http: HttpClient) { this.estadoCuentaFiltro = new EstadoCuentaFiltro(); }

  ngOnInit(): void {
    this.comboPacientes();
    this.getItems();

    this.pacientesSettings = {
      singleSelection: false,
      idField: 'idCliente',
      textField: 'nombrecompleto',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public comboPacientes() {
    this.http.get<any>('/api/estadocuenta/pacientes', this.httpOptions).subscribe(data => {
      this.pacientes = data.data;
    });
  }

  public getItems() {
    let i = 42;
    this.http.get<any>('/api/estadocuenta/listaPacientes?cliente=' + i, this.httpOptions).subscribe(data => {
      this.ItemsArray = data.data;
      console.log(data.data);
    });
  }

  public calculo(value) {
    value.monto = Number(value.monto);
    value.fechaCreacion = new Date(value.fechaCreacion);
    value.fechaCreacion = value.fechaCreacion.toISOString().split('T')[0];
    if(this.idServicioAnterior==null) {
      this.idServicioAnterior=value.idServicio;
    }
    if(value.idServicio!=this.idServicioAnterior){
      this.flagLast = false;
      this.idServicioAnterior = value.idServicio;
      this.flagSubTotal = true;
      this.precioServicioTempAnterior = this.precioServicioTemp;
      this.precioServicioTemp = value.precioServicio;
      this.montoPagoTempAnterior = this.montoPagoTemp;
      this.montoPagoTemp = value.monto;
      if (value==this.ItemsArray[this.ItemsArray.length-1]) {
        this.precioTotal += this.montoPagoTemp;
        this.flagLast = true;
      } else {
        this.flagLast = false;
        this.precioTotal += this.montoPagoTempAnterior;
      }
    } else {
      this.flagLast = false;
      this.flagSubTotal = false;
      this.montoPagoTempAnterior = this.montoPagoTemp;
      this.montoPagoTemp = this.montoPagoTemp+value.monto;
    }
  }

}
