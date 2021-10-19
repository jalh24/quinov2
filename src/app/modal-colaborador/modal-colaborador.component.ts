import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogData } from '../colaboradores/colaboradores.component';

@Component({
  selector: 'app-modal-colaborador',
  templateUrl: './modal-colaborador.component.html',
  styleUrls: ['./modal-colaborador.component.scss']
})
export class ModalColaboradorComponent implements OnInit {
  colaborador: any;
  disponibilidad: any;
  constructor(public dialogRef: MatDialogRef<ModalColaboradorComponent>, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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
    this.getColaboradores2();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getColaboradores2(event?: PageEvent) {
    if (this.data) {
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
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18))=="Nocturno")){
        this.disponibilidad.todosDias = this.colaborador.horario.substring(this.colaborador.horario.indexOf("todosDiasTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("todosDiasTurno")+18));
      } else {
        this.disponibilidad.todosDias = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14))=="Nocturno")){
        this.disponibilidad.lunes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("lunesTurno")+13,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("lunesTurno")+14));
      } else {
        this.disponibilidad.lunes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15))=="Nocturno")){
        this.disponibilidad.martes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("martesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("martesTurno")+15));
      } else {
        this.disponibilidad.martes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18))=="Nocturno")){
        this.disponibilidad.miercoles = this.colaborador.horario.substring(this.colaborador.horario.indexOf("miercolesTurno")+17,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("miercolesTurno")+18));
      } else {
        this.disponibilidad.miercoles = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15))=="Nocturno")){
        this.disponibilidad.jueves = this.colaborador.horario.substring(this.colaborador.horario.indexOf("juevesTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("juevesTurno")+15));
      } else {
        this.disponibilidad.jueves = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16))=="Nocturno")){
        this.disponibilidad.viernes = this.colaborador.horario.substring(this.colaborador.horario.indexOf("viernesTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("viernesTurno")+16));
      } else {
        this.disponibilidad.viernes = "";
      }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15))=="Nocturno")){
        this.disponibilidad.sabado = this.colaborador.horario.substring(this.colaborador.horario.indexOf("sabadoTurno")+14,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("sabadoTurno")+15));
      } else {
        this.disponibilidad.sabado = "";
      }
      // if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length)=="Nocturno")){
      //   this.disponibilidad.domingo = this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.length);
      // } else {
      //   this.disponibilidad.domingo = "";
      // }
      if((this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="Matutino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="Vespertino")||(this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16))=="Nocturno")){
        this.disponibilidad.domingo = this.colaborador.horario.substring(this.colaborador.horario.indexOf("domingoTurno")+15,this.colaborador.horario.indexOf('"',this.colaborador.horario.indexOf("domingoTurno")+16));
      } else {
        this.disponibilidad.domingo = "";
      }
      this.colaborador.cuentasColaborador= this.data.data.cuentasColaborador;
      console.log(this.colaborador);
    }
    return event;
  }
}
