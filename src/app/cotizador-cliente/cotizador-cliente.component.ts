import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { faHandHoldingMedical, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CotizadorCliente } from '../_model/cotizadorCliente';

@Component({
  selector: 'app-cotizador-cliente',
  templateUrl: './cotizador-cliente.component.html',
  styleUrls: ['./cotizador-cliente.component.scss']
})
export class CotizadorClienteComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  
  faHandHoldingMedical = faHandHoldingMedical;
  faQuestionCircle = faQuestionCircle;
  precioLista: boolean;
  paquetes: boolean;
  poliza: boolean;
  festivosInicial: number = 0;

  public cotizadorCliente: CotizadorCliente;

  pagosPersonal: any[];
  preciosCliente: any[];

  costoTurnoBajo: any[];
  costoTurnoMedio: any[];
  costoTurnoAlto: any[];
  gastoServicio: any[];
  gastoServicioBajo: any[];
  gastoServicioMedio: any[];
  gastoServicioAlto: any[];
  polizas: any[];


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  cotizarClick: boolean = false;
  fueraAreaFlag: boolean = false;
  domingoLunes: boolean = false;
  consecutivos: boolean = false;
  cuidadorFlag: boolean = false;
  enfermeroFlag: boolean = false;
  enfermeroCovidFlag: boolean = false;

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.precioLista = true;
    this.paquetes = false;
    this.poliza = false;
    this.inicializaObjetos();
  }

  inicializaObjetos() {
    this.cotizadorCliente = new CotizadorCliente();
    this.cotizadorCliente.idTipoColaborador = null;
    this.cotizadorCliente.idSexo = null;
    this.cotizadorCliente.fechaEntrada = null;
    this.cotizadorCliente.fechaSalida = null;
    this.cotizadorCliente.horas = 4;
    this.cotizadorCliente.dias = 0;
    this.cotizadorCliente.domingos = null;
    this.cotizadorCliente.autoPropio = false;
    this.cotizadorCliente.uber = false;
    this.cotizadorCliente.festivos = null;
    this.cotizadorCliente.cotizacion = null;
    this.cotizadorCliente.hospital = 0;
    this.cotizadorCliente.fueraArea = 0;
    this.cotizadorCliente.masculino = 0;
    this.cotizadorCliente.noTaxis = 0;
    this.cotizadorCliente.domingo = 0;
    this.cotizadorCliente.asueto = 0;
    this.cotizadorCliente.cotizacion = 0;
    this.cotizadorCliente.precioListaCuidador = 0;
    this.cotizadorCliente.precioListaEnfermera = 0;
    this.cotizadorCliente.precioListaEnfermeraCovid = 0;
    this.cotizadorCliente.precioListaCuidadorPorDia = 0;
    this.cotizadorCliente.precioListaEnfermeraPorDia = 0;
    this.cotizadorCliente.precioListaEnfermeraCovidPorDia = 0;
    this.cotizadorCliente.precioPaqueteCuidador = 0;
    this.cotizadorCliente.precioPaqueteEnfermera = 0;
    this.cotizadorCliente.precioPaqueteEnfermeraCovid = 0;
    this.cotizadorCliente.precioPaqueteCuidadorPorDia = 0;
    this.cotizadorCliente.precioPaqueteEnfermeraPorDia = 0;
    this.cotizadorCliente.precioPaqueteEnfermeraCovidPorDia = 0;
    this.cotizadorCliente.polizaCuidadora1 = 0;
    this.cotizadorCliente.polizaCuidadora2 = 0;
    this.cotizadorCliente.polizaCuidadora3 = 0;
    this.cotizadorCliente.polizaCuidadora4 = 0;
    this.cotizadorCliente.polizaEnfermera1 = 0;
    this.cotizadorCliente.polizaEnfermera2 = 0;
    this.cotizadorCliente.polizaEnfermera3 = 0;
    this.cotizadorCliente.polizaEnfermera4 = 0;
    this.cotizadorCliente.polizaEnfermeraCovid1 = 0;
    this.cotizadorCliente.polizaEnfermeraCovid2 = 0;
    this.cotizadorCliente.polizaEnfermeraCovid3 = 0;
    this.cotizadorCliente.polizaEnfermeraCovid4 = 0;
    this.cotizadorCliente.tipoServicio = 1;
    this.cotizadorCliente.generoColaborador = 3;
    this.comboDatos();
  }

  onEntradaSalida() {
    if(this.cotizadorCliente.fechaEntrada && this.cotizadorCliente.fechaSalida && this.cotizadorCliente.fechaEntrada <= this.cotizadorCliente.fechaSalida ) {
      var dt1 = new Date(this.cotizadorCliente.fechaEntrada);
      var dt2 = new Date(this.cotizadorCliente.fechaSalida);
      dt1.setDate(dt1.getDate()+1);
      dt2.setDate(dt2.getDate()+1);
      dt1.setHours(0,0,0,0);
      dt2.setHours(0,0,0,0);
      this.cotizadorCliente.dias = Math.abs(dt2.valueOf() - dt1.valueOf());
      this.cotizadorCliente.dias = (this.cotizadorCliente.dias / (1000 * 60 * 60 * 24))+1;
      console.log(this.cotizadorCliente.dias);
      // this.cotizadorCliente.horas = (dt2.getTime()-dt1.getTime())/1000;
      // this.cotizadorCliente.horas /= (60 * 60);
      // this.cotizadorCliente.horas = Math.abs(Math.round(this.cotizadorCliente.horas));

      this.countDomingos([0],dt1,dt2);
      var loop = new Date(dt1);
      var febrero:boolean = false;
      var marzo = 0;
      var noviembre = 0;
      while(loop <= dt2){
        if (loop.getDate() == 1 && loop.getMonth() == 0) {
          this.cotizadorCliente.festivos += 1;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 1 && febrero == false) {
          this.cotizadorCliente.festivos += 1;
          febrero = true;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 2) {
          marzo += 1;
          if (marzo == 3) {
            this.cotizadorCliente.festivos += 1;
          }
        }
        if (loop.getDate() == 1 && loop.getMonth() == 4) {
          this.cotizadorCliente.festivos += 1;
        }
        if (loop.getDate() == 16 && loop.getMonth() == 8) {
          this.cotizadorCliente.festivos += 1;
        }
        if (loop.getDay() == 1 && loop.getMonth() == 10) {
          noviembre += 1;
          if (noviembre == 3) {
            this.cotizadorCliente.festivos += 1;
          }
        }
        if (loop.getDate() == 25 && loop.getMonth() == 11) {
          this.cotizadorCliente.festivos += 1;
        }
        

        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        
      }
      this.festivosInicial = this.cotizadorCliente.festivos;
    }   
  }

  countDomingos( days, d0, d1 ) {
    var ndays = 1 + Math.round((d1-d0)/(24*3600*1000));
    var sum = function(a,b) {
      return a + Math.floor( ( ndays + (d0.getDay()+6-b) % 7 ) / 7 ); };
    this.cotizadorCliente.domingos = days.reduce(sum,0);
  }

  onPlus() {
    if (this.cotizadorCliente.horas == 4) {
      this.cotizadorCliente.horas = 8;
    } else {
      if (this.cotizadorCliente.horas == 8) {
        this.cotizadorCliente.horas = 10;
      } else {
        if (this.cotizadorCliente.horas == 10) {
          this.cotizadorCliente.horas = 12;
        } else {
          if (this.cotizadorCliente.horas == 12) {
            this.cotizadorCliente.horas = 24;
          } else {
            this.cotizadorCliente.horas = this.cotizadorCliente.horas;
          }
        }
      }
    }
  }

  onMinus() {
    if (this.cotizadorCliente.horas == 24) {
      this.cotizadorCliente.horas = 12;
    } else {
      if (this.cotizadorCliente.horas == 12) {
        this.cotizadorCliente.horas = 10;
      } else {
        if (this.cotizadorCliente.horas == 10) {
          this.cotizadorCliente.horas = 8;
        } else {
          if (this.cotizadorCliente.horas == 8) {
            this.cotizadorCliente.horas = 4;
          } else {
            this.cotizadorCliente.horas = this.cotizadorCliente.horas;
          }
        }
      }
    }
  }

  onPlusDias() {
    if (this.cotizadorCliente.dias <= 7 && this.cotizadorCliente.dias > 0) {
      if (this.cotizadorCliente.dias + 1 < 8) {
        this.cotizadorCliente.dias += 1;
      }
    }
  }

  onMinusDias() {
    if (this.cotizadorCliente.dias <= 7 && this.cotizadorCliente.dias > 0) {
      if (this.cotizadorCliente.dias - 1 > 0) {
        this.cotizadorCliente.dias -= 1;
      }
    }
  }

  onPlusTaxis() {
    if (this.cotizadorCliente.noTaxis <= 2 && this.cotizadorCliente.noTaxis > 0) {
      if (this.cotizadorCliente.noTaxis + 1 < 3) {
        this.cotizadorCliente.noTaxis += 1;
      }
    }
  }

  onMinusTaxis() {
    if (this.cotizadorCliente.noTaxis <= 2 && this.cotizadorCliente.noTaxis > 0) {
      if (this.cotizadorCliente.noTaxis - 1 > 0) {
        this.cotizadorCliente.noTaxis -= 1;
      }
    }
  }

  public comboDatos() {
    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 1).subscribe(data => {
      this.costoTurnoBajo = data.costoServicio;
      this.gastoServicioBajo = data.gastoServicio;
      this.costoTurnoBajo.forEach((value,index) => {
        this.costoTurnoBajo[index].costo = Number(this.costoTurnoBajo[index].costo);
      });
      this.gastoServicioBajo.forEach((value,index) => {
        this.gastoServicioBajo[index].porcentaje = Number(this.gastoServicioBajo[index].porcentaje);
        if (this.gastoServicioBajo[index].cantidad) {
          this.gastoServicioBajo[index].cantidad = Number(this.gastoServicioBajo[index].cantidad);
        }
      });
      console.log(this.costoTurnoBajo);
    });
    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 2).subscribe(data => {
      this.costoTurnoMedio = data.costoServicio;
      this.gastoServicioMedio = data.gastoServicio;
      this.costoTurnoMedio.forEach((value,index) => {
        this.costoTurnoMedio[index].costo = Number(this.costoTurnoMedio[index].costo);
      });
      this.gastoServicioMedio.forEach((value,index) => {
        this.gastoServicioMedio[index].porcentaje = Number(this.gastoServicioMedio[index].porcentaje);
        if (this.gastoServicioMedio[index].cantidad) {
          this.gastoServicioMedio[index].cantidad = Number(this.gastoServicioMedio[index].cantidad);
        }
      });
      console.log(this.costoTurnoMedio);
    });
    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 3).subscribe(data => {
      this.costoTurnoAlto = data.costoServicio;
      this.gastoServicioAlto = data.gastoServicio;
      this.costoTurnoAlto.forEach((value,index) => {
        this.costoTurnoAlto[index].costo = Number(this.costoTurnoAlto[index].costo);
      });
      this.gastoServicioAlto.forEach((value,index) => {
        this.gastoServicioAlto[index].porcentaje = Number(this.gastoServicioAlto[index].porcentaje);
        if (this.gastoServicioAlto[index].cantidad) {
          this.gastoServicioAlto[index].cantidad = Number(this.gastoServicioAlto[index].cantidad);
        }
      });
      console.log(this.costoTurnoAlto);
    });
    console.log("antes metodo");
    this.http.get<any>('/api/cotizador/datosCotizador').subscribe(data => {
      console.log(data);
      this.polizas = data.polizas;
      this.pagosPersonal = data.pagosPersonal;
      this.preciosCliente = data.preciosCliente;
      this.polizas.forEach((value,index) => {
        this.polizas[index].precio = Number(this.polizas[index].precio);
      });
      this.pagosPersonal.forEach((value,index) => {
        this.pagosPersonal[index].pago = Number(this.pagosPersonal[index].pago);
      });
      this.preciosCliente.forEach((value,index) => {
        this.preciosCliente[index].pago = Number(this.preciosCliente[index].pago);
      });
      console.log(this.polizas);
      console.log(this.pagosPersonal);
      console.log(this.preciosCliente);
    });
  }

  ifDiaSelect(event) {
    if ( event.target.checked ) {
      this.cotizadorCliente.dias += 1;
    } else {
      if ( !event.target.checked ) {
        this.cotizadorCliente.dias -= 1;
      }
    }
  }

  onCotizar() {
    this.cotizarClick = true;
    // var domingo = <HTMLInputElement> document.getElementById("domingo");
    // var festivo = <HTMLInputElement> document.getElementById("festivo");
    var fueraArea = <HTMLInputElement> document.getElementById("fueraArea");
    var hospital = <HTMLInputElement> document.getElementById("hospital");
    // var masculino = <HTMLInputElement> document.getElementById("masculino");
    var lunes = <HTMLInputElement> document.getElementById("lunes");
    var martes = <HTMLInputElement> document.getElementById("martes");
    var miercoles = <HTMLInputElement> document.getElementById("miercoles");
    var jueves = <HTMLInputElement> document.getElementById("jueves");
    var viernes = <HTMLInputElement> document.getElementById("viernes");
    var sabado = <HTMLInputElement> document.getElementById("sabado");
    var domingo = <HTMLInputElement> document.getElementById("domingo");
    var diasSemana:number[] = [];

    if (lunes.checked == true) {
      diasSemana.push(1);
    }
    if (martes.checked == true) {
      diasSemana.push(2);
    }
    if (miercoles.checked == true) {
      diasSemana.push(3);
    }
    if (jueves.checked == true) {
      diasSemana.push(4);
    }
    if (viernes.checked == true) {
      diasSemana.push(5);
    }
    if (sabado.checked == true) {
      diasSemana.push(6);
    }
    if (domingo.checked == true) {
      diasSemana.push(7);
    }

    if (this.cotizadorCliente.tipoServicio == 1) {
      this.cuidadorFlag = true;
      this.enfermeroFlag = false;
      this.enfermeroCovidFlag = false;
    } else {
      if (this.cotizadorCliente.tipoServicio == 2) {
        this.cuidadorFlag = false;
        this.enfermeroFlag = true;
        this.enfermeroCovidFlag = false;
      } else {
        if (this.cotizadorCliente.tipoServicio == 3) {
          this.cuidadorFlag = false;
          this.enfermeroFlag = false;
          this.enfermeroCovidFlag = true;
        }
      }
    }

    if (this.cotizadorCliente.generoColaborador == 1) {
      this.cotizadorCliente.masculino = 1;
    } else {
      if (this.cotizadorCliente.generoColaborador == 2) {
        this.cotizadorCliente.masculino = 0;
      } else {
        this.cotizadorCliente.masculino = 0;
      }
    }

    console.log(diasSemana);
    
    diasSemana.sort();

    if (diasSemana.includes(1) && diasSemana.includes(7)) {
      this.domingoLunes = true;
      diasSemana.splice(diasSemana.length-1,1);
      diasSemana.splice(0,1);
      console.log(diasSemana);
    } else {
      this.domingoLunes = false;
    }

    diasSemana.forEach((value, index) => {
      if (index < diasSemana.length-1) {
        // if (value + 1 == diasSemana[index+1]) {
          console.log(diasSemana[index+1] - value);
        if (diasSemana[index+1] - value == 1) {
          this.consecutivos = true;
        } else {
          this.consecutivos = false;
          // if (this.domingoLunes == true) {
          //   this.consecutivos = true;
          // }
        }
      }
      
    });

    if (this.cotizadorCliente.horas == 24 && this.consecutivos == true) {
      this.consecutivos = true;
    } else {
      this.consecutivos = false;
    }
   


    this.cotizadorCliente.domingo = 0;
    // if (domingo.checked == true) {
    //   this.cotizadorCliente.domingo = 1;
    // } else {
    //   this.cotizadorCliente.domingo = 0;
    // }
    this.cotizadorCliente.asueto = 0;
    // if (festivo.checked == true) {
    //   this.cotizadorCliente.asueto = 1;
    // } else {
    //   this.cotizadorCliente.asueto = 0;
    // }
    if (hospital.checked == true) {
      this.cotizadorCliente.hospital = 1;
    } else {
      this.cotizadorCliente.hospital = 0;
    }
    if (fueraArea.checked == true) {
      this.cotizadorCliente.fueraArea = 1;
      this.cotizadorCliente.noTaxis = 1; //revisar
    } else {
      this.cotizadorCliente.fueraArea = 0;
      this.cotizadorCliente.noTaxis = 0; //revisar
    }
    // if (masculino.checked == true) {
    //   this.cotizadorCliente.masculino = 1;
    // } else {
    //   this.cotizadorCliente.masculino = 0;
    // }
    // if (this.cotizadorCliente.domingos > 0) { // revisar
    //   this.cotizadorCliente.domingo = 1;
    // } else {
    //   this.cotizadorCliente.domingo = 0;
    // }
    // if (this.cotizadorCliente.festivos > 0) {
    //   this.cotizadorCliente.asueto = 1;
    // } else {
    //   this.cotizadorCliente.asueto = 0;
    // }
    this.calculos2();
  }

  public calculos2() {
    var c2 = this.cotizadorCliente.horas;
    var c3 = this.cotizadorCliente.dias;
    var c4 = this.cotizadorCliente.masculino;
    var c5 = this.cotizadorCliente.domingo;
    var c6 = this.cotizadorCliente.asueto;
    var c7 = this.cotizadorCliente.hospital;
    var c8 = this.cotizadorCliente.fueraArea;
    var f8 = this.cotizadorCliente.noTaxis;

    var n3 = 0;
    // var o3 = 460;
    var o3 = this.pagosPersonal[0].pago;
    // var p3 = 500;
    var p3 = this.pagosPersonal[3].pago;
    // var q3 = 525;
    var q3 = this.pagosPersonal[6].pago;
    // var r3 = 550;
    var r3 = this.pagosPersonal[9].pago;
    // var s3 = 950;
    var s3 = this.pagosPersonal[12].pago;
    var e7 = 0;
    var n4 = 0;
    // var o4 = 640;
    var o4 = this.pagosPersonal[1].pago;
    // var p4 = 700;
    var p4 = this.pagosPersonal[4].pago;
    // var q4 = 740;
    var q4 = this.pagosPersonal[7].pago;
    // var r4 = 800;
    var r4 = this.pagosPersonal[10].pago;
    // var s4 = 1150;
    var s4 = this.pagosPersonal[13].pago;
    var n5 = 0;
    // var o5 = 840;
    var o5 = this.pagosPersonal[2].pago;
    // var p5 = 940;
    var p5 = this.pagosPersonal[5].pago;
    // var q5 = 1040;
    var q5 = this.pagosPersonal[8].pago;
    // var r5 = 1140;
    var r5 = this.pagosPersonal[11].pago;
    // var s5 = 1480;
    var s5 = this.pagosPersonal[14].pago;
    // var q12 = 90;
    var q12 = this.pagosPersonal[15].pago;
    // var r12 = 180;
    var r12 = this.pagosPersonal[16].pago;
    var c21 = 0;
    if (c2 == 0) {
     n3 = 0;
     n4 = 0;
     n5 = 0;
    } else {
      if (c2 == 4) {
        n3 = o3;
        n4 = o4;
        n5 = o5;
      } else {
        if (c2 == 8) {
          n3 = p3;
          n4 = p4;
          n5 = p5;
        } else {
          if (c2 == 10) {
            n3 = q3;
            n4 = q4;
            n5 = q5;
          } else {
            if (c2 == 12) {
              n3 = r3;
              e7 = q12;
              n4 = r4;
              n5 = r5;
            } else {
              if (c2 == 24) {
                n3 = s3;
                e7 = r12;
                n4 = s4;
                n5 = s5;
                if (c3 == 1) {
                  c21 = s3;
                } else {
                  if (c3 == 2) {
                    c21 = 2350;
                  } else {
                    if (c3 == 3) {
                      c21 = 3500;
                    } else {
                      if (c3 == 4) {
                        c21 = 4000;
                      } else  {
                        if (c3 == 5) {
                          c21 = 4500;
                        } else {
                          if (c3 == 6) {
                            c21 = 6600;
                          } else {
                            if (c3 == 7) {
                              c21 = 7500;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    var i13 = c3*n3;
    var i14 = c3*n4;
    var i15 = c3*n5;
    // var o9 = 800;
    // var p9 = 870;
    // var q9 = 910;
    // var r9 = 950;
    // var s9 = 1660;
    var o9 = this.preciosCliente[0].pago;
    var p9 = this.preciosCliente[3].pago;
    var q9 = this.preciosCliente[6].pago;
    var r9 = this.preciosCliente[9].pago;
    var s9 = this.preciosCliente[12].pago;
    var z9 = (((o9/o3)-1)+((p9/p3)-1)+((q9/q3)-1)+((r9/r3)-1)+((s9/s3)-1))/5;
    // var o15 = 85;
    var o15 = this.pagosPersonal[19].pago;
    // var o13 = 150;
    var o13 = this.pagosPersonal[17].pago;
    // var o10 = 1100;
    // var p10 = 1205;
    // var q10 = 1280;
    // var r10 = 1380;
    // var s10 = 1980;
    var o10 = this.preciosCliente[1].pago;
    var p10 = this.preciosCliente[4].pago;
    var q10 = this.preciosCliente[7].pago;
    var r10 = this.preciosCliente[10].pago;
    var s10 = this.preciosCliente[13].pago;
    var z10 = (((o10/o4)-1)+((p10/p4)-1)+((q10/q4)-1)+((r10/r4)-1)+((s10/s4)-1))/5;
    // var o11 = 1470;
    // var p11 = 1640;
    // var q11 = 1790;
    // var r11 = 1990;
    // var s11 = 2590;
    var o11 = this.preciosCliente[2].pago;
    var p11 = this.preciosCliente[5].pago;
    var q11 = this.preciosCliente[8].pago;
    var r11 = this.preciosCliente[11].pago;
    var s11 = this.preciosCliente[14].pago;
    var z11 = (((o11/o5)-1)+((p11/p5)-1)+((q11/q5)-1)+((r11/r5)-1)+((s11/s5)-1))/5;
    var k13 = (c4*o15)+(c5*n3*0.25)+(c6*n3)+(c7*e7)+(c8*f8*o13);
    var k14 = (c4*o15)+(c5*n4*0.25)+(c6*n4)+(c7*e7)+(c8*f8*o13);
    var k15 = (c4*o15)+(c5*n5*0.25)+(c6*n5)+(c7*e7)+(c8*f8*o13);
    // var o14 = 130;
    var o14 = this.pagosPersonal[18].pago;

    var c13 = ((i13)*(1+z9))+(k13*c3*1.15);
    var c14 = ((i14)*(1+z10))+(k14*c3*1.15);
    var c15 = ((i15)*(1+z11))+(k15*c3*1.15)+(c3*o14);
    var d13 = c13/c3;
    var d14 = c14/c3;
    var d15 = c15/c3;
    var c22 = c21*1.55;
    var c23 = c22*1.25;
    var d21 = c21/c3;
    var d22 = c22/c3;
    var d23 = c23/c3;
    // var c30 = 2900;
    // var c31 = 3900;
    // var c32 = 4900;
    // var d30 = 3900;
    // var d31 = 4900;
    // var d32 = 5900;
    // var e30 = 4900;
    // var e31 = 5900;
    // var e32 = 6900;
    // var f30 = 5900;
    // var f31 = 6900;
    // var f32 = 7900;
    var c30 = 0;
    var c31 = 0;
    var c32 = 0;
    var d30 = 0;
    var d31 = 0;
    var d32 = 0;
    var e30 = 0;
    var e31 = 0;
    var e32 = 0;
    var f30 = 0;
    var f31 = 0;
    var f32 = 0;
    if (this.cotizadorCliente.masculino == 1) {
      c30 = this.polizas[0].precio*1.2;
      c31 = this.polizas[1].precio*1.2;
      c32 = this.polizas[2].precio*1.2;
      d30 = this.polizas[3].precio*1.2;
      d31 = this.polizas[4].precio*1.2;
      d32 = this.polizas[5].precio*1.2;
      e30 = this.polizas[6].precio*1.2;
      e31 = this.polizas[7].precio*1.2;
      e32 = this.polizas[8].precio*1.2;
      f30 = this.polizas[9].precio*1.2;
      f31 = this.polizas[10].precio*1.2;
      f32 = this.polizas[11].precio*1.2;
    } else {
      c30 = this.polizas[0].precio;
      c31 = this.polizas[1].precio;
      c32 = this.polizas[2].precio;
      d30 = this.polizas[3].precio;
      d31 = this.polizas[4].precio;
      d32 = this.polizas[5].precio;
      e30 = this.polizas[6].precio;
      e31 = this.polizas[7].precio;
      e32 = this.polizas[8].precio;
      f30 = this.polizas[9].precio;
      f31 = this.polizas[10].precio;
      f32 = this.polizas[11].precio;
    }
    // var c30 = this.polizas[0].precio;
    // var c31 = this.polizas[1].precio;
    // var c32 = this.polizas[2].precio;
    // var d30 = this.polizas[3].precio;
    // var d31 = this.polizas[4].precio;
    // var d32 = this.polizas[5].precio;
    // var e30 = this.polizas[6].precio;
    // var e31 = this.polizas[7].precio;
    // var e32 = this.polizas[8].precio;
    // var f30 = this.polizas[9].precio;
    // var f31 = this.polizas[10].precio;
    // var f32 = this.polizas[11].precio;
    this.cotizadorCliente.precioListaCuidador = Math.round(c13);
    this.cotizadorCliente.precioListaEnfermera = Math.round(c14);
    this.cotizadorCliente.precioListaEnfermeraCovid = Math.round(c15);
    this.cotizadorCliente.precioListaCuidadorPorDia = Math.round(d13);
    this.cotizadorCliente.precioListaEnfermeraPorDia = Math.round(d14);
    this.cotizadorCliente.precioListaEnfermeraCovidPorDia = Math.round(d15);
    this.cotizadorCliente.precioPaqueteCuidador = Math.round(c21);
    this.cotizadorCliente.precioPaqueteEnfermera = Math.round(c22);
    this.cotizadorCliente.precioPaqueteEnfermeraCovid = Math.round(c23);
    this.cotizadorCliente.precioPaqueteCuidadorPorDia = Math.round(d21);
    this.cotizadorCliente.precioPaqueteEnfermeraPorDia = Math.round(d22);
    this.cotizadorCliente.precioPaqueteEnfermeraCovidPorDia = Math.round(d23);
    this.cotizadorCliente.polizaCuidadora1 = Math.round(c30);
    this.cotizadorCliente.polizaCuidadora2 = Math.round(d30);
    this.cotizadorCliente.polizaCuidadora3 = Math.round(e30);
    this.cotizadorCliente.polizaCuidadora4 = Math.round(f30);
    this.cotizadorCliente.polizaEnfermera1 = Math.round(c31);
    this.cotizadorCliente.polizaEnfermera2 = Math.round(d31);
    this.cotizadorCliente.polizaEnfermera3 = Math.round(e31);
    this.cotizadorCliente.polizaEnfermera4 = Math.round(f31);
    this.cotizadorCliente.polizaEnfermeraCovid1 = Math.round(c32);
    this.cotizadorCliente.polizaEnfermeraCovid2 = Math.round(d32);
    this.cotizadorCliente.polizaEnfermeraCovid3 = Math.round(e32);
    this.cotizadorCliente.polizaEnfermeraCovid4 = Math.round(f32);

    console.log(c13);
    console.log(c14);
    console.log(c15);

    console.log(c21,c22,c23);
  }

}
