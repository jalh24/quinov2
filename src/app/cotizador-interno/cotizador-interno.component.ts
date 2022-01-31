import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CotizadorInternoServicio } from '../_model/cotizadorInternoServicio';


@Component({
  selector: 'app-cotizador-interno',
  templateUrl: './cotizador-interno.component.html',
  styleUrls: ['./cotizador-interno.component.scss']
})
export class CotizadorInternoComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  public cotizadorInternoServicio: CotizadorInternoServicio;
  cotizarClick: boolean;
  bajo: boolean;
  medio: boolean;
  alto: boolean;
  costoTurno: any[];
  costoTurnoBajo: any[];
  costoTurnoMedio: any[];
  costoTurnoAlto: any[];
  gastoServicio: any[];
  gastoServicioBajo: any[];
  gastoServicioMedio: any[];
  gastoServicioAlto: any[];

  constructor(private http: HttpClient,) { }

  faArrowRight = faArrowRight;

  selected = new FormControl(0);

  ngOnInit(): void {
    this.cotizadorInternoServicio = new CotizadorInternoServicio();
    this.cotizadorInternoServicio.cuidador = 0;
    this.cotizadorInternoServicio.noHorasCuidador = 0;
    this.cotizadorInternoServicio.enfermero = 0;
    this.cotizadorInternoServicio.noHorasEnfermero = 0;
    this.cotizadorInternoServicio.enfermeroCovid = 0;
    this.cotizadorInternoServicio.noHorasEnfermeroCovid = 0;
    this.cotizadorInternoServicio.noDias = 0;
    this.cotizadorInternoServicio.domingo = 0;
    this.cotizadorInternoServicio.asueto = 0;
    this.cotizadorInternoServicio.hospital = 0;
    this.cotizadorInternoServicio.servicioFuera = 0;
    this.cotizadorInternoServicio.noTaxis = 0;
    this.cotizadorInternoServicio.cotizacionBaja = 0;
    this.cotizadorInternoServicio.cotizacionMedia = 0;
    this.cotizadorInternoServicio.cotizacionAlta = 0;
    this.cotizadorInternoServicio.porDiaBaja = 0;
    this.cotizadorInternoServicio.porDiaMedia = 0;
    this.cotizadorInternoServicio.porDiaAlta = 0;

    this.comboDatos();
  }

  public comboDatos() {
    // this.http.get<any>('/api/cotizador/costoTurno',this.httpOptions).subscribe(data => {
    //   this.costoTurno = data.data;
    //   console.log(this.costoTurno);
    // });
    // this.http.get<any>('/api/cotizador/gastoServicio',this.httpOptions).subscribe(data => {
    //   this.gastoServicio = data.data;
    //   console.log(this.gastoServicio);
    // });

    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 1, this.httpOptions).subscribe(data => {
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
    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 2, this.httpOptions).subscribe(data => {
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
    this.http.get<any>('/api/cotizador/datosServicio?idTipoCosto=' + 3, this.httpOptions).subscribe(data => {
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

    // this.http.get<any>('/api/cotizador/costoTurno?idTipoCosto=' + 1, this.httpOptions).subscribe(data => {
    //   this.costoTurnoBajo = data.data;
    //   this.costoTurnoBajo.forEach((value,index) => {
    //     this.costoTurnoBajo[index].costo = Number(this.costoTurnoBajo[index].costo);
    //   });
    //   console.log(this.costoTurnoBajo);
    // });
    // this.http.get<any>('/api/cotizador/gastoServicio?idTipoCosto=' + 1, this.httpOptions).subscribe(data => {
    //   this.gastoServicioBajo = data.data;
    //   this.gastoServicioBajo.forEach((value,index) => {
    //     this.gastoServicioBajo[index].porcentaje = Number(this.gastoServicioBajo[index].porcentaje);
    //     if (this.gastoServicioBajo[index].cantidad) {
    //       this.gastoServicioBajo[index].cantidad = Number(this.gastoServicioBajo[index].cantidad);
    //     }
    //   });
    //   console.log(this.gastoServicioBajo);
    // });
    // this.http.get<any>('/api/cotizador/costoTurno?idTipoCosto=' + 2, this.httpOptions).subscribe(data => {
    //   this.costoTurnoMedio = data.data;
    //   console.log(this.costoTurnoMedio);
    // });
    // this.http.get<any>('/api/cotizador/gastoServicio?idTipoCosto=' + 2, this.httpOptions).subscribe(data => {
    //   this.gastoServicioMedio = data.data;
    //   console.log(this.gastoServicioMedio);
    // });
    // this.http.get<any>('/api/cotizador/costoTurno?idTipoCosto=' + 3, this.httpOptions).subscribe(data => {
    //   this.costoTurnoAlto = data.data;
    //   console.log(this.costoTurnoAlto);
    // });
    // this.http.get<any>('/api/cotizador/gastoServicio?idTipoCosto=' + 3, this.httpOptions).subscribe(data => {
    //   this.gastoServicioAlto = data.data;
    //   console.log(this.gastoServicioAlto);
    // });
  }

  onCotizar() {
    this.cotizarClick = true;
    this.calculos1();
    // for (let i = 0; i < 3; i++) {
    //   switch (i) {
    //     case 0:
    //       this.bajo = true;
    //       this.medio = false;
    //       this.alto = false;
    //       this.calculos();
    //     case 1:
    //       this.bajo = false;
    //       this.medio = true;
    //       this.alto = false;
    //       this.calculos();
    //     case 0:
    //       this.bajo = false;
    //       this.medio = false;
    //       this.alto = true;
    //       this.calculos();
    //   }
    // }
  }

  public calculos() {
    var bajo = 0;
    var medio = 0;
    var alto = 1;
    
    // var H2 = 1;
    // var H3 = 0;
    // var H4 = 0;
    // var H6 = 3;
    // var H7 = 0;
    // var H8 = 0;
    // var H9 = 0;
    // var H10 = 0;
    // var K2 = 24;
    // var K3 = 0;
    // var K4 = 0;
    // var K10 = 0;

    var H2 = this.cotizadorInternoServicio.cuidador;
    var H3 = this.cotizadorInternoServicio.enfermero;
    var H4 = this.cotizadorInternoServicio.enfermeroCovid;
    var H6 = this.cotizadorInternoServicio.noDias;
    var H7 = this.cotizadorInternoServicio.domingo;
    var H8 = this.cotizadorInternoServicio.asueto;
    var H9 = this.cotizadorInternoServicio.hospital;
    var H10 = this.cotizadorInternoServicio.servicioFuera;
    var K2 = this.cotizadorInternoServicio.noHorasCuidador;
    var K3 = this.cotizadorInternoServicio.noHorasEnfermero;
    var K4 = this.cotizadorInternoServicio.noHorasEnfermeroCovid;
    var K10 = this.cotizadorInternoServicio.noTaxis;

    var B2 = 1.8;
    var B3 = 1.2;
    var B4 = 1.2;
    var B5 = 1.2;
    if (this.bajo==true || this.medio==true) {
      var B6 = 4.0;
    }
    if (this.alto==true) {
      var B6 = 4.4;
    }
    // var B6 = 4.0; // Pago bajo y medio
    var B7 = 1.1;
    var B8 = 0.7;
    var B12 = 4.0;
    var B13 = 1.5;
    var B18 = 1.0;
    var B19 = 2.8;
    var B20 = 1.2;
    if (this.bajo==true || this.alto==true) {
      var B21 = 0.6; //pago bajo
    }
    if (this.medio==true) {
      var B21 = 0.5; //pago medio
    }
    // var B21 = 0.5; //Pago medio
    var B22 = 1.5;
    var B23 = 3.0;
    var B24 = 0.5;
    var B25 = 0.5;
    if (this.bajo==true || this.medio==true) {
      var B27 = 1.0;
    }
    if (this.alto==true) {
      var B27 = 1.5;
    }
    // var B27 = 1.0;
    var M6 = 150;
    var B28 = 0; //Pago medio //Si H6 es mayor a 7, B28=20  
    if (this.bajo==true || this.medio==true) {
      if (H6 > 7) {
        B28 = 0.2;
      } else {
        B28 = 0.25;
      }
    }
    if (this.alto==true) {
      if (H6 > 7) {
        B28 = 0.15;
      } else {
        B28 = 0.2;
      }
    }
    
    var C9 = (K2*H6);
    var C10 = (K3*H6);
    var C11 = (K4*H6);
    var L2 = 0;
    if (this.bajo==true) {
      if (K2==0) {
        L2 = 0;
      } else {
        if (K2==8) {
          L2 = 500/8;
        } else {
          if (K2==10) {
            L2 = 550/10;
          } else {
            if (K2==12) {
              L2 = 650/12;
            } else {
              if (K2==24) {
                L2 = 950/24;
              } else {
                L2 = 0;
              }
            }
          }
        }
      }
    }
    if (this.medio==true) {
      if (K2==0) {
        L2 = 0;
      } else {
        if (K2==8) {
          L2 = ((500/8)+(350/8))/2;
        } else {
          if (K2==10) {
            L2 = ((550/10)+(650/10))/2;
          } else {
            if (K2==12) {
              L2 = ((650/12)+(750/12))/2;
            } else {
              if (K2==24) {
                L2 = ((950/24)+(1200/24))/2;
              } else {
                L2 = 0;
              }
            }
          }
        }
      }
    }
    if (this.alto==true) {
      if (K2==0) {
        L2 = 0;
      } else {
        if (K2==8) {
          L2 = 650/8;
        } else {
          if (K2==10) {
            L2 = 650/10;
          } else {
            if (K2==12) {
              L2 = 750/12;
            } else {
              if (K2==24) {
                L2 = 1200/24;
              } else {
                L2 = 0;
              }
            }
          }
        }
      }
    } 
    var L3 = 0;
    if (this.bajo==true) {
      if (K3==0) {
        L3 = 0;
      } else {
        if (K3==8) {
          L3 = 750/8;
        } else {
          if (K3==10) {
            L3 = 750/10;
          } else {
            if (K3==12) {
              L3 = 750/12;
            } else {
              if (K3==24) {
                L3 = 1200/24;
              } else {
                L3 = 0;
              }
            }
          }
        }
      }
    }
    if (this.medio==true) {
      if (K3==0) {
        L3 = 0;
      } else {
        if (K3==8) {
          L3 = ((750/8)+(850/8))/2;
        } else {
          if (K3==10) {
            L3 = ((750/10)+(850/10))/2;
          } else {
            if (K3==12) {
              L3 = ((750/12)+(850/12))/2;
            } else {
              if (K3==24) {
                L3 = ((1200/24)+(1400/24))/2;
              } else {
                L3 = 0;
              }
            }
          }
        }
      }
    }
    if (this.alto==true) {
      if (K3==0) {
        L3 = 0;
      } else {
        if (K3==8) {
          L3 = 850/8;
        } else {
          if (K3==10) {
            L3 = 850/10;
          } else {
            if (K3==12) {
              L3 = 850/12;
            } else {
              if (K3==24) {
                L3 = 1400/24;
              } else {
                L3 = 0;
              }
            }
          }
        }
      }
    }    
    var L4 = 0;
    if (this.bajo==true) {
      if (K4==0) {
        L4 = 0;
      } else {
        if (K4==8) {
          L4 = 1000/8;
        } else {
          if (K4==10) {
            L4 = 1200/10;
          } else {
            if (K4==12) {
              L4 = 1400/12;
            } else {
              if (K4==24) {
                L4 = 1600/24;
              } else {
                L4 = 0;
              }
            }
          }
        }
      }
    }
    if (this.medio==true) {
      if (K4==0) {
        L4 = 0;
      } else {
        if (K4==8) {
          L4 = ((1000/8)+(1200/8))/2;
        } else {
          if (K4==10) {
            L4 = ((1200/10)+(1400/10))/2;
          } else {
            if (K4==12) {
              L4 = ((1400/12)+(1600/12))/2;
            } else {
              if (K4==24) {
                L4 = ((1600/24)+(1800/24))/2;
              } else {
                L4 = 0;
              }
            }
          }
        }
      }
    }
    if (this.alto==true) {
      if (K4==0) {
        L4 = 0;
      } else {
        if (K4==8) {
          L4 = 1200/8;
        } else {
          if (K4==10) {
            L4 = 1400/10;
          } else {
            if (K4==12) {
              L4 = 1600/12;
            } else {
              if (K4==24) {
                L4 = 1800/24;
              } else {
                L4 = 0;
              }
            }
          }
        }
      }
    }
    
    var D9 = (C9*L2*H2);
    var D10 = (C10*L3*H3);
    var D11 = (C11*L4*H4);
    var D2 = (D9+D10+D11)*(B2/100);
    var D3 = (D9+D10+D11)*(B3/100);
    var D4 = (D9+D10+D11)*(B4/100);
    var D5 = (D9+D10+D11)*(B5/100);
    var D6 = (D9+D10+D11)*(B6/100);
    var D7 = (D9+D10+D11)*(B7/100);
    var D8 = (D9+D10+D11)*(B8/100);   
    var D12 = (D9+D10+D11)*(B12/100);
    var D13 = (D9+D10+D11)*(B13/100);
    var D14 = (((H2*K2*L2)*0.25)+((H3*K3*L3)*0.25)+((H4*K4*L4)*0.25))*H7;
    var D15 = (((H2*K2*L2))+((H3*K3*L3))+((H4*K4*L4)))*H8;
    var D16 = (H10*K10*M6*H6);
    var J9 = 0;
    var K5 = ((H2*K2)+(H3*K3)+(H4*K4))/(H2+H3+H4);
    if (K5==12) {
      J9 = 90;
    } else {
      if (K5==24) {
        J9 = 180;
      } else {
        J9 = 0;
      }
    }
    var D17 = (H9*H6*J9);
    var D18 = (D9+D10+D11)*(B18/100);
    var D19 = (D9+D10+D11)*(B19/100);
    var D20 = (D9+D10+D11)*(B20/100);
    var D21 = (D9+D10+D11)*(B21/100);
    var D22 = (D9+D10+D11)*(B22/100);
    var D23 = (D9+D10+D11)*(B23/100);
    var D24 = (D9+D10+D11)*(B24/100);
    var D25 = (D9+D10+D11)*(B25/100);
    if (K2!=24) {
      var D26 = ((H2*H6*50)+(H3*H6*100)+(H4*H6*100));
    } else {
      var D26 = (((H2*H6*50)+(H2*H6*50))+((H3*H6*100)+(H3*H6*100))+((H4*H6*100)+(H4*H6*100)));
    }
    // var D26 = ((H2*H6*50)+(H3*H6*100)+(H4*H6*100));
    var D27 = (D9+D10+D11)*(B27/100);

    if(this.bajo==true) {
      this.cotizadorInternoServicio.cotizacionBaja = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
      this.cotizadorInternoServicio.porDiaBaja = Math.round(this.cotizadorInternoServicio.cotizacionBaja/H6);
    } else {
      if (this.medio==true) {
        this.cotizadorInternoServicio.cotizacionMedia = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
        this.cotizadorInternoServicio.porDiaMedia = Math.round(this.cotizadorInternoServicio.cotizacionMedia/H6);
      } else {
        if (this.alto==true) {
          this.cotizadorInternoServicio.cotizacionAlta = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
          this.cotizadorInternoServicio.porDiaAlta = Math.round(this.cotizadorInternoServicio.cotizacionAlta/H6);
        }
      }
    }
  
    // var H17 = (D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1);
    // console.log(H17);
  }

  public calculos1() {
    var H2 = this.cotizadorInternoServicio.cuidador;
    var H3 = this.cotizadorInternoServicio.enfermero;
    var H4 = this.cotizadorInternoServicio.enfermeroCovid;
    var H6 = this.cotizadorInternoServicio.noDias;
    var H7 = this.cotizadorInternoServicio.domingo;
    var H8 = this.cotizadorInternoServicio.asueto;
    var H9 = this.cotizadorInternoServicio.hospital;
    var H10 = this.cotizadorInternoServicio.servicioFuera;
    var K2 = this.cotizadorInternoServicio.noHorasCuidador;
    var K3 = this.cotizadorInternoServicio.noHorasEnfermero;
    var K4 = this.cotizadorInternoServicio.noHorasEnfermeroCovid;
    var K10 = this.cotizadorInternoServicio.noTaxis;
    var L2Bajo = 0;
    var L3Bajo = 0;
    var L4Bajo = 0;
    var L2Medio = 0;
    var L3Medio = 0;
    var L4Medio = 0;
    var L2Alto = 0;
    var L3Alto = 0;
    var L4Alto = 0;
    var C9 = (K2*H6);
    var C10 = (K3*H6);
    var C11 = (K4*H6);
    var J9 = 0;
    var K5 = ((H2*K2)+(H3*K3)+(H4*K4))/(H2+H3+H4);

    var M6 = 150;

      if (!(H6 > 7)) {
        this.gastoServicioBajo[21].porcentaje = this.gastoServicioBajo[21].porcentaje + 0.05;
        this.gastoServicioMedio[21].porcentaje = this.gastoServicioMedio[21].porcentaje + 0.05;
        this.gastoServicioAlto[21].porcentaje = this.gastoServicioAlto[21].porcentaje + 0.05;
      }
      if (K2==0) {
        L2Bajo = 0;
        L2Medio = 0;
        L2Alto = 0;
      } else {
        if (K2==8) {
          L2Bajo = this.costoTurnoBajo[0].costo;
          L2Medio = this.costoTurnoMedio[0].costo;
          L2Alto = this.costoTurnoAlto[0].costo;
        } else {
          if (K2==10) {
            L2Bajo = this.costoTurnoBajo[1].costo;
            L2Medio = this.costoTurnoMedio[1].costo;
            L2Alto = this.costoTurnoAlto[1].costo;
          } else {
            if (K2==12) {
              L2Bajo = this.costoTurnoBajo[2].costo;
              L2Medio = this.costoTurnoMedio[2].costo;
              L2Alto = this.costoTurnoAlto[2].costo;
            } else {
              if (K2==24) {
                L2Bajo = this.costoTurnoBajo[3].costo;
                L2Medio = this.costoTurnoMedio[3].costo;
                L2Alto = this.costoTurnoAlto[3].costo;
              } else {
                L2Bajo = 0;
                L2Medio = 0;
                L2Alto = 0;
              }
            }
          }
        }
      }
      if (K3==0) {
        L3Bajo = 0;
        L3Medio = 0;
        L3Alto = 0;
      } else {
        if (K3==8) {
          L3Bajo = this.costoTurnoBajo[4].costo;
          L3Medio = this.costoTurnoMedio[4].costo;
          L3Alto = this.costoTurnoAlto[4].costo;
        } else {
          if (K3==10) {
            L3Bajo = this.costoTurnoBajo[5].costo;
            L3Medio = this.costoTurnoMedio[5].costo;
            L3Alto = this.costoTurnoAlto[5].costo;
          } else {
            if (K3==12) {
              L3Bajo = this.costoTurnoBajo[6].costo;
              L3Medio = this.costoTurnoMedio[6].costo;
              L3Alto = this.costoTurnoAlto[6].costo;
            } else {
              if (K3==24) {
                L3Bajo = this.costoTurnoBajo[7].costo;
                L3Medio = this.costoTurnoMedio[7].costo;
                L3Alto = this.costoTurnoAlto[7].costo;
              } else {
                L3Bajo = 0;
                L3Medio = 0;
                L3Alto = 0;
              }
            }
          }
        }
      }
      if (K4==0) {
        L4Bajo = 0;
        L4Medio = 0;
        L4Alto = 0;
      } else {
        if (K4==8) {
          L4Bajo = this.costoTurnoBajo[8].costo;
          L4Medio = this.costoTurnoMedio[8].costo;
          L4Alto = this.costoTurnoAlto[8].costo;
        } else {
          if (K4==10) {
            L4Bajo = this.costoTurnoBajo[9].costo;
            L4Medio = this.costoTurnoMedio[9].costo;
            L4Alto = this.costoTurnoAlto[9].costo;
          } else {
            if (K4==12) {
              L4Bajo = this.costoTurnoBajo[10].costo;
              L4Medio = this.costoTurnoMedio[10].costo;
              L4Alto = this.costoTurnoAlto[10].costo;
            } else {
              if (K4==24) {
                L4Bajo = this.costoTurnoBajo[11].costo;
                L4Medio = this.costoTurnoMedio[11].costo;
                L4Alto = this.costoTurnoAlto[11].costo;
              } else {
                L4Bajo = 0;
                L4Medio = 0;
                L4Alto = 0;
              }
            }
          }
        }
      }
      var D9Bajo = (C9*L2Bajo*H2);
      var D10Bajo = (C10*L3Bajo*H3);
      var D11Bajo = (C11*L4Bajo*H4);
      var D9Medio = (C9*L2Medio*H2);
      var D10Medio = (C10*L3Medio*H3);
      var D11Medio = (C11*L4Medio*H4);
      var D9Alto = (C9*L2Alto*H2);
      var D10Alto = (C10*L3Alto*H3);
      var D11Alto = (C11*L4Alto*H4);
      var D2Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[0].porcentaje/100);
      var D3Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[1].porcentaje/100);
      var D4Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[2].porcentaje/100);
      var D5Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[3].porcentaje/100);
      var D6Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[4].porcentaje/100);
      var D7Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[5].porcentaje/100);
      var D8Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[6].porcentaje/100);   
      var D12Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[7].porcentaje/100);
      var D13Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[8].porcentaje/100);
      var D14Bajo = (((H2*K2*L2Bajo)*this.gastoServicioBajo[22].porcentaje)+((H3*K3*L3Bajo)*this.gastoServicioBajo[22].porcentaje)+((H4*K4*L4Bajo)*this.gastoServicioBajo[22].porcentaje))*H7;
      var D15Bajo = (((H2*K2*L2Bajo))+((H3*K3*L3Bajo))+((H4*K4*L4Bajo)))*H8;
      var D2Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[0].porcentaje/100);
      var D3Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[1].porcentaje/100);
      var D4Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[2].porcentaje/100);
      var D5Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[3].porcentaje/100);
      var D6Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[4].porcentaje/100);
      var D7Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[5].porcentaje/100);
      var D8Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[6].porcentaje/100);   
      var D12Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[7].porcentaje/100);
      var D13Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[8].porcentaje/100);
      var D14Medio = (((H2*K2*L2Medio)*this.gastoServicioMedio[22].porcentaje)+((H3*K3*L3Medio)*this.gastoServicioMedio[22].porcentaje)+((H4*K4*L4Medio)*this.gastoServicioMedio[22].porcentaje))*H7;
      var D15Medio = (((H2*K2*L2Medio))+((H3*K3*L3Medio))+((H4*K4*L4Medio)))*H8;
      var D2Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[0].porcentaje/100);
      var D3Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[1].porcentaje/100);
      var D4Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[2].porcentaje/100);
      var D5Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[3].porcentaje/100);
      var D6Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[4].porcentaje/100);
      var D7Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[5].porcentaje/100);
      var D8Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[6].porcentaje/100);   
      var D12Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[7].porcentaje/100);
      var D13Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[8].porcentaje/100);
      var D14Alto = (((H2*K2*L2Alto)*this.gastoServicioAlto[22].porcentaje)+((H3*K3*L3Alto)*this.gastoServicioAlto[22].porcentaje)+((H4*K4*L4Alto)*this.gastoServicioAlto[22].porcentaje))*H7;
      var D15Alto = (((H2*K2*L2Alto))+((H3*K3*L3Alto))+((H4*K4*L4Alto)))*H8;
      var D16 = (H10*K10*M6*H6);
      if (K5==12) {
        J9 = 90;
      } else {
        if (K5==24) {
          J9 = 180;
        } else {
          J9 = 0;
        }
      }
      var D17 = (H9*H6*J9);
      var D18Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[9].porcentaje/100);
      var D19Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[10].porcentaje/100);
      var D20Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[11].porcentaje/100);
      var D21Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[12].porcentaje/100);
      var D22Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[13].porcentaje/100);
      var D23Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[14].porcentaje/100);
      var D24Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[15].porcentaje/100);
      var D25Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[16].porcentaje/100);
      var D18Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[9].porcentaje/100);
      var D19Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[10].porcentaje/100);
      var D20Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[11].porcentaje/100);
      var D21Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[12].porcentaje/100);
      var D22Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[13].porcentaje/100);
      var D23Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[14].porcentaje/100);
      var D24Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[15].porcentaje/100);
      var D25Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[16].porcentaje/100);
      var D18Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[9].porcentaje/100);
      var D19Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[10].porcentaje/100);
      var D20Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[11].porcentaje/100);
      var D21Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[12].porcentaje/100);
      var D22Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[13].porcentaje/100);
      var D23Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[14].porcentaje/100);
      var D24Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[15].porcentaje/100);
      var D25Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[16].porcentaje/100);
      if (K2!=24) {
        var D26Bajo = ((H2*H6*this.gastoServicioBajo[17].cantidad)+(H3*H6*this.gastoServicioBajo[18].cantidad)+(H4*H6*this.gastoServicioBajo[19].cantidad));
        var D26Medio = ((H2*H6*this.gastoServicioMedio[17].cantidad)+(H3*H6*this.gastoServicioMedio[18].cantidad)+(H4*H6*this.gastoServicioMedio[19].cantidad));
        var D26Alto = ((H2*H6*this.gastoServicioAlto[17].cantidad)+(H3*H6*this.gastoServicioAlto[18].cantidad)+(H4*H6*this.gastoServicioAlto[19].cantidad));
      } else {
        var D26Bajo = ((2*(H2*H6*this.gastoServicioBajo[17].cantidad))+(2*(H3*H6*this.gastoServicioBajo[18].cantidad))+(2*(H4*H6*this.gastoServicioBajo[19].cantidad)));
        var D26Medio = ((2*(H2*H6*this.gastoServicioMedio[17].cantidad))+(2*(H3*H6*this.gastoServicioMedio[18].cantidad))+(2*(H4*H6*this.gastoServicioMedio[19].cantidad)));
        var D26Alto = ((2*(H2*H6*this.gastoServicioAlto[17].cantidad))+(2*(H3*H6*this.gastoServicioAlto[18].cantidad))+(2*(H4*H6*this.gastoServicioAlto[19].cantidad)));
      }
      var D27Bajo = (D9Bajo+D10Bajo+D11Bajo)*(this.gastoServicioBajo[20].porcentaje/100);
      var D27Medio = (D9Medio+D10Medio+D11Medio)*(this.gastoServicioMedio[20].porcentaje/100);
      var D27Alto = (D9Alto+D10Alto+D11Alto)*(this.gastoServicioAlto[20].porcentaje/100);

      this.cotizadorInternoServicio.cotizacionBaja = Math.round((D2Bajo+D3Bajo+D4Bajo+D5Bajo+D6Bajo+D7Bajo+D8Bajo+D9Bajo+D10Bajo+D11Bajo+D12Bajo+D13Bajo+D14Bajo+D15Bajo+D16+D17+D18Bajo+D19Bajo+D20Bajo+D21Bajo+D22Bajo+D23Bajo+D24Bajo+D25Bajo+D26Bajo+D27Bajo)*(this.gastoServicioBajo[21].porcentaje+1));
      this.cotizadorInternoServicio.porDiaBaja = Math.round(this.cotizadorInternoServicio.cotizacionBaja/H6);
      this.cotizadorInternoServicio.cotizacionMedia = Math.round((D2Medio+D3Medio+D4Medio+D5Medio+D6Medio+D7Medio+D8Medio+D9Medio+D10Medio+D11Medio+D12Medio+D13Medio+D14Medio+D15Medio+D16+D17+D18Medio+D19Medio+D20Medio+D21Medio+D22Medio+D23Medio+D24Medio+D25Medio+D26Medio+D27Medio)*(this.gastoServicioMedio[21].porcentaje+1));
      this.cotizadorInternoServicio.porDiaMedia = Math.round(this.cotizadorInternoServicio.cotizacionMedia/H6);
      this.cotizadorInternoServicio.cotizacionAlta = Math.round((D2Alto+D3Alto+D4Alto+D5Alto+D6Alto+D7Alto+D8Alto+D9Alto+D10Alto+D11Alto+D12Alto+D13Alto+D14Alto+D15Alto+D16+D17+D18Alto+D19Alto+D20Alto+D21Alto+D22Alto+D23Alto+D24Alto+D25Alto+D26Alto+D27Alto)*(this.gastoServicioAlto[21].porcentaje+1));
      this.cotizadorInternoServicio.porDiaAlta = Math.round(this.cotizadorInternoServicio.cotizacionAlta/H6);
    }
  //   // if (this.bajo==true || this.medio==true) {
  //   //   var B6 = 4.0;
  //   // }
  //   // if (this.alto==true) {
  //   //   var B6 = 4.4;
  //   // }
  //   // var B6 = 4.0; // Pago bajo y medio
  //   // var B7 = 1.1;
  //   // var B8 = 0.7;
  //   // var B12 = 4.0;
  //   // var B13 = 1.5;
  //   // var B18 = 1.0;
  //   // var B19 = 2.8;
  //   // var B20 = 1.2;
  //   // if (this.bajo==true || this.alto==true) {
  //   //   var B21 = 0.6; //pago bajo
  //   // }
  //   // if (this.medio==true) {
  //   //   var B21 = 0.5; //pago medio
  //   // }
  //   // // var B21 = 0.5; //Pago medio
  //   // var B22 = 1.5;
  //   // var B23 = 3.0;
  //   // var B24 = 0.5;
  //   // var B25 = 0.5;
  //   // if (this.bajo==true || this.medio==true) {
  //   //   var B27 = 1.0;
  //   // }
  //   // if (this.alto==true) {
  //   //   var B27 = 1.5;
  //   // }
  //   // var B27 = 1.0;
  //   var M6 = 150;
  //   // var B28 = 0; //Pago medio //Si H6 es mayor a 7, B28=20  
  //   // if (this.bajo==true || this.medio==true) {
  //   //   if (H6 > 7) {
  //   //     B28 = 0.2;
  //   //   } else {
  //   //     B28 = 0.25;
  //   //   }
  //   // }
  //   // if (this.alto==true) {
  //   //   if (H6 > 7) {
  //   //     B28 = 0.15;
  //   //   } else {
  //   //     B28 = 0.2;
  //   //   }
  //   // }
    
  //   var C9 = (K2*H6);
  //   var C10 = (K3*H6);
  //   var C11 = (K4*H6);
  //   var L2 = 0;
  //   if (this.bajo==true) {
  //     if (K2==0) {
  //       L2 = 0;
  //     } else {
  //       if (K2==8) {
  //         L2 = 500/8;
  //       } else {
  //         if (K2==10) {
  //           L2 = 550/10;
  //         } else {
  //           if (K2==12) {
  //             L2 = 650/12;
  //           } else {
  //             if (K2==24) {
  //               L2 = 950/24;
  //             } else {
  //               L2 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.medio==true) {
  //     if (K2==0) {
  //       L2 = 0;
  //     } else {
  //       if (K2==8) {
  //         L2 = ((500/8)+(350/8))/2;
  //       } else {
  //         if (K2==10) {
  //           L2 = ((550/10)+(650/10))/2;
  //         } else {
  //           if (K2==12) {
  //             L2 = ((650/12)+(750/12))/2;
  //           } else {
  //             if (K2==24) {
  //               L2 = ((950/24)+(1200/24))/2;
  //             } else {
  //               L2 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.alto==true) {
  //     if (K2==0) {
  //       L2 = 0;
  //     } else {
  //       if (K2==8) {
  //         L2 = 650/8;
  //       } else {
  //         if (K2==10) {
  //           L2 = 650/10;
  //         } else {
  //           if (K2==12) {
  //             L2 = 750/12;
  //           } else {
  //             if (K2==24) {
  //               L2 = 1200/24;
  //             } else {
  //               L2 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } 
  //   var L3 = 0;
  //   if (this.bajo==true) {
  //     if (K3==0) {
  //       L3 = 0;
  //     } else {
  //       if (K3==8) {
  //         L3 = 750/8;
  //       } else {
  //         if (K3==10) {
  //           L3 = 750/10;
  //         } else {
  //           if (K3==12) {
  //             L3 = 750/12;
  //           } else {
  //             if (K3==24) {
  //               L3 = 1200/24;
  //             } else {
  //               L3 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.medio==true) {
  //     if (K3==0) {
  //       L3 = 0;
  //     } else {
  //       if (K3==8) {
  //         L3 = ((750/8)+(850/8))/2;
  //       } else {
  //         if (K3==10) {
  //           L3 = ((750/10)+(850/10))/2;
  //         } else {
  //           if (K3==12) {
  //             L3 = ((750/12)+(850/12))/2;
  //           } else {
  //             if (K3==24) {
  //               L3 = ((1200/24)+(1400/24))/2;
  //             } else {
  //               L3 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.alto==true) {
  //     if (K3==0) {
  //       L3 = 0;
  //     } else {
  //       if (K3==8) {
  //         L3 = 850/8;
  //       } else {
  //         if (K3==10) {
  //           L3 = 850/10;
  //         } else {
  //           if (K3==12) {
  //             L3 = 850/12;
  //           } else {
  //             if (K3==24) {
  //               L3 = 1400/24;
  //             } else {
  //               L3 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }    
  //   var L4 = 0;
  //   if (this.bajo==true) {
  //     if (K4==0) {
  //       L4 = 0;
  //     } else {
  //       if (K4==8) {
  //         L4 = 1000/8;
  //       } else {
  //         if (K4==10) {
  //           L4 = 1200/10;
  //         } else {
  //           if (K4==12) {
  //             L4 = 1400/12;
  //           } else {
  //             if (K4==24) {
  //               L4 = 1600/24;
  //             } else {
  //               L4 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.medio==true) {
  //     if (K4==0) {
  //       L4 = 0;
  //     } else {
  //       if (K4==8) {
  //         L4 = ((1000/8)+(1200/8))/2;
  //       } else {
  //         if (K4==10) {
  //           L4 = ((1200/10)+(1400/10))/2;
  //         } else {
  //           if (K4==12) {
  //             L4 = ((1400/12)+(1600/12))/2;
  //           } else {
  //             if (K4==24) {
  //               L4 = ((1600/24)+(1800/24))/2;
  //             } else {
  //               L4 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.alto==true) {
  //     if (K4==0) {
  //       L4 = 0;
  //     } else {
  //       if (K4==8) {
  //         L4 = 1200/8;
  //       } else {
  //         if (K4==10) {
  //           L4 = 1400/10;
  //         } else {
  //           if (K4==12) {
  //             L4 = 1600/12;
  //           } else {
  //             if (K4==24) {
  //               L4 = 1800/24;
  //             } else {
  //               L4 = 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
    
  //   var D9 = (C9*L2*H2);
  //   var D10 = (C10*L3*H3);
  //   var D11 = (C11*L4*H4);
  //   var D2 = (D9+D10+D11)*(B2/100);
  //   var D3 = (D9+D10+D11)*(B3/100);
  //   var D4 = (D9+D10+D11)*(B4/100);
  //   var D5 = (D9+D10+D11)*(B5/100);
  //   var D6 = (D9+D10+D11)*(B6/100);
  //   var D7 = (D9+D10+D11)*(B7/100);
  //   var D8 = (D9+D10+D11)*(B8/100);   
  //   var D12 = (D9+D10+D11)*(B12/100);
  //   var D13 = (D9+D10+D11)*(B13/100);
  //   var D14 = (((H2*K2*L2)*0.25)+((H3*K3*L3)*0.25)+((H4*K4*L4)*0.25))*H7;
  //   var D15 = (((H2*K2*L2))+((H3*K3*L3))+((H4*K4*L4)))*H8;
  //   var D16 = (H10*K10*M6*H6);
  //   var J9 = 0;
  //   var K5 = ((H2*K2)+(H3*K3)+(H4*K4))/(H2+H3+H4);
  //   if (K5==12) {
  //     J9 = 90;
  //   } else {
  //     if (K5==24) {
  //       J9 = 180;
  //     } else {
  //       J9 = 0;
  //     }
  //   }
  //   var D17 = (H9*H6*J9);
  //   var D18 = (D9+D10+D11)*(B18/100);
  //   var D19 = (D9+D10+D11)*(B19/100);
  //   var D20 = (D9+D10+D11)*(B20/100);
  //   var D21 = (D9+D10+D11)*(B21/100);
  //   var D22 = (D9+D10+D11)*(B22/100);
  //   var D23 = (D9+D10+D11)*(B23/100);
  //   var D24 = (D9+D10+D11)*(B24/100);
  //   var D25 = (D9+D10+D11)*(B25/100);
  //   if (K2!=24) {
  //     var D26 = ((H2*H6*50)+(H3*H6*100)+(H4*H6*100));
  //   } else {
  //     var D26 = (((H2*H6*50)+(H2*H6*50))+((H3*H6*100)+(H3*H6*100))+((H4*H6*100)+(H4*H6*100)));
  //   }
  //   // var D26 = ((H2*H6*50)+(H3*H6*100)+(H4*H6*100));
  //   var D27 = (D9+D10+D11)*(B27/100);

  //   if(this.bajo==true) {
  //     this.cotizadorInternoServicio.cotizacionBaja = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
  //     this.cotizadorInternoServicio.porDiaBaja = Math.round(this.cotizadorInternoServicio.cotizacionBaja/H6);
  //   } else {
  //     if (this.medio==true) {
  //       this.cotizadorInternoServicio.cotizacionMedia = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
  //       this.cotizadorInternoServicio.porDiaMedia = Math.round(this.cotizadorInternoServicio.cotizacionMedia/H6);
  //     } else {
  //       if (this.alto==true) {
  //         this.cotizadorInternoServicio.cotizacionAlta = Math.round((D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1));
  //         this.cotizadorInternoServicio.porDiaAlta = Math.round(this.cotizadorInternoServicio.cotizacionAlta/H6);
  //       }
  //     }
  //   }
  
  //   // var H17 = (D2+D3+D4+D5+D6+D7+D8+D9+D10+D11+D12+D13+D14+D15+D16+D17+D18+D19+D20+D21+D22+D23+D24+D25+D26+D27)*(B28+1);
  //   // console.log(H17);
  // }

}
