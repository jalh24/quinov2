import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Servicio } from '../_model/servicio';

@Component({
  selector: 'app-pago-paciente',
  templateUrl: './pago-paciente.component.html',
  styleUrls: ['./pago-paciente.component.scss']
})
export class PagoPacienteComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  pacientes: any;
  pacientesSettings: IDropdownSettings = {};
  pagoCompleto: boolean;
  idServicio: number;

  public servicio: Servicio;
  public servicioNew: Servicio;
  selectedIdServicio = null;
  fechaCreacion = null;
  montoServicio:number=0;
  motivoServicio:string="";

  constructor(private route: ActivatedRoute, private http: HttpClient,private toastService: NgbToastService,) { }

  showSuccess(type: any, message: string): void {
    const toast: NgbToast = {
      toastType: type,
      text: message,
      dismissible: true,
      timeInSeconds: 5,
      onDismiss: () => {
        console.log("Toast dismissed!!");
      }
    }
    this.toastService.show(toast);
  }

  ngOnInit(): void {
    this.inicializaObjetos();
    this.comboPacientes();
    this.pacientesSettings = {
      singleSelection: true,
      idField: 'idServicio',
      textField: 'nombrecompleto',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.route.queryParams.subscribe(params => {
      this.idServicio = params['idServicio'];
    });

    if (this.idServicio) {
      this.onIdServicio(this.idServicio);
    }
  }

  inicializaObjetos() {
    this.servicio = new Servicio();
    this.servicioNew = new Servicio();
    this.servicio.precioServicio = null;
    this.pagoCompleto = false;
  }

  public comboPacientes() {
    this.http.get<any>('/api/servicio/lista2', this.httpOptions).subscribe(data => {
      this.pacientes = data.data;
    });
  }

  public onIdServicio(selectedIdServicio) {
    // this.servicio.idServicio = selectedIdServicio;
    this.http.get<any>('/api/servicio/datos?idServicio=' + selectedIdServicio, this.httpOptions).subscribe(data => {
      this.servicio = data.data[0];
      this.servicioNew = data.data[0];
      this.fechaCreacion = new Date(this.servicio.fechaCreacion).toLocaleDateString();
      this.servicio.fechaCreacion = this.fechaCreacion;

      console.log(this.servicio);
      if (this.servicio.precioServicio == this.servicio.cantidadPagada) {
        this.pagoCompleto = true;
      } else {
        this.pagoCompleto = false;
      }
    });

    
  }

  public crearPago(){
    let pagoServicio ={
      idServicio : this.servicio.idServicio,
      monto:this.montoServicio,
      motivo: this.motivoServicio,
      estatusPago: null
    }
    // if (!(pagoServicio.monto > (this.servicio.precioServicio-this.servicio.cantidadPagada))) {
      this.servicioNew.cantidadPagada = (Number(this.servicioNew.cantidadPagada) + Number(this.montoServicio));
      this.servicioNew.cantidadPorPagar = (Number(this.servicioNew.precioServicio)-Number(this.servicioNew.cantidadPagada));
      if (Number(this.servicioNew.cantidadPagada)<Number(this.servicioNew.precioServicio)) {
        this.servicioNew.estatusPago = 2;
      }
      if (Number(this.servicioNew.cantidadPagada)==Number(this.servicioNew.precioServicio)) {
        this.servicioNew.estatusPago = 3;
      }
      if (Number(this.servicioNew.cantidadPagada)>Number(this.servicioNew.precioServicio)) {
        this.servicioNew.estatusPago = 4;
      }
      pagoServicio.estatusPago = this.servicioNew.estatusPago;

      console.log(this.servicioNew);
      this.http.post<any>('/api/pago/create', pagoServicio, this.httpOptions).subscribe(data => {
        this.http.post<any>('/api/servicio/updatePago', this.servicioNew, this.httpOptions).subscribe(data => {
          this.showSuccess(NgbToastType.Success, "Se actualizo el servicio exitosamente");
          alert("Se actualizo el servicio exitosamente");
          window.history.back();
        });
      });
      
    // } else {
    //   alert("El pago debe de ser mayor a 0 y menor o igual a la resta del precio con lo ya pagado");
    // }
    
    console.log(pagoServicio);
  }
}
