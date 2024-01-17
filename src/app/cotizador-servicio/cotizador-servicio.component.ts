import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCotizadorServicioComponent } from '../modal-cotizador-servicio/modal-cotizador-servicio.component';
import { CotizadorServicio } from '../_model/cotizadorServicio';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cotizador-servicio',
  templateUrl: './cotizador-servicio.component.html',
  styleUrls: ['./cotizador-servicio.component.scss']
})
export class CotizadorServicioComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  
  public cotizadorServicio: CotizadorServicio;

  tiposColaboradores: any[];
  sexos: any[];
  zonasLaborales: any[];
  cotizarClick: boolean;
  faPlus = faPlus;
  faMinus = faMinus;
  festivosInicial: number = 0;

  constructor(
    private http: HttpClient, private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.comboTiposColaboradores();
    this.comboSexos();
    this.inicializaObjetos();
    this.comboZonasLaborales();
  }

  inicializaObjetos() {
    this.cotizadorServicio = new CotizadorServicio();
    this.cotizadorServicio.idTipoColaborador = null;
    this.cotizadorServicio.idSexo = null;
    this.cotizadorServicio.fechaEntrada = null;
    this.cotizadorServicio.fechaSalida = null;
    this.cotizadorServicio.horas = null;
    this.cotizadorServicio.domingos = null;
    this.cotizadorServicio.autoPropio = false;
    this.cotizadorServicio.uber = false;
    this.cotizadorServicio.festivos = null;
    this.cotizadorServicio.cotizacion = null;

  }
  selected = new FormControl(0);

  onTipoColaborador(value: any) {
    this.cotizadorServicio.idTipoColaborador = value;
  }

  onSexo(value: any) {
    this.cotizadorServicio.idSexo = value;
  }

  onComisiones(value: any) {
    this.cotizadorServicio.comisiones = value;
  }

  onZonaLaboral(value: any) {
    this.cotizadorServicio.idZonaLaboral = value;
  }

  onCotizar() {
    this.cotizarClick = true;
    this.cotizadorServicio.cotizacion = "$" + this.cotizadorServicio.horas;
  }

  onFestivoPlus() {
    if(this.cotizadorServicio.horas) {
      this.cotizadorServicio.festivos += 1;
    }
  }

  onFestivoMinus() {
    if(this.cotizadorServicio.horas) {
      if(this.cotizadorServicio.festivos > this.festivosInicial) {
        this.cotizadorServicio.festivos -= 1;
      }
    }
  }

  onEntradaSalida() {
    if(this.cotizadorServicio.fechaEntrada && this.cotizadorServicio.fechaSalida && this.cotizadorServicio.fechaEntrada <= this.cotizadorServicio.fechaSalida ) {
      var dt1 = new Date(this.cotizadorServicio.fechaEntrada);
      var dt2 = new Date(this.cotizadorServicio.fechaSalida);
      this.cotizadorServicio.horas = (dt2.getTime()-dt1.getTime())/1000;
      this.cotizadorServicio.horas /= (60 * 60);
      this.cotizadorServicio.horas = Math.abs(Math.round(this.cotizadorServicio.horas));

      this.countDomingos([0],dt1,dt2);
      var loop = new Date(dt1);
      var febrero:boolean = false;
      var marzo = 0;
      var noviembre = 0;
      while(loop <= dt2){
        if (loop.getDate() == 1 && loop.getMonth() == 0) {
          this.cotizadorServicio.festivos += 1;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 1 && febrero == false) {
          this.cotizadorServicio.festivos += 1;
          febrero = true;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 2) {
          marzo += 1;
          if (marzo == 3) {
            this.cotizadorServicio.festivos += 1;
          }
        }
        if (loop.getDate() == 1 && loop.getMonth() == 4) {
          this.cotizadorServicio.festivos += 1;
        }
        if (loop.getDate() == 16 && loop.getMonth() == 8) {
          this.cotizadorServicio.festivos += 1;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 10) {
          noviembre += 1;
          if (noviembre == 3) {
            this.cotizadorServicio.festivos += 1;
          }
        }
        if (loop.getDate() == 25 && loop.getMonth() == 11) {
          this.cotizadorServicio.festivos += 1;
        }
        

        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        
      }
      this.festivosInicial = this.cotizadorServicio.festivos;

    }   
  }

  countDomingos( days, d0, d1 ) {
    var ndays = 1 + Math.round((d1-d0)/(24*3600*1000));
    var sum = function(a,b) {
      return a + Math.floor( ( ndays + (d0.getDay()+6-b) % 7 ) / 7 ); };
    this.cotizadorServicio.domingos = days.reduce(sum,0);
  }

  checkboxesAutoPropioUBER(index: number, event) {
    if (index == 0 && event) {
      this.cotizadorServicio.uber = false;
    }
    if (index > 0 && event) {
      this.cotizadorServicio.autoPropio = false;
    }
  }

  public comboTiposColaboradores() {
    this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
      this.tiposColaboradores = data.data;
    });
  }

  public comboZonasLaborales() {
    this.http.get<any>('/api/catalogo/zonasLaborales', this.httpOptions).subscribe(data => {
      this.zonasLaborales = data.data;
    });
  }

  public comboSexos() {
    this.http.get<any>('/api/catalogo/sexos', this.httpOptions).subscribe(data => {
      this.sexos = data.data;
    });
  }

  openDialog(idType): void {
      const dialogRef = this.dialog.open(ModalCotizadorServicioComponent, {
        width: '1110px',
        data: { data: idType }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    
  }

}
