import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { ColaboradorNuevoWhatsapp } from '../_model/colaboradorNuevoWhatsapp';
import { ColaboradorWhatsapp } from '../_model/colaboradorWhatsapp';

@Component({
  selector: 'app-colaboradores-whatsapp',
  templateUrl: './colaboradores-whatsapp.component.html',
  styleUrls: ['./colaboradores-whatsapp.component.scss']
})
export class ColaboradoresWhatsappComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
  
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  public colaboradorNuevoWhatsapp: ColaboradorNuevoWhatsapp;
  public colaboradorWhatsapp: ColaboradorWhatsapp;

  selected = new FormControl(0);
  whatsapp: any;
  nombreCompleto: string;
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  @ViewChild('paginator1',{read: MatPaginator}) paginator1: MatPaginator;
  @ViewChild('paginator2',{read: MatPaginator}) paginator2: MatPaginator;

  destinatarioAdicionalNumero: number = 0;
  numTelefono: any = [];
  telefonosEnviar: any = [];
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  COLABORADOR_WHATSAPP_DATA: ColaboradorWhatsapp[] = [];
  colaboradorWhatsappSource = new MatTableDataSource<ColaboradorWhatsapp>(this.COLABORADOR_WHATSAPP_DATA);
  colaboradorWhatsappColumns: string[] = ['nombre', 'telefono'];
  @ViewChild('colaboradoresWhatsappTable', { static: true }) colaboradoresWhatsappTable: MatTable<any>;

  COLABORADOR_NUEVO_WHATSAPP_DATA: ColaboradorNuevoWhatsapp[] = [];
  colaboradorNuevoWhatsappSource = new MatTableDataSource<ColaboradorNuevoWhatsapp>(this.COLABORADOR_NUEVO_WHATSAPP_DATA);
  colaboradorNuevoWhatsappColumns: string[] = ['destinatarioAdicional', 'telefono', 'acciones'];
  @ViewChild('colaboradoresNuevoWhatsappTable', { static: true }) colaboradoresNuevoWhatsappTable: MatTable<any>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastService: NgbToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {this.whatsapp = JSON.parse(params['whatsapp'])});
    console.log(this.whatsapp);
    this.colaboradorNuevoWhatsapp = new ColaboradorNuevoWhatsapp()
    this.colaboradorNuevoWhatsapp.telefono = 0;
    this.getWhatsappColaboradores();
    this.colaboradorWhatsapp = new ColaboradorWhatsapp();
    this.colaboradorWhatsapp.contacto = [];
    this.colaboradorWhatsapp.mensaje = null;
  }

  ngAfterViewInit() {
    this.colaboradorWhatsappSource.paginator = this.paginator1;
    this.colaboradorNuevoWhatsappSource.paginator = this.paginator2;
  }

  public getWhatsappColaboradores(event?: PageEvent) {
    // this.whatsapp.limit = event != undefined ? event.pageSize : this.pageSize;
    // this.whatsapp.start = event != undefined ? event.pageIndex : this.pageIndex;
    this.COLABORADOR_WHATSAPP_DATA = this.whatsapp;
    this.colaboradorWhatsappSource = new MatTableDataSource<ColaboradorWhatsapp>(this.COLABORADOR_WHATSAPP_DATA);
    this.whatsapp.forEach(element => {
      this.telefonosEnviar.push({nombre: element.nombrecompleto, telefono: element.telefono}); 
    });
    // this.http.post<any>('/api/colaborador/lista', this.colaboradorFiltro, this.httpOptions).subscribe(data => {
    //   this.COLABORADOR_DATA = data.data;
    //   this.colaboradorSource = new MatTableDataSource<Colaborador>(this.COLABORADOR_DATA);
    //   this.length = data.count.total;
    // });
    // this.addWhatsappColaboradores([{telefono: 8115080695, destinatarioAdicional: 1},{telefono: 8115080695, destinatarioAdicional: 2},{telefono: 8115080695, destinatarioAdicional: 3}]);
    return event;
  }

  public addWhatsappColaboradores(event?: PageEvent) {
    // telefono.push({telefono: 123456, destinatarioAdicional: 1});
    if (this.colaboradorNuevoWhatsapp.telefono>=1000000000) {
      this.destinatarioAdicionalNumero += 1;
      this.numTelefono.push({telefono: this.colaboradorNuevoWhatsapp.telefono, destinatarioAdicional: this.destinatarioAdicionalNumero});
      this.COLABORADOR_NUEVO_WHATSAPP_DATA = this.numTelefono;
      this.colaboradorNuevoWhatsappSource = new MatTableDataSource<ColaboradorNuevoWhatsapp>(this.COLABORADOR_NUEVO_WHATSAPP_DATA);
      this.colaboradorNuevoWhatsappSource.paginator = this.paginator2;
      this.colaboradorNuevoWhatsapp.telefono = 0;
    } else {
      alert("El numero tiene que ser de 10 digitos sin caracteres especiales");
    }
    // this.COLABORADOR_NUEVO_WHATSAPP_DATA = telefono;
    // console.log(this.COLABORADOR_NUEVO_WHATSAPP_DATA);
    // this.colaboradorNuevoWhatsappSource = new MatTableDataSource<ColaboradorNuevoWhatsapp>(this.COLABORADOR_NUEVO_WHATSAPP_DATA);
    return event;
  }

  public borraNumero(numeroTmp) {
    console.log("ENTRA");
    this.COLABORADOR_NUEVO_WHATSAPP_DATA = this.COLABORADOR_NUEVO_WHATSAPP_DATA.filter((value, key) => {
      return value.destinatarioAdicional != numeroTmp.destinatarioAdicional;
    });
    this.colaboradorNuevoWhatsappSource.data = this.colaboradorNuevoWhatsappSource.data.filter((value, key) => {
      return value.destinatarioAdicional != numeroTmp.destinatarioAdicional;
    });
  }

  public cancelar () {
    window.history.back();
  }
  
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

  public enviarWhatsapp(ngForm: NgForm) {
    this.numTelefono.forEach(element => {
      this.telefonosEnviar.push({nombre: null, telefono: element.telefono});
    });
    this.colaboradorWhatsapp.contacto = this.telefonosEnviar;
    console.log(this.colaboradorWhatsapp);
    if (ngForm.valid) {
      this.http.post<any>('/api/mensajeWhatsapp/create', this.colaboradorWhatsapp, this.httpOptions).subscribe(data => {
        this.showSuccess(NgbToastType.Success, "Se mandó el mensaje exitosamente");
        window.history.back();
        alert("Se mandó el mensaje exitosamente");
      });
    }
  }
}
