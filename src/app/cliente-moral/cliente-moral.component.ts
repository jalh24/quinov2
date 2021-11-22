import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Contacto } from '../_model/contacto';
import { Cliente } from '../_model/cliente';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-moral',
  templateUrl: './cliente-moral.component.html',
  styleUrls: ['./cliente-moral.component.scss']
})
export class ClienteMoralComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  CONTACTO_DATA: Contacto[] = [];
  contactoSource = new MatTableDataSource<Contacto>(this.CONTACTO_DATA);
  contacto: Contacto;
  contactos: Contacto[];
  selectedPais = 1;
  idContacto: number;
  selectedEstado = null;
  selectedCodigoPostal = null;
  public cliente: Cliente;
  dtTriggerContacto = new Subject();
  colonias: any[];
  ciudades: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  estados: any[];
  parentescos: any[];
  paises: any[];
  tiposTelefono: any[];
  datos: any;
  idCliente: number;
  dtOptionsContacto: any = {};
  contactosColumns: string[] = ['nombre', 'parentesco', 'telefono', 'tipoTelefono', 'correoElectronico', 'deleteContacto'];
  @ViewChild('contactosTable', { static: true }) contactosTable: MatTable<any>;
  selected = new FormControl(0);
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild('myForm') ngForm: NgForm;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Token: localStorage.getItem('token')
    })
  };
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();     
      this.dtTriggerContacto.next();    
      //console.log(this.dtTriggerContacto);
    });
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastService: NgbToastService
  ) { }



  ngOnInit(): void {
    this.inicializaObjetos();
    this.comboEstados();
    this.comboPaises(); 
    this.comboTiposTelefono();
    this.comboParentescos();
    this.dtOptionsContacto = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        console.log(data);
        const self = this;

        $('td', row).on('click', () => {
          if (self.contacto !== null) {
            if (self.contacto.idContacto === data.idContacto) {
              this.contacto = null;
            } else {
              self.contacto = data;
            }
          } else {
            self.cliente = data;
          }
        });

        return row;
      }

    };
  }

  inicializaObjetos() {
    this.cliente = new Cliente();
    this.cliente.idCliente = null;
    this.cliente.rfc = null;
    this.cliente.sgmm = null;
    this.cliente.calle1 = null;
    this.cliente.calle2 = null;
    this.cliente.codigoPostal = null;
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
    this.cliente.referencia = null;
    this.cliente.idTipoCliente = null;
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
    this.cliente.idPaisNacimiento = null;
    this.cliente.idEstadoNacimiento = null;
    this.cliente.idCiudadNacimiento = null;
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
    this.cliente.alzheimer = null;
    this.cliente.imss = null;
    this.cliente.contactosCliente == [];
    this.idContacto = 0;

    this.contactos = [];
    this.contacto = {
      idContacto: null,
      nombre: null,
      parentesco: null,
      telefono: null,
      tipoTelefono: null,
      correoElectronico: null
    };
    this.contactoSource.data = [];
    
    this.route.queryParams.subscribe(params=>{
      this.idCliente = params['idCliente'];
    });

    if(this.idCliente) {
      this.llenarCampos(this.idCliente);
    }
  }

  public guardarCliente(ngForm: NgForm) {
    
    this.cliente.idPais = 1;   
    this.cliente.idTipoCliente = true;
    this.cliente.contactosCliente = this.contactoSource.data;
   
    console.log(this.cliente);
    if (ngForm.valid) {
      this.http.post<any>('/api/cliente/create', this.cliente,this.httpOptions).subscribe(data => {
        this.showSuccess(NgbToastType.Success, "Se registro el cliente exitosamente");

      });
      this.inicializaObjetos();
    } else {
      this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
    }

  }

  agregarContacto(contactoParam: any) {
    if (contactoParam != null) {
      this.contacto = contactoParam;
    }
    if (this.contacto.idContacto == null) {
      if (this.contactoSource.data.length == 0) {
        this.idContacto = this.contactoSource.data.length + 1;
      } else {
        this.idContacto++;
      }
      this.contacto.idContacto = this.idContacto;
    }
    this.CONTACTO_DATA.push(this.contacto);
    this.contactoSource = new MatTableDataSource(this.CONTACTO_DATA);
    
    this.contacto = {
      idContacto: null,
      nombre: null,
      parentesco: null,
      telefono: null,
      tipoTelefono: null,
      correoElectronico: null,
    };

  }

  borraContacto(contactoTmp) {
    this.CONTACTO_DATA = this.CONTACTO_DATA.filter((value, key) => {
      return value.idContacto != contactoTmp.idContacto;
    });
    this.contactoSource.data = this.contactoSource.data.filter((value, key) => {
      return value.idContacto != contactoTmp.idContacto;
    });
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
  public comboCiudades(idEstadoNacimiento) {
    this.cliente.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento,this.httpOptions).subscribe(data => {
      this.ciudades = data.data;
    });
  }
  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais,this.httpOptions).subscribe(data => {
      this.estados = data.data;
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
    });
  }

  public llenarCampos(idCliente) {
    this.http.post<any>('/api/cliente/clienteId', { idCliente: idCliente },this.httpOptions).subscribe(data => {
      this.datos = data.data;
      console.log(this.datos);
      this.cliente = this.datos[0];
      
      //this.onCiudadNacimiento(this.cliente.idCiudadNacimiento);
     // this.CONTACTO_DATA = this.datos['cuentas'];
     // this.contactoSource = new MatTableDataSource(this.CONTACTO_DATA);
      console.log(this.CONTACTO_DATA);
      this.comboCiudades(this.cliente.idEstadoNacimiento);
     // this.onCiudad(this.cliente.idCiudadNacimiento);
      this.onCodigoPostal(this.cliente.codigoPostal);
      this.onColonia(this.cliente.idColonia);
      this.cliente.peso = Math.floor(this.cliente.peso);
      this.cliente.estatura = Math.floor(this.cliente.estatura);
      this.datos.cuentas.forEach(element => {
        let contacto = new Contacto;
        contacto.idContacto = element.idContacto;
        contacto.nombre = element.nombre;
        contacto.parentesco = element.parentesco;
        contacto.correoElectronico= element.correoElectronico;
        contacto.telefono = element.telefono;
        contacto.tipoTelefono = element.tipoTelefono;
        this.agregarContacto(contacto);
      });
      // this.datos.cuentas.forEach(element => {
      //   this.CONTACTO_DATA.push(element);
      // });
      // // this.CONTACTO_DATA.push(this.contacto);
      // this.contactoSource = new MatTableDataSource(this.CONTACTO_DATA);
    });
  }
  public editarCliente(ngForm: NgForm){
    
    this.http.put<any>('/api/cliente/update', this.cliente, this.httpOptions).subscribe(data => {
      window.history.back();
      this.showSuccess(NgbToastType.Success, "Se edito el cliente exitosamente");

    });
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

  onColonia(value: any) {
    this.cliente.idColonia = value;
  }

  onCiudad(value: any) {
    this.cliente.idCiudad = value;
  }

  onEstado(value: any) {
    this.cliente.idEstado = value;
  }

  onTipoTel1(value: any) {
    this.cliente.idTipoTelefono = value;
  }

  onTipoTel2(value: any) {
    this.cliente.idTipoTelefono2 = value;
  }

  onParentescoContacto(event){
    
    this.contacto.parentesco = this.parentescos.find(parentesco => { return parentesco.idParentesco == event });
    
  }

  onTipoTelContacto(event){
    this.contacto.tipoTelefono = this.tiposTelefono.find(tipoTelefono => { return tipoTelefono.idTipoTel == event });
    
  }
}
