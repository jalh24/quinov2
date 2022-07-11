import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Cliente } from '../_model/cliente';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UsuarioFacturacion } from '../_model/usuarioFacturacion';


@Component({
  selector: 'app-cliente-fisico',
  templateUrl: './cliente-fisico.component.html',
  styleUrls: ['./cliente-fisico.component.scss']
})
export class ClienteFisicoComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  selectedPais = 1;
  selectedPaisCliente = 1;
  selectedEstado = null;
  selectedCodigoPostal = null;
  selectedCodigoPostalcliente = null;

  selectedItems: any = [];
  usuariosFacturacionSettings: IDropdownSettings = {};
  usuariosFacturacion: any;
  public cliente: Cliente;
  public usuarioFacturacion: UsuarioFacturacion;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Token: localStorage.getItem('token')
    })
  };
  clienteExistente = false;
  textBoxDisabledSeg = true;
  accionInfoPaciente = true;
  existeUsuarioFacturacion = false;
  combinacionClienteUsuarioFacturacion: {};
  sexos: any[];
  complexiones: any[];
  parentescos: any[];
  colonias: any[];
  coloniascliente: any[];
  ciudades: any[];
  ciudadescliente: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  estadoscliente: any[];
  bancoscliente: any[];
  estados: any[];
  paises: any[];
  paisescliente: any[];
  estadosCiviles: any[];
  tiposTelefono: any[];
  validacionCorreo: any[];
  infoUsuarioFacturacion: any[];
  validacionCorreoFlag: boolean = false;
  botonValidarFlag: boolean = false;
  datos: any;
  idCliente: number;
  selected = new FormControl(0);
  @ViewChild('myForm') ngForm: NgForm;
  clienteInfoInicial: any;
  constructor(private route: ActivatedRoute,
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
    this.comboBancos();
    this.comboUsuariosFacturacion();

    this.usuariosFacturacionSettings = {
      singleSelection: true,
      idField: 'idUsuarioFacturacion',
      textField: 'nombrecompleto',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.route.queryParams.subscribe(params=>{
      this.idCliente = params['idCliente'];
    });

    if(this.idCliente) {
      this.llenarCampos(this.idCliente);
    }

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
    this.cliente.imss = null;
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
    this.cliente.rfc = null;
    this.cliente.contactosCliente = [];
    this.usuarioFacturacion = new UsuarioFacturacion;
    this.usuarioFacturacion.nombre = null;
    this.usuarioFacturacion.a_paterno = null;
    this.usuarioFacturacion.a_materno = null;
    this.usuarioFacturacion.telefono = null;
    this.usuarioFacturacion.correoElectronico = null;
    this.usuarioFacturacion.calle1 = null;
    this.usuarioFacturacion.calle2 = null;
    this.usuarioFacturacion.noExt = null;
    this.usuarioFacturacion.noInt = null;
    this.usuarioFacturacion.codigoPostal = null;
    this.usuarioFacturacion.idColonia = null;
    this.usuarioFacturacion.idCiudad = null;
    this.usuarioFacturacion.idEstado = null;
    this.usuarioFacturacion.idPais = null;
    this.usuarioFacturacion.idBanco = null;
    this.usuarioFacturacion.tipoCuenta = null;
    this.usuarioFacturacion.numeroCuenta = null;
    this.usuarioFacturacion.clienteExistente = null;
    this.usuarioFacturacion.clienteExistenteSelected = null;
  }

  inicializaUsuarioFacturacion() {
    this.usuarioFacturacion = new UsuarioFacturacion;
    this.usuarioFacturacion.nombre = null;
    this.usuarioFacturacion.a_paterno = null;
    this.usuarioFacturacion.a_materno = null;
    this.usuarioFacturacion.telefono = null;
    this.usuarioFacturacion.correoElectronico = null;
    this.usuarioFacturacion.calle1 = null;
    this.usuarioFacturacion.calle2 = null;
    this.usuarioFacturacion.noExt = null;
    this.usuarioFacturacion.noInt = null;
    this.usuarioFacturacion.codigoPostal = null;
    this.usuarioFacturacion.idColonia = null;
    this.usuarioFacturacion.idCiudad = null;
    this.usuarioFacturacion.idEstado = null;
    this.usuarioFacturacion.idPais = null;
    this.usuarioFacturacion.idBanco = null;
    this.usuarioFacturacion.tipoCuenta = null;
    this.usuarioFacturacion.numeroCuenta = null;
    this.usuarioFacturacion.clienteExistente = null;
    this.usuarioFacturacion.clienteExistenteSelected = null;
  }

  public guardarCliente(ngForm: NgForm) { 
       
    this.cliente.clienteExistente = this.clienteExistente;
    console.log(this.cliente.clienteExistenteSelected);

    this.cliente.idPais = 1;
    this.cliente.idPaisNacimiento = 1;
    this.cliente.idPaiscliente = 1;
    this.cliente.idTipoCliente = false;

   console.log(this.cliente);
    this.combinacionClienteUsuarioFacturacion = {cliente:this.cliente, usuariofacturacion:this.usuarioFacturacion};
    if (ngForm.valid) {
      this.http.post<any>('/api/cliente/create', this.combinacionClienteUsuarioFacturacion,this.httpOptions).subscribe(data => {
        this.showSuccess(NgbToastType.Success, "Se registro el cliente exitosamente");
        window.history.back();
      });
     // this.inicializaObjetos();
    } else {
      this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
    }

  }

  onValidar() {
    this.validacionCorreoFlag = true;
    this.http.get<any>('/api/cliente/validacionCorreo?correoElectronico=' + this.usuarioFacturacion.correoElectronico,this.httpOptions).subscribe(data => {
      this.validacionCorreo = data.data;
      if (this.validacionCorreo[0]['validacionCorreo'] == "1") {
        this.botonValidarFlag = false;
        // this.validacionCorreoFlag = true;
        this.http.get<any>('/api/cliente/usuariosFacturacionCorreo?correoElectronico=' + this.usuarioFacturacion.correoElectronico,this.httpOptions).subscribe(data => {
          this.infoUsuarioFacturacion = data.data;
          this.usuarioFacturacion = this.infoUsuarioFacturacion[0];
          console.log(this.usuarioFacturacion);
          this.onCodigoPostalCliente(this.usuarioFacturacion.codigoPostal);
          this.selectedCodigoPostalcliente = this.usuarioFacturacion.codigoPostal;
          this.clienteExistente = true;
          this.cliente.clienteExistenteSelected = this.usuarioFacturacion.idUsuarioFacturacion;
        });
      } else if (this.validacionCorreo[0]['validacionCorreo'] == "0") {
        this.botonValidarFlag = true;
        // this.validacionCorreoFlag = false;
        this.clienteExistente = false;
      }
    });
    console.log(this.botonValidarFlag);
  }




  public llenarCampos(idCliente) {
    this.http.post<any>('/api/cliente/clienteId', { idCliente: idCliente },this.httpOptions).subscribe(data => {
      this.datos = data.data;
      console.log(this.datos);
      this.cliente = this.datos[0];
      this.usuarioFacturacion = this.datos['usuarioFacturacion'];
      if (this.usuarioFacturacion == undefined) {
        this.inicializaUsuarioFacturacion();
      }
      console.log(this.usuarioFacturacion);
      this.cliente.idPaiscliente = 1;
      console.log(this.datos);
      if (this.cliente.idUsuarioFacturacion != null) {
        this.selectedItems.push(this.datos.usuarioFacturacion);
        console.log(this.selectedItems);
        this.existeUsuarioFacturacion = true;
        this.clienteExistente = true;
      } else {
        this.existeUsuarioFacturacion = false;
        this.clienteExistente = false;
      }
      this.comboCiudades(this.cliente.idEstadoNacimiento);
      this.onCiudadNacimiento(this.cliente.idCiudadNacimiento);
      this.onCodigoPostal(this.cliente.codigoPostal);
      this.onCodigoPostalCliente(this.usuarioFacturacion.codigoPostal);
      this.onColonia(this.cliente.idColonia);
      this.onColoniaCliente(this.usuarioFacturacion.idColonia);
      //this.onCiudadNacimiento(this.cliente.idCiudadNacimiento);
      this.selectedCodigoPostal = this.cliente.codigoPostal;
      this.selectedCodigoPostalcliente = this.usuarioFacturacion.codigoPostal;
      this.cliente.peso = Math.floor(this.cliente.peso);
      // this.cliente.estatura = Math.floor(this.cliente.estatura);
      // this.datos.cuentas.forEach(element => {
      //   this.PAGO_DATA.push(element);
      // });
      // // this.PAGO_DATA.push(this.pago);
      // this.pagoSource = new MatTableDataSource(this.PAGO_DATA);
    });
  }

  public editarCliente(ngForm: NgForm){
    
    // let object = {cliente: this.cliente, idUsuarioFacturacion: null};
    this.cliente.clienteExistente = this.clienteExistente;
    this.combinacionClienteUsuarioFacturacion = {cliente:this.cliente, usuariofacturacion:this.usuarioFacturacion};
    console.log(this.combinacionClienteUsuarioFacturacion);
    this.http.post<any>('/api/cliente/update', this.combinacionClienteUsuarioFacturacion, this.httpOptions).subscribe(data => {
      window.history.back();
      this.showSuccess(NgbToastType.Success, "Se edito el cliente exitosamente");
    });
  }

  pagAtras(index) {
    if (this.selected.value > 0) {
      this.selected.setValue(this.selected.value - index);
    }

  }
  pagDelante(index) {
    if (this.selected.value < 6) {
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

  enableSeguros() {
    this.textBoxDisabledSeg = false;
  }
  disableSeguros() {
    this.textBoxDisabledSeg = true;
  }

  enableAccionInfoPaciente() {
    this.accionInfoPaciente = false;
  }
  disableAccionInfoPaciente() {
    this.accionInfoPaciente = true;
  }

  public comboEstadosCiviles() {
    this.http.get<any>('/api/catalogo/comboEstadosCiviles',this.httpOptions).subscribe(data => {
      this.estadosCiviles = data.data;
    });
  }

  public comboTiposTelefono() {
    this.http.get<any>('/api/catalogo/tiposTelefono',this.httpOptions).subscribe(data => {
      this.tiposTelefono = data.data;
    });
  }

  public comboColonias() {
    this.http.get<any>('/api/catalogo/colonias',this.httpOptions).subscribe(data => {
      this.colonias = data.data;
    });
  }

  public comboSexos() {
    this.http.get<any>('/api/catalogo/sexos',this.httpOptions).subscribe(data => {
      this.sexos = data.data;
    });
  }

  public comboUsuariosFacturacion() {
    this.http.get<any>('/api/cliente/usuariosFacturacion', this.httpOptions).subscribe(data => {
      this.usuariosFacturacion = data.data;
    });
  }

  public comboCiudades(idEstadoNacimiento) {
   
      this.cliente.idEstadoNacimiento = idEstadoNacimiento;
    
    
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento,this.httpOptions).subscribe(data => {
      this.ciudades = data.data;
      if (idEstadoNacimiento==19) {
        const ciudadesPrincipales = [19049,19019,19041,19048,19018,19046,19031,19021,19026,19006,19039];
        const ciudadesArreglo = [];
        ciudadesPrincipales.forEach(element => {
          ciudadesArreglo.push(this.ciudades.find(value => value.idCiudad == element));
        });
        ciudadesArreglo.forEach(element => {
          this.ciudades.unshift(element);
        });
        this.ciudades = this.ciudades.filter((value, index) => this.ciudades.indexOf(value) === index);
      }
      console.log(this.ciudades);
    });
  }

  public comboComplexiones() {
    this.http.get<any>('/api/catalogo/complexiones',this.httpOptions).subscribe(data => {
      this.complexiones = data.data;
    });
  }

  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais,this.httpOptions).subscribe(data => {
      this.estados = data.data;
    });
  }

  public comboBancos() {
    this.http.get<any>('/api/catalogo/bancos', this.httpOptions).subscribe(data => {
      this.bancoscliente = data.data;
    });
  }

  public comboParentescos() {
    this.http.get<any>('/api/catalogo/parentescos',this.httpOptions).subscribe(data => {
      this.parentescos = data.data;
    });
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises',this.httpOptions).subscribe(data => {
      this.paises = data.data;
      this.paisescliente = data.data;
    });
  }

  public onEditarInformacion() {
    this.botonValidarFlag = true;
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.cliente.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal,this.httpOptions).subscribe(data => {
      this.colonias = data.data;
      this.cliente.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad,this.httpOptions).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.cliente.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado,this.httpOptions).subscribe(data => {
          this.estadosDir = data.data;
        });
      });
    });
  }

    public onCodigoPostalCliente(selectedCodigoPostalcliente) {
    // this.cliente.codigoPostalcliente = selectedCodigoPostalcliente;
    this.usuarioFacturacion.codigoPostal = selectedCodigoPostalcliente;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostalcliente,this.httpOptions).subscribe(data => {
      this.coloniascliente = data.data;
      this.usuarioFacturacion.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad,this.httpOptions).subscribe(dataCiudad => {
        this.ciudadescliente = dataCiudad.data;
        this.usuarioFacturacion.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado,this.httpOptions).subscribe(data => {
          this.estadoscliente = data.data;
        });
      });
    });
  }

  onTipoCuentaCliente(event) {
    this.cliente.tipoCuentacliente = event;
  }

  onItemSelect(item: any) {
    this.cliente.clienteExistenteSelected = item.idUsuarioFacturacion;
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


 onTelefono1(telefono){
if (this.cliente.telefonoContacto == null) {
  this.cliente.telefonoContacto = telefono;
} 
//if(this.cliente.telefonoContacto2 == null){
  //this.cliente.telefonoContacto2 = telefono;

//}
 }

 onClienteExistente() {
  this.clienteExistente = !this.clienteExistente;
}


  onColonia(value: any) {
    this.cliente.idColonia = value;   
  }

  onColoniaCliente(value: any) {
    this.cliente.idColoniacliente = value;
    console.log(value);
  }

  onCiudad(value: any) {
    this.cliente.idCiudad = value;
  }

  onCiudadCliente(value: any) {
    this.cliente.idCiudadcliente = value;
    console.log(value);
  }

  onBancoCliente(value: any) {
    this.cliente.idBancocliente = value;
  }

  onEstado(value: any) {
    this.cliente.idEstado = value;
  }

  onEstadoCliente(value: any) {
    this.cliente.idEstadocliente = value;
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
    console.log(value);
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
