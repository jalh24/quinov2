import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstadoCuentaFiltro } from '../_model/estadoCuentaFiltro';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import * as XLSX from 'xlsx';

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
  faFileExcel = faFileExcel;
  reporteFlag: boolean = false;
  flagSubTotal: boolean = false;
  flagLast: boolean = false;
  precioServicioTemp: number = 0;
  precioTotal: number = 0;
  precioSumaTotal: number = 0;
  montoSumaTotal: number = 0;
  pendienteSumaTotal: number = 0;
  precioServicioTempAnterior: number = 0;
  montoPagoTemp: number = 0;
  montoPagoTempAnterior: number = 0;
  tiposColaboradores: any[];
  constructor(private http: HttpClient) { this.estadoCuentaFiltro = new EstadoCuentaFiltro(); }

  ngOnInit(): void {
    this.comboPacientes();
    // this.getItems();

    this.pacientesSettings = {
      singleSelection: true,
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

  // public getItems(idCliente) {
  //   this.http.get<any>('/api/estadocuenta/listaPacientes?cliente=' + idCliente, this.httpOptions).subscribe(data => {
  //     this.ItemsArray = data.data;
  //     console.log(data.data);
  //     this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
  //       this.tiposColaboradores = data.data;
  //       console.log(this.tiposColaboradores);
  //       this.llenadoArreglo();
  //     });
  //   });
  // }

  public getItems(idCliente) {
    this.estadoCuentaFiltro.pacientes = this.pacientesSelected;
    this.http.post<any>('/api/estadocuenta/listaPacientes', this.estadoCuentaFiltro, this.httpOptions).subscribe(data => {
      this.ItemsArray = data.data;
      this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
        this.tiposColaboradores = data.data;
        console.log(this.tiposColaboradores);
        this.llenadoArreglo();
      });
    });
  }

  public llenadoArreglo() {
    let arraySize = this.ItemsArray.length;
    let precioSuma = 0;
    let pendienteSuma = 0;
    
    this.ItemsArray.forEach((element, index) => {
      this.ItemsArray[index]["nombreTipoServicio"] = "";
      this.ItemsArray[index].nombreTipoServicio = this.tiposColaboradores[Number(this.ItemsArray[index].idTipoServicio)-1].nombre;
      this.ItemsArray[index].fechaCreacion = new Date(this.ItemsArray[index].fechaCreacion);
      this.ItemsArray[index].fechaCreacion = this.ItemsArray[index].fechaCreacion.toISOString().split('T')[0];
      this.ItemsArray[index]["subTotal"] = false;
      this.ItemsArray[index]["montoSubTotal"] = 0;
      this.ItemsArray[index]["montoPendienteSubTotal"] = 0;
      this.ItemsArray[index]["ultimo"] = false;
      this.ItemsArray[index].monto = Number(this.ItemsArray[index].monto);
      this.ItemsArray[index].precioServicio = Number(this.ItemsArray[index].precioServicio);
      // if(this.idServicioAnterior==null) {
      //   this.idServicioAnterior=element.idServicio;
      //   // element["subTotal"] = true;
      //   // console.log(element);
      // }
      if (index!=arraySize-1) {
        this.ItemsArray[index].ultimo = false;
        if (element.idServicio==this.ItemsArray[index+1].idServicio) {
          precioSuma += element.monto;
          this.ItemsArray[index].montoSubTotal = precioSuma;
          if (index==0) {
            pendienteSuma = this.ItemsArray[index].precioServicio - this.ItemsArray[index].monto;
            this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
          } else {
            if (this.ItemsArray[index-1].subTotal == true) {
              pendienteSuma = this.ItemsArray[index].precioServicio - this.ItemsArray[index].monto;
              this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
            } else {
              pendienteSuma = pendienteSuma - this.ItemsArray[index].monto;
              this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
            }
            
          }
          
        } else {
          this.precioSumaTotal = this.precioSumaTotal + this.ItemsArray[index].precioServicio;
          precioSuma += element.monto;
          this.ItemsArray[index].montoSubTotal = precioSuma;
          this.ItemsArray[index].subTotal = true;
          this.montoSumaTotal += precioSuma;
          precioSuma = 0;
          if (index==0) {
            pendienteSuma = this.ItemsArray[index].precioServicio - this.ItemsArray[index].monto;
            this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
            this.pendienteSumaTotal += pendienteSuma;
          } else {
            if (this.ItemsArray[index-1].subTotal == true) {
              pendienteSuma = this.ItemsArray[index].precioServicio - this.ItemsArray[index].monto;
              this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
              this.pendienteSumaTotal += pendienteSuma;
            } else {
              pendienteSuma = pendienteSuma - this.ItemsArray[index].monto;
              this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
              this.pendienteSumaTotal += pendienteSuma;
            }
            
          }
          // pendienteSuma = pendienteSuma - this.ItemsArray[index].monto;
          // this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
          pendienteSuma = 0;
        }
      } else {
        this.ItemsArray[index].ultimo = true;
        this.precioSumaTotal = this.precioSumaTotal + this.ItemsArray[index].precioServicio;
        precioSuma += element.monto;
        this.ItemsArray[index].montoSubTotal = precioSuma;
        this.montoSumaTotal += precioSuma;
        this.ItemsArray[index].subTotal = true;
        if (this.ItemsArray[index-1].subTotal == true) {
          pendienteSuma = this.ItemsArray[index].precioServicio - this.ItemsArray[index].monto;
          this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
          this.pendienteSumaTotal += pendienteSuma;

        } else {
          pendienteSuma = pendienteSuma - this.ItemsArray[index].monto;
          this.ItemsArray[index].montoPendienteSubTotal = pendienteSuma;
          this.pendienteSumaTotal += pendienteSuma;
        }

      }
      
    });
    console.log(this.ItemsArray);
  }

  public onReporte() {
    this.precioSumaTotal = 0;
    this.montoSumaTotal = 0;
    this.pendienteSumaTotal = 0;
    console.log(this.pacientesSelected);
    this.reporteFlag = true;
    this.getItems(Number(this.pacientesSelected[0].idCliente));
  }

  public onDeSelectedPaciente(e) {
    this.precioSumaTotal = 0;
    this.montoSumaTotal = 0;
    this.pendienteSumaTotal = 0;
    this.reporteFlag=false;
    this.pacientesSelected = [];
    this.estadoCuentaFiltro.fecha1 = null;
    this.estadoCuentaFiltro.fecha2 = null;
  }

  public exportTableToExcel(): void {
    // const downloadLink = document.createElement('a');
    // const dataType = 'application/vnd.ms-excel';
    // const table = document.getElementById('tablaEstadoCuenta');
    // const tableHtml = table.outerHTML.replace(/ /g, '%20');
    // document.body.appendChild(downloadLink);
    // downloadLink.href = 'data:' + dataType + ' ' + tableHtml;
    // downloadLink.download = 'estadoCuenta.xls';
    // downloadLink.click();
    let fileName = 'estadoCuenta.xlsx';
    let element = document.getElementById('tablaEstadoCuenta');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  }
}
