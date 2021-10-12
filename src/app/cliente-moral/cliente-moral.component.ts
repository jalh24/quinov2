import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Contacto } from '../_model/contacto';

@Component({
  selector: 'app-cliente-moral',
  templateUrl: './cliente-moral.component.html',
  styleUrls: ['./cliente-moral.component.scss']
})
export class ClienteMoralComponent implements OnInit {
  PAGO_DATA: Contacto[] = [];
  pagoSource = new MatTableDataSource<Contacto>(this.PAGO_DATA);

  contactosColumns: string[] = ['nombre', 'parentesco', 'telefono', 'tipoTelefono', 'correoElectronico', 'deleteContacto'];
  @ViewChild('contactosTable', { static: true }) pagosTable: MatTable<any>;
  selected = new FormControl(0);
  @ViewChild('myForm') ngForm: NgForm;
  constructor() { }

  ngOnInit(): void {
  }
  pagAtras(index) {
    if (this.selected.value > 0) {
      this.selected.setValue(this.selected.value - index);
    }

  }
  pagDelante(index) {
    if (this.selected.value < 1) {
      this.selected.setValue(this.selected.value + index);
    }

  }

}
