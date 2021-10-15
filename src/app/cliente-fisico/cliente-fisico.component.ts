import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Cliente } from '../_model/cliente';


@Component({
  selector: 'app-cliente-fisico',
  templateUrl: './cliente-fisico.component.html',
  styleUrls: ['./cliente-fisico.component.scss']
})
export class ClienteFisicoComponent implements OnInit {

  selectedPais = 1;
  selectedEstado = null;
  selectedCodigoPostal = null;

  public cliente: Cliente;
  
  sexos: any[];
  complexiones: any[];
  parentescos: any[];
  colonias: any[];
  ciudades: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  estados: any[];
  paises: any[];
  estadosCiviles: any[];
  tiposTelefono: any[];
  selected = new FormControl(0);
  @ViewChild('myForm') ngForm: NgForm;
  constructor(
    private http: HttpClient,
    private toastService: NgbToastService
    
  ) { }

  ngOnInit(): void {
    this.inicializaObjetos();
    this.comboEstados();
    this.comboPaises();   
    this.comboComplexiones();
    this.comboParentescos();
    this.comboSexos();
    this.comboEstadosCiviles();
    this.comboTiposTelefono();
  }
  inicializaObjetos() {
    this.cliente = new Cliente();
    this.cliente.idCliente = null;
    this.cliente.nombre = null;
    this.cliente.a_paterno = null;
    this.cliente.a_materno = null;
    this.cliente.correoElectronico = null;
    this.cliente.fecha_nacimiento = null;
    this.cliente.idSexo = null;
    this.cliente.peso = null;
    this.cliente.estatura = null;
    this.cliente.idEstadoCivil = null;
    this.cliente.idComplexion = null;
    this.cliente.sgmm = null;
    this.cliente.calle1 = null;
    this.cliente.calle2 = null;
    this.cliente.codigoPostal = null;
    this.cliente.idPaisNacimiento = null;
    this.cliente.idEstadoNacimiento = null;
    this.cliente.idCiudadNacimiento = null;
    this.cliente.idPais = null;
    this.cliente.idEstado = null;
    this.cliente.idCiudad = null;
    this.cliente.idColonia = null;
    this.cliente.noExt = null;
    this.cliente.noInt = null;
    this.cliente.telefono = null;
    this.cliente.idTipoTelefono = null;
    this.cliente.telefono2 = null;
    this.cliente.idTipoTelefono2 = null;
    this.cliente.nombreContacto = null;
    this.cliente.idParentescoContacto = null;
    this.cliente.telefonoContacto = null;
    this.cliente.correoContacto = null;
    this.cliente.nombreContacto2 = null;
    this.cliente.idParentescoContacto2 = null;
    this.cliente.telefonoContacto2 = null;
    this.cliente.correoContacto2 = null;
    this.cliente.nombreMedico = null;
    this.cliente.especialidadesMedico = null;
    this.cliente.telefonoMedico = null;
    this.cliente.correoMedico = null;
    this.cliente.cirugiasRecientes = null;
    this.cliente.accidentesRecientes = null;
    this.cliente.enfermedadesRecientes = null;
    this.cliente.enfermedadesActuales = null;
    this.cliente.referencia = null;
    this.cliente.alzheimer = null;
    this.cliente.idTipoCliente = null;
  }

  public guardarCliente(ngForm: NgForm) {
    
    this.cliente.idPais = 1;
    this.cliente.idPaisNacimiento = 1;
    this.cliente.idTipoCliente = false;

   console.log(this.cliente);
    if (ngForm.valid) {
      this.http.post<any>('/api/cliente/create', this.cliente).subscribe(data => {
        this.showSuccess(NgbToastType.Success, "Se registro el cliente exitosamente");

      });
      this.inicializaObjetos();
    } else {
      this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
    }

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

  removeToast(toast: NgbToast): void {
    this.toastService.remove(toast);
  }

  
  public comboEstadosCiviles() {
    this.http.get<any>('/api/catalogo/comboEstadosCiviles').subscribe(data => {
      this.estadosCiviles = data.data;
    });
  }

  public comboTiposTelefono() {
    this.http.get<any>('/api/catalogo/tiposTelefono').subscribe(data => {
      this.tiposTelefono = data.data;
    });
  }

  public comboColonias() {
    this.http.get<any>('/api/catalogo/colonias').subscribe(data => {
      this.colonias = data.data;
    });
  }

  public comboSexos() {
    this.http.get<any>('/api/catalogo/sexos').subscribe(data => {
      this.sexos = data.data;
    });
  }

  public comboCiudades(idEstadoNacimiento) {
    this.cliente.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento).subscribe(data => {
      this.ciudades = data.data;
    });
  }

  public comboComplexiones() {
    this.http.get<any>('/api/catalogo/complexiones').subscribe(data => {
      this.complexiones = data.data;
    });
  }

  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais).subscribe(data => {
      this.estados = data.data;
    });
  }

  public comboParentescos() {
    this.http.get<any>('/api/catalogo/parentescos').subscribe(data => {
      this.parentescos = data.data;
    });
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises').subscribe(data => {
      this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.cliente.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal).subscribe(data => {
      this.colonias = data.data;
      this.cliente.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.cliente.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado).subscribe(data => {
          this.estadosDir = data.data;
        });
      });
    });
  }

  onColonia(value: any) {
    this.cliente.idColonia = value;
  }

  onCiudad(value: any) {
    this.cliente.idCiudad = value;
  }

  onEstado(value: any) {
    this.cliente.idEstado = value;
  }

  onEstadoCivil(value: any) {
    this.cliente.idEstadoCivil = value;
  }

  
  onComplexion(value: any) {
    this.cliente.idComplexion = value;
  }

  onSexo(value: any) {
    this.cliente.idSexo = value;
  }

  onCiudadNacimiento(value: any) {
    this.cliente.idCiudadNacimiento = value;
  }
  onTipoTel1(value: any) {
    this.cliente.idTipoTelefono = value;
  }
  onTipoTel2(value: any) {
    this.cliente.idTipoTelefono2 = value;
  }
  onParentesco1(value: any) {
    this.cliente.idParentescoContacto = value;
  }
  onParentesco2(value: any) {
    this.cliente.idParentescoContacto2 = value;
  }
 

}