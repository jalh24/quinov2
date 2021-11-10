import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../colaboradores/colaboradores.component';

@Component({
  selector: 'app-modal-whatsapp',
  templateUrl: './modal-whatsapp.component.html',
  styleUrls: ['./modal-whatsapp.component.scss']
})
export class ModalWhatsappComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Token: localStorage.getItem('token')
    })
  };
  mensaje:string;
  enviado:boolean;
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.enviado = false;
  }

  enviarMensaje() {
    this.http.post<any>('/api/colaborador/enviaMensaje', {mensaje: this.mensaje, colaboradores:this.data},this.httpOptions).subscribe(data => {
      this.enviado = true;
    });
  }
}
