import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
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
    if (this.selected.value < 5) {
      this.selected.setValue(this.selected.value + index);
    }

  }
}
