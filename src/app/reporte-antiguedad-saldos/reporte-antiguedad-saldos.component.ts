import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-antiguedad-saldos',
  templateUrl: './reporte-antiguedad-saldos.component.html',
  styleUrls: ['./reporte-antiguedad-saldos.component.scss']
})
export class ReporteAntiguedadSaldosComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  deudores = [];
  cincoDiasSumaTotal: number = 0;
  diezDiasSumaTotal: number = 0;
  masQuinceDiasSumaTotal: number = 0;
  tiposColaboradores: any[];
  faFileExcel = faFileExcel;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDeudores();
  }

  public getDeudores() {
    this.http.get<any>('/api/antiguedadsaldos/deudores', this.httpOptions).subscribe(data => {
      this.deudores = data.data;
      // this.deudores.splice(0,14); //eliminar al subir a prod
      this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
        this.tiposColaboradores = data.data;
        console.log(this.tiposColaboradores);
        this.antiguedadSaldos();
      });
      console.log(this.deudores);
    });
  }

  public antiguedadSaldos() {
    let arraySize = this.deudores.length;
    let precioSumaSubTotal = 0;
    let pagosSumaSubTotal = 0;
    let cincoDiasSumaSubTotal = 0;
    let diezDiasSumaSubTotal = 0;
    let masQuinceDiasSumaSubTotal = 0;

    this.deudores.forEach((element, index) => {
      this.deudores[index]["nombreTipoServicio"] = "";
      this.deudores[index].nombreTipoServicio = this.tiposColaboradores[Number(this.deudores[index].idTipoServicio)-1].nombre;
      this.deudores[index].fechaCreacion = new Date(this.deudores[index].fechaCreacion);
      this.deudores[index].fechaCreacion = this.deudores[index].fechaCreacion.toISOString().split('T')[0];
      this.deudores[index]["pendienteCincoDias"] = 0;
      this.deudores[index]["pendienteDiezDias"] = 0;
      this.deudores[index]["pendienteMasQuinceDias"] = 0;
      this.deudores[index]["ultimo"] = false;
      this.deudores[index]["precioSubTotal"] = 0;
      this.deudores[index]["pagosSubTotal"] = 0;
      this.deudores[index]["cincoDiasSubTotal"] = 0;
      this.deudores[index]["diezDiasSubTotal"] = 0;
      this.deudores[index]["masQuinceDiasSubTotal"] = 0;
      this.deudores[index]["subTotal"] = false;

      if (element.diferenciaDias >= 5 && element.diferenciaDias < 10) {
        this.deudores[index].pendienteCincoDias = Number(this.deudores[index].cantidadPorPagar);
      } else {
        if (element.diferenciaDias >= 10 && element.diferenciaDias < 15) {
          this.deudores[index].pendienteDiezDias = Number(this.deudores[index].cantidadPorPagar);
        } else {
          if (element.diferenciaDias >= 15) {
            this.deudores[index].pendienteMasQuinceDias = Number(this.deudores[index].cantidadPorPagar);
          }
        }
      }

      if (index!=arraySize-1) {
        this.deudores[index].ultimo = false;
        if (element.cliente==this.deudores[index+1].cliente) {
          precioSumaSubTotal += Number(element.precioServicio);
          this.deudores[index].precioSubTotal = precioSumaSubTotal;
          pagosSumaSubTotal += Number(element.cantidadPagada);
          this.deudores[index].pagosSubTotal = pagosSumaSubTotal;
          cincoDiasSumaSubTotal += Number(element.pendienteCincoDias);
          this.deudores[index].cincoDiasSubTotal = cincoDiasSumaSubTotal;
          diezDiasSumaSubTotal += Number(element.pendienteDiezDias);
          this.deudores[index].diezDiasSubTotal = diezDiasSumaSubTotal;
          masQuinceDiasSumaSubTotal += Number(element.pendienteMasQuinceDias);
          this.deudores[index].masQuinceDiasSubTotal = masQuinceDiasSumaSubTotal;
        } else {
          precioSumaSubTotal += Number(element.precioServicio);
          this.deudores[index].precioSubTotal = precioSumaSubTotal;
          pagosSumaSubTotal += Number(element.cantidadPagada);
          this.deudores[index].pagosSubTotal = pagosSumaSubTotal;
          cincoDiasSumaSubTotal += Number(element.pendienteCincoDias);
          this.deudores[index].cincoDiasSubTotal = cincoDiasSumaSubTotal;
          diezDiasSumaSubTotal += Number(element.pendienteDiezDias);
          this.deudores[index].diezDiasSubTotal = diezDiasSumaSubTotal;
          masQuinceDiasSumaSubTotal += Number(element.pendienteMasQuinceDias);
          this.deudores[index].masQuinceDiasSubTotal = masQuinceDiasSumaSubTotal;
          this.deudores[index].subTotal = true;
          this.cincoDiasSumaTotal += cincoDiasSumaSubTotal;
          this.diezDiasSumaTotal += diezDiasSumaSubTotal;
          this.masQuinceDiasSumaTotal += masQuinceDiasSumaSubTotal;

          precioSumaSubTotal = 0;
          pagosSumaSubTotal = 0;
          cincoDiasSumaSubTotal = 0;
          diezDiasSumaSubTotal = 0;
          masQuinceDiasSumaSubTotal = 0;
        }
      } else {
          this.deudores[index].ultimo = true;
          precioSumaSubTotal += Number(element.precioServicio);
          this.deudores[index].precioSubTotal = precioSumaSubTotal;
          pagosSumaSubTotal += Number(element.cantidadPagada);
          this.deudores[index].pagosSubTotal = pagosSumaSubTotal;
          cincoDiasSumaSubTotal += Number(element.pendienteCincoDias);
          this.deudores[index].cincoDiasSubTotal = cincoDiasSumaSubTotal;
          diezDiasSumaSubTotal += Number(element.pendienteDiezDias);
          this.deudores[index].diezDiasSubTotal = diezDiasSumaSubTotal;
          masQuinceDiasSumaSubTotal += Number(element.pendienteMasQuinceDias);
          this.deudores[index].masQuinceDiasSubTotal = masQuinceDiasSumaSubTotal;
          this.deudores[index].subTotal = true;
          this.cincoDiasSumaTotal += cincoDiasSumaSubTotal;
          this.diezDiasSumaTotal += diezDiasSumaSubTotal;
          this.masQuinceDiasSumaTotal += masQuinceDiasSumaSubTotal;

      }

    });
  }

  public exportTableToExcel(): void {
    let fileName = 'antiguedadSaldos.xlsx';
    let element = document.getElementById('tablaAntiguedadSaldos');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  }

}
