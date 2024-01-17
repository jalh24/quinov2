import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogData } from '../gestion-servicio/gestion-servicio.component';
import { HistorialServicio } from '../_model/historialservicio';

@Component({
  selector: 'app-modal-bitacoras-servicio',
  templateUrl: './modal-bitacoras-servicio.component.html',
  styleUrls: ['./modal-bitacoras-servicio.component.scss']
})
export class ModalBitacorasServicioComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  bitacoras: any[];

  constructor(public dialogRef: MatDialogRef<ModalBitacorasServicioComponent>, private router:Router, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit(): void {
    this.inicializaObjetos();
  }

  inicializaObjetos() {
    this.bitacoras = this.data.data;
    this.bitacoras = this.bitacoras.reverse();
    this.bitacoras.forEach((element, index) => {
      if (element.desayuno == 0) {
        this.bitacoras[index].desayuno = "NA";
      } else {
        if (element.desayuno == 1) {
          this.bitacoras[index].desayuno = "Nada";
        } else {
          if (element.desayuno == 2) {
            this.bitacoras[index].desayuno = "Poco";
          } else {
            if (element.desayuno == 3) {
              this.bitacoras[index].desayuno = "Normal";
            } else {
              if (element.desayuno == 4) {
                this.bitacoras[index].desayuno = "Más de lo normal";
              } else {
                if (element.desayuno == 5) {
                  this.bitacoras[index].desayuno = "Mucho";
                }
              }
            }
          }
        }
      }
      if (element.comida == 0) {
        this.bitacoras[index].comida = "NA";
      } else {
        if (element.comida == 1) {
          this.bitacoras[index].comida = "Nada";
        } else {
          if (element.comida == 2) {
            this.bitacoras[index].comida = "Poco";
          } else {
            if (element.comida == 3) {
              this.bitacoras[index].comida = "Normal";
            } else {
              if (element.comida == 4) {
                this.bitacoras[index].comida = "Más de lo normal";
              } else {
                if (element.comida == 5) {
                  this.bitacoras[index].comida = "Mucho";
                }
              }
            }
          }
        }
      }
      if (element.cena == 0) {
        this.bitacoras[index].cena = "NA";
      } else {
        if (element.cena == 1) {
          this.bitacoras[index].cena = "Nada";
        } else {
          if (element.cena == 2) {
            this.bitacoras[index].cena = "Poco";
          } else {
            if (element.cena == 3) {
              this.bitacoras[index].cena = "Normal";
            } else {
              if (element.cena == 4) {
                this.bitacoras[index].cena = "Más de lo normal";
              } else {
                if (element.cena == 5) {
                  this.bitacoras[index].cena = "Mucho";
                }
              }
            }
          }
        }
      }

      this.bitacoras[index].actividad = element.actividad.replace("[",'').replace("]",'').split(",");
      this.bitacoras[index].actividad.forEach((element1, index1) => {
        this.bitacoras[index].actividad[index1] = parseInt(element1);
        switch (this.bitacoras[index].actividad[index1]) {
          case 0:
            this.bitacoras[index].actividad[index1] = "Durmió";
            break;
          case 1:
            this.bitacoras[index].actividad[index1] = "Caminó";
            break;
          case 2:
            this.bitacoras[index].actividad[index1] = "Vió TV";
            break;
          case 3:
            this.bitacoras[index].actividad[index1] = "Tomó el Sol";
            break;
          case 4:
            this.bitacoras[index].actividad[index1] = "Se bañó";
            break;
          case 5:
            this.bitacoras[index].actividad[index1] = "B. Asistido";
            break;
          case 6:
            this.bitacoras[index].actividad[index1] = "Se ejercitó";
            break;
          case 7:
            this.bitacoras[index].actividad[index1] = "Se estimuló";
            break;
          case 8:
            this.bitacoras[index].actividad[index1] = "Se rotó";
            break;
          case 9:
            this.bitacoras[index].actividad[index1] = "Orinó";
            break;
          case 10:
            this.bitacoras[index].actividad[index1] = "C. Pañal";
            break;
          case 11:
            this.bitacoras[index].actividad[index1] = "Vomitó";
            break;
          case 12:
            this.bitacoras[index].actividad[index1] = "V. Familiar";
            break;
          case 13:
            this.bitacoras[index].actividad[index1] = "S. Familiar";
            break;
          
          default:
            break;
        }

        // this.bitacoras[index].idEstadoAnimo = parseInt(element.idEstadoAnimo);
        switch (this.bitacoras[index].idEstadoAnimo) {
          case "0":
            this.bitacoras[index].idEstadoAnimo = "NA";
            break;
          case "1":
            this.bitacoras[index].idEstadoAnimo = "Feliz";
            break;
          case "2":
            this.bitacoras[index].idEstadoAnimo = "Buen Humor";
            break;
          case "3":
            this.bitacoras[index].idEstadoAnimo = "Amoroso";
            break;
          case "4":
            this.bitacoras[index].idEstadoAnimo = "Triste";
            break;
          case "5":
            this.bitacoras[index].idEstadoAnimo = "Decaído";
            break;
          case "6":
            this.bitacoras[index].idEstadoAnimo = "Deprimido";
            break;
          case "7":
            this.bitacoras[index].idEstadoAnimo = "Asustado";
            break;
          case "8":
            this.bitacoras[index].idEstadoAnimo = "Enojado";
            break;
          case "9":
            this.bitacoras[index].idEstadoAnimo = "Nostálgico";
            break;
          case "10":
            this.bitacoras[index].idEstadoAnimo = "Aburrido";
            break;
          case "11":
            this.bitacoras[index].idEstadoAnimo = "Tranquilo";
            break;
          case "12":
            this.bitacoras[index].idEstadoAnimo = "Ansioso";
            break;
          case "13":
            this.bitacoras[index].idEstadoAnimo = "Con Asco";
            break;
          case "14":
            this.bitacoras[index].idEstadoAnimo = "Con Dolor";
            break;
          case "15":
            this.bitacoras[index].idEstadoAnimo = "Agresivo";
            break;
          case "16":
            this.bitacoras[index].idEstadoAnimo = "Ausente";
            break;
          case "17":
            this.bitacoras[index].idEstadoAnimo = "Preocupado";
            break;
          case "18":
            this.bitacoras[index].idEstadoAnimo = "Desesperado";
            break;
        
          default:
            break;
        }

        if (this.bitacoras[index].glucosa == "0") {
          this.bitacoras[index].glucosa = "NA";
        }
        if (this.bitacoras[index].saturacionOxigeno == "0") {
          this.bitacoras[index].saturacionOxigeno = "NA";
        }
      });
    });
    console.log(this.bitacoras);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
