import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pago } from '../_model/pago';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experiencia } from '../_model/experiencia';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Estatus } from '../_model/estatus';
import { FormControl } from '@angular/forms';
import { faMinus, faEquals } from '@fortawesome/free-solid-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Servicio } from '../_model/servicio';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-servicio',
  templateUrl: './alta-servicio.component.html',
  styleUrls: ['./alta-servicio.component.scss']
})

export class AltaServicioComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };
 
  faMinus = faMinus;
  faEquals = faEquals;
  tabVisible: any = 1;
  @ViewChild('myForm') ngForm: NgForm;
  selectedCodigoPostal = null;
  selectedItems: any = [];
  selectedColaboradorItems: any = [];
  clientes: any;
  datos: any;
  colaboradores: any;
  clientesSettings: IDropdownSettings = {};
  colaboradoresSettings: IDropdownSettings = {};
  paises: any[];
  estados: any[];
  estadoPorId: any;
  selectedPais = 1;
  ciudades: any[];
  colonias: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  sexos: any[];
  complexiones: any[];
  parentescos: any[];
  estadosCiviles: any[];
  tiposTelefono: any[];
  tiposServicios: any[];
  responsables: any[];
  cliente: any[];
  colaborador: any[];
  idServicio: number;
  public servicio: Servicio;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastService: NgbToastService) { }

  ngOnInit(): void {
    this.comboClientes();
    this.comboColaboradores();
    this.comboPaises();
    this.comboEstados();
    this.inicializaObjetos();
    this.comboSexos();
    this.comboEstadosCiviles();
    this.comboTiposTelefono();
    this.comboTiposServicios();
    this.comboResponsables();
    this.comboComplexiones();
    this.comboParentescos();

    this.route.queryParams.subscribe(params => {
      this.idServicio = params['idColaborador'];
    });

    if (this.idServicio) {
      this.llenarCampos(this.idServicio);
    }

    this.clientesSettings = {
      singleSelection: true,
      idField: 'idCliente',
      textField: 'nombrecompleto',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.colaboradoresSettings = {
      singleSelection: false,
      idField: 'idColaborador',
      textField: 'nombrecompleto',
      unSelectAllText: 'Quitar Selecciones',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  selected = new FormControl(0);

  inicializaObjetos() {
    this.servicio = new Servicio();
    this.servicio.idServicio = null;
    this.servicio.idEstadoNacimiento = null;
    this.servicio.idCiudadNacimiento = null;
    this.servicio.fecha_nacimiento = null;
    this.servicio.precioServicio = null;
    this.servicio.cantidadPagada = null;
    this.servicio.cantidadPorPagar = null;
    this.servicio.colabReq = null;
    this.servicio.edad = null;
    this.servicio.nombre = null;
    this.servicio.a_paterno = null;
    this.servicio.a_materno = null;
    this.servicio.idPaisNacimiento = null;
    this.servicio.idCiudadNacimiento = null;
    this.servicio.calle1 = null;
    this.servicio.calle2 = null;
    this.servicio.noExt = null;
    this.servicio.noInt = null;
    this.servicio.codigoPostal = null;
    this.servicio.idColonia = null;
    this.servicio.idCiudad = null;
    this.servicio.idEstado = null;
    this.servicio.idPais = null;
    this.servicio.referenciaDireccion = null;
    this.servicio.idSexo = null;
    this.servicio.idComplexion = null;
    this.servicio.peso = null;
    this.servicio.estatura = null;
    this.servicio.idEstadoCivil = null;
    this.servicio.telefono = null;
    this.servicio.idTipoTelefono = null;
    this.servicio.correoElectronico = null;
    this.servicio.idParentesco = null;
    this.servicio.nombreMedico = null;
    this.servicio.especialidadMedico = null;
    this.servicio.telefonoMedico = null;
    this.servicio.correoElectronicoMedico = null;
    this.servicio.enfermedades = null;
    this.servicio.procedimientos = null;
    this.servicio.medicamentos = null;
    this.servicio.notas = null;
    this.servicio.tieneCovid = false;
    this.servicio.tieneAlzheimer = false;
    this.servicio.movimiento = false;
    this.servicio.idTipoServicio = null;
    this.servicio.idResponsable = null;
    this.servicio.cliente = null;
    this.servicio.colaboradores = null;
    this.servicio.estatus = "Abierta";
  }

  public llenarCampos(idServicio) {
    this.http.get<any>('/api/servicio/datos?idServicio=' + idServicio, this.httpOptions).subscribe(data => {
      this.datos = data.data;
      this.servicio = this.datos[0];
      this.onFechaNacimiento();
      this.comboCiudades(this.servicio.idEstadoNacimiento);
      this.onCiudadNacimiento(this.servicio.idCiudadNacimiento);
      this.onCodigoPostal(this.servicio.codigoPostal);
      this.servicio.peso = Math.floor(this.servicio.peso);
      this.servicio.estatura = Math.floor(this.servicio.estatura);

      this.http.get<any>('/api/servicio/datosServClien?idCliente=' + this.servicio.cliente, this.httpOptions).subscribe(data => {
        this.selectedItems = [{
          idCliente: data.data[0].idCliente,
          nombrecompleto: data.data[0].nombrecompleto
        }
        ];
      });
    });

    this.http.get<any>('/api/servicio/datosServColab?idServicio=' + idServicio, this.httpOptions).subscribe(data => {
      this.selectedColaboradorItems = data.data;
      console.log(this.selectedColaboradorItems);
    });
  }

  public comboClientes() {
    this.http.get<any>('/api/catalogo/clientes', this.httpOptions).subscribe(data => {
      this.clientes = data.data;
    });
  }

  public comboClientesById(idCliente) {
    this.http.get<any>('/api/catalogo/clientesById?idCliente=' + idCliente, this.httpOptions).subscribe(data => {
      this.servicio.nombre = data.data[0].nombre;
      this.servicio.a_paterno = data.data[0].a_paterno;
      this.servicio.a_materno = data.data[0].a_materno;
    });
  }

  public comboColaboradores() {
    this.http.get<any>('/api/catalogo/colaboradores', this.httpOptions).subscribe(data => {
      this.colaboradores = data.data;
    });
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises', this.httpOptions).subscribe(data => {
      this.paises = data.data;
    });
  }

  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais, this.httpOptions).subscribe(data => {
      this.estados = data.data;
    });
  }

  public comboCiudades(idEstadoNacimiento) {
    this.servicio.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento, this.httpOptions).subscribe(data => {
      this.ciudades = data.data;
    });
  }

  public comboColonias() {
    this.http.get<any>('/api/catalogo/colonias', this.httpOptions).subscribe(data => {
      this.colonias = data.data;
    });
  }

  public comboSexos() {
    this.http.get<any>('/api/catalogo/sexos', this.httpOptions).subscribe(data => {
      this.sexos = data.data;
    });
  }

  public comboEstadosCiviles() {
    this.http.get<any>('/api/catalogo/comboEstadosCiviles', this.httpOptions).subscribe(data => {
      this.estadosCiviles = data.data;
    });
  }

  public comboTiposTelefono() {
    this.http.get<any>('/api/catalogo/tiposTelefono', this.httpOptions).subscribe(data => {
      this.tiposTelefono = data.data;
    });
  }

  public comboTiposServicios() {
    this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
      this.tiposServicios = data.data;
    });
  }

  public comboResponsables() {
    this.http.get<any>('/api/catalogo/responsables', this.httpOptions).subscribe(data => {
      this.responsables = data.data;
    });
  }

  public comboComplexiones() {
    this.http.get<any>('/api/catalogo/complexiones', this.httpOptions).subscribe(data => {
      this.complexiones = data.data;
    });
  }

  public comboParentescos() {
    this.http.get<any>('/api/catalogo/parentescos', this.httpOptions).subscribe(data => {
      this.parentescos = data.data;
    });
  }

  onCiudadNacimiento(value: any) {
    this.servicio.idCiudadNacimiento = value;
  }

  onFechaNacimiento() {
    const today = new Date();
    const birthDate = new Date(this.servicio.fecha_nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.servicio.edad = age;
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.servicio.codigoPostal = selectedCodigoPostal;

    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal, this.httpOptions).subscribe(data => {
      this.colonias = data.data;
      this.servicio.idCiudad = data.data[0].idCiudad;

      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad, this.httpOptions).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.servicio.idEstado = dataCiudad.data[0].idEstado;

        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado, this.httpOptions).subscribe(data => {
          this.estadosDir = data.data;
        });
      });
    });
  }

  onColonia(value: any) {
    this.servicio.idColonia = value;
  }

  onCiudad(value: any) {
    this.servicio.idCiudad = value;
  }

  onEstado(value: any) {
    this.servicio.idEstado = value;
  }

  onSexo(value: any) {
    this.servicio.idSexo = value;
  }

  onEstadoCivil(value: any) {
    this.servicio.idEstadoCivil = value;
  }

  onTipoTel1(value: any) {
    this.servicio.idTipoTelefono = value;
  }

  onTipoServicio(value: any) {
    this.servicio.idTipoServicio = value;
  }

  onParentesco(value: any) {
    this.servicio.idParentesco = value;
  }

  onPrecioChange() {
    if (this.servicio.precioServicio != null && this.servicio.cantidadPagada != null) {
      if (this.servicio.precioServicio >= this.servicio.cantidadPagada) {
        this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
      } else {
        this.servicio.cantidadPorPagar = null;
        alert("La precio del servicio debe de ser mayor o igual que la cantidad pagada");
      }
    }
  }

  onEstatusSelect(item: any) {
    if (this.selectedColaboradorItems.find(x => x.idColaborador === item.idColaborador) === undefined) {
      this.selectedColaboradorItems.push(item);
    }
    if (Object.keys(this.selectedColaboradorItems).length >= this.servicio.colabReq) {
      this.servicio.estatus = "Asignada";
    }
  }

  onEstatusDeSelect(item: any) {
    this.selectedColaboradorItems.forEach((element, index) => {
      if (element.idColaborador === item.idColaborador) this.selectedColaboradorItems.splice(index, 1);
    });
    this.servicio.estatus = "Abierta";
    this.servicio.colaboradores = null;
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

  onGrabarServicio(ngForm: NgForm) {
    if (this.servicio.idServicio) {
      this.servicio.idPais = 1;
      this.servicio.colaboradores = this.selectedColaboradorItems;
      if (ngForm.valid) {
        this.http.post<any>('/api/servicio/update', this.servicio, this.httpOptions).subscribe(data => {
          this.showSuccess(NgbToastType.Success, "Se actualizo el servicio exitosamente");
          window.history.back();
          alert("Se actualizo el servicio exitosamente");
        });
        this.inicializaObjetos();
      } else {
        this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
      }
    } else {
      this.servicio.idPais = 1;
      this.servicio.colaboradores = this.selectedColaboradorItems;
      if (ngForm.valid) {
        this.http.post<any>('/api/servicio/create', this.servicio, this.httpOptions).subscribe(data => {
          this.showSuccess(NgbToastType.Success, "Se creo el servicio exitosamente");
          window.history.back();
          alert("Se creo el servicio exitosamente");
        });
        this.inicializaObjetos();
      } else {
        this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
      }
    }
  }

  nuevoColaborador() {
    window.open('/colaborador');
  }

  onSelectedCliente(item: any) {
    this.comboClientesById(item.idCliente);
    this.servicio.cliente = item.idCliente;
  }

  onComplexion(value: any) {
    this.servicio.idComplexion = value;
  }

  onResponsable(value: any) {
    this.servicio.idResponsable = value;
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