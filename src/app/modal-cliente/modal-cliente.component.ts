import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../clientes/clientes.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss']
})
export class ModalClienteComponent implements OnInit {
  cliente: any;
  constructor(public dialogRef: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.getClientes2();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getClientes2(event?: PageEvent){
    if (this.data) {
      this.cliente = this.data.data;
    }
    if(this.cliente.alzheimer==1){
      this.cliente.alzheimer = "Si";
    } else if (this.cliente.alzheimer==0){
      this.cliente.alzheimer = "No";
    }
    return event;
  }

}
