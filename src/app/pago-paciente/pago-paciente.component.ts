import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

  selectedPacienteItems: any = [];
  pacientes: any;
  pacientesSettings: IDropdownSettings = {};

  public servicio: Servicio;
  selectedIdServicio = null;
  fechaCreacion = null;
  montoServicio:number=0;
  motivoServicio:string;

  constructor(private http: HttpClient,) { }

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
  }

  inicializaObjetos() {
    this.servicio = new Servicio();
    this.servicio.precioServicio = null;
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
      this.fechaCreacion = new Date(this.servicio.fechaCreacion).toLocaleDateString();
      this.servicio.fechaCreacion = this.fechaCreacion;

      this.selectedPacienteItems = [{
        idServicio: data.data[0].idServicio,
        nombrecompleto: data.data[0].nombre + " " + data.data[0].a_paterno + " " + data.data[0].a_materno
      }
      ];

      console.log(this.fechaCreacion);
      console.log(this.servicio);
    });
  }

  public onSelectedPaciente(item: any) {
    this.onIdServicio(item.idServicio);
  }

  public onDeselectPaciente(item: any) {
    this.inicializaObjetos();
  }

  public crearPago(){
    let pagoServicio ={
      idServicio : this.selectedIdServicio,
      monto:this.montoServicio,
      motivo: this.motivoServicio
    }
    console.log(pagoServicio);
  }
}
