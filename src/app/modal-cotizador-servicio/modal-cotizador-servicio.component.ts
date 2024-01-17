import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CotizadorServicio } from '../_model/cotizadorServicio';

export interface DialogData {
  data: any;
}
@Component({
  selector: 'app-modal-cotizador-servicio',
  templateUrl: './modal-cotizador-servicio.component.html',
  styleUrls: ['./modal-cotizador-servicio.component.scss']
})

export class ModalCotizadorServicioComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  selectedCodigoPostal = null;
  public cotizadorServicio: CotizadorServicio;
  colonias: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  paises: any[];

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  tipoModal: number = null;
  ngOnInit(): void {
    this.cotizadorServicio = new CotizadorServicio();
    this.comboPaises();
    this.cotizadorServicio.calle1 = null;
    this.cotizadorServicio.calle1 = null;
    this.cotizadorServicio.calle2 = null;
    this.cotizadorServicio.codigoPostal = null;
    this.cotizadorServicio.idPais = null;
    this.cotizadorServicio.idEstado = null;
    this.cotizadorServicio.idCiudad = null;
    this.cotizadorServicio.idColonia = null;
    this.cotizadorServicio.noExt = null;
    this.cotizadorServicio.noInt = null;
    this.cotizadorServicio.referenciaDireccion = null;
    if (this.data.data == 0) {
      this.tipoModal = this.data.data;
    } else if (this.data.data == 1) {
      this.tipoModal = this.data.data;
    }
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises', this.httpOptions).subscribe(data => {
      this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.cotizadorServicio.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal, this.httpOptions).subscribe(data => {
      this.colonias = data.data;
      this.cotizadorServicio.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad, this.httpOptions).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.cotizadorServicio.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado, this.httpOptions).subscribe(data => {
          this.estadosDir = data.data;
        });
      });
    });
  }

  onColonia(value: any) {
    this.cotizadorServicio.idColonia = value;
  }

}
