import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogData } from '../colaboradores/colaboradores.component';
import { HistorialServicio } from '../_model/historialservicio';

@Component({
  selector: 'app-modal-colaborador',
  templateUrl: './modal-colaborador.component.html',
  styleUrls: ['./modal-colaborador.component.scss']
})
export class ModalColaboradorComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  historialServicios: any = [];
  public historialservicio: HistorialServicio;
  colaborador: any;
  disponibilidad: any;
  constructor(public dialogRef: MatDialogRef<ModalColaboradorComponent>, private router:Router, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  fotoFlag: boolean = false;

  ngOnInit(): void {
    this.disponibilidad = {
      todosDias: "",
      lunes: "",
      martes: "",
      miercoles: "",
      jueves: "",
      viernes: "",
      sabado: "",
      domingo: ""
    };
    this.inicializaObjetos();
    this.getColaboradores2();
  }

  inicializaObjetos() {
    this.historialservicio = new HistorialServicio();
    this.historialservicio.fechaHistorialServicio = "";
    this.historialservicio.responsableHistorialServicio = "";
    this.historialservicio.observacionesHistorialServicio="";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getHistorialServicios() {
    this.http.post<any>('/api/colaborador/historialServiciosColaborador?idColaborador', { idColaborador: this.colaborador.idColaborador }, this.httpOptions).subscribe(data => {
      this.historialServicios = data.data;
      // this.historialServicios = this.historialServicios.reverse();

      this.historialServicios = this.historialServicios.map((obj) => {
        return { ...obj, fecha: new Date(obj.fecha), responsable: obj.responsable, observaciones: obj.observaciones };
      });

      console.log(this.historialServicios);

      this.historialServicios = this.historialServicios.sort(
        (objA, objB) => objB.fecha.getTime() - objA.fecha.getTime(),
      );
      this.historialServicios.forEach((element, index) => {
        this.historialServicios[index].fecha = element.fecha.toISOString().split('T')[0];
      });

      // console.log(this.historialServicios);
    });
  }

  llenarCamposHistorialServicio(element) {
    this.historialservicio.fechaHistorialServicio = element.fecha;
    this.historialservicio.responsableHistorialServicio = element.responsable;
    this.historialservicio.observacionesHistorialServicio = element.observaciones;
  }

  public getColaboradores2(event?: PageEvent) {
    if (this.data) {
      console.log(this.data.data);
      this.colaborador = this.data.data;
      this.colaborador.habilidades = JSON.parse(this.colaborador.habilidades);
      this.colaborador.especialidades = JSON.parse(this.colaborador.especialidades);
      if(this.colaborador.atiendeCovid==1){
        this.colaborador.atiendeCovid = "Si";
      } else if (this.colaborador.atiendeCovid==0){
        this.colaborador.atiendeCovid = "No";
      }
      if(this.colaborador.antecedentePenales==1){
        this.colaborador.antecedentePenales = "Si";
      } else if (this.colaborador.antecedentePenales==0){
        this.colaborador.antecedentePenales = "No";
      }
      if(this.colaborador.autoPropio==1){
        this.colaborador.autoPropio = "Si";
      } else if (this.colaborador.autoPropio==0){
        this.colaborador.autoPropio = "No";
      }
      if(this.colaborador.dispuestoViajar==1){
        this.colaborador.dispuestoViajar = "Si";
      } else if (this.colaborador.dispuestoViajar==0){
        this.colaborador.dispuestoViajar = "No";
      }
      if(this.colaborador.visa==1){
        this.colaborador.visa = "Si";
      } else if (this.colaborador.visa==0){
        this.colaborador.visa = "No";
      }
      if(this.colaborador.pasaporte==1){
        this.colaborador.pasaporte = "Si";
      } else if (this.colaborador.pasaporte==0){
        this.colaborador.pasaporte = "No";
      }
      if(this.colaborador.hijos==1){
        this.colaborador.hijos = "Si";
      } else if (this.colaborador.hijos==0){
        this.colaborador.hijos = "No";
      }
      if(this.colaborador.hijosViven==1){
        this.colaborador.hijosViven = "Si";
      } else if (this.colaborador.hijosViven==0){
        this.colaborador.hijosViven = "No";
      }
      if(this.colaborador.licenciaManejar==1){
        this.colaborador.licenciaManejar = "Si";
      } else if (this.colaborador.licenciaManejar==0){
        this.colaborador.licenciaManejar = "No";
      }
      if(this.colaborador.hacerComer==1){
        this.colaborador.hacerComer = "Si";
      } else if (this.colaborador.hacerComer==0){
        this.colaborador.hacerComer = "No";
      }
      if(this.colaborador.limpiarUtensiliosCocina==1){
        this.colaborador.limpiarUtensiliosCocina = "Si";
      } else if (this.colaborador.limpiarUtensiliosCocina==0){
        this.colaborador.limpiarUtensiliosCocina = "No";
      }
      if(this.colaborador.limpiarDormitorio==1){
        this.colaborador.limpiarDormitorio = "Si";
      } else if (this.colaborador.limpiarDormitorio==0){
        this.colaborador.limpiarDormitorio = "No";
      }
      if(this.colaborador.limpiarBano==1){
        this.colaborador.limpiarBano = "Si";
      } else if (this.colaborador.limpiarBano==0){
        this.colaborador.limpiarBano = "No";
      }
      if(this.colaborador.ayudaPaciente==1){
        this.colaborador.ayudaPaciente = "Si";
      } else if (this.colaborador.ayudaPaciente==0){
        this.colaborador.ayudaPaciente = "No";
      }
      console.log(this.colaborador.horario);
      console.log(this.colaborador.horario.indexOf("todosDiasTurno")+17);
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="Noche")){
        this.disponibilidad.todosDias = this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18));
      } else {
        this.disponibilidad.todosDias = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="Noche")){
        this.disponibilidad.lunes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14));
      } else {
        this.disponibilidad.lunes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="Noche")){
        this.disponibilidad.martes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15));
      } else {
        this.disponibilidad.martes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="Noche")){
        this.disponibilidad.miercoles = this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18));
      } else {
        this.disponibilidad.miercoles = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="Noche")){
        this.disponibilidad.jueves = this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15));
      } else {
        this.disponibilidad.jueves = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="Noche")){
        this.disponibilidad.viernes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16));
      } else {
        this.disponibilidad.viernes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="Noche")){
        this.disponibilidad.sabado = this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15));
      } else {
        this.disponibilidad.sabado = "";
      }
      // if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Nocturno")){
      //   this.disponibilidad.domingo = this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length);
      // } else {
      //   this.disponibilidad.domingo = "";
      // }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="TodoElDia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="Dia")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="Noche")){
        this.disponibilidad.domingo = this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16));
      } else {
        this.disponibilidad.domingo = "";
      }
      this.colaborador.cuentasColaborador= this.data.data.cuentasColaborador;
      console.log(this.colaborador);
      if (this.colaborador.foto) {
        this.fotoFlag = true;
      }
      this.getHistorialServicios();
    }
    return event;
  }
}
