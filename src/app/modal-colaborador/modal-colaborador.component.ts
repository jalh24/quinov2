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
  constructor(public dialogRef: MatDialogRef<ModalColaboradorComponent>, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.getColaboradores2();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getColaboradores2(event?: PageEvent) {
    if (this.data) {
      this.colaborador = this.data.data;
      this.colaborador.cuentasColaborador= this.data.data.cuentasColaborador;
    }
    return event;
  }
}
