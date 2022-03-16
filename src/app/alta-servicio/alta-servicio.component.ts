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
import { faMinus, faEquals, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Servicio } from '../_model/servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizadorInternoServicio } from '../_model/cotizadorInternoServicio';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { TooltipPosition } from '@angular/material/tooltip';

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
  COLABORADOR_DATA: CotizadorInternoServicio[] = [];
  colaboradorSource = new MatTableDataSource<CotizadorInternoServicio>(this.COLABORADOR_DATA);
  colaboradorColumns: string[] = ['nombre', 'sueldo', 'observacion', 'eliminar'];
  @ViewChild('colaboradoresTable', { static: true }) colaboradoresTable: MatTable<any>;
  faQuestionCircle = faQuestionCircle;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  
  faMinus = faMinus;
  faEquals = faEquals;
  faTrash = faTrash;
  faPlus = faPlus;
  tabVisible: any = 1;
  @ViewChild('myForm') ngForm: NgForm;
  selectedCodigoPostal = null;
  selectedItems: any = [];
  selectedColaboradorItems: any = [];
  selectedColaboradorItems2: any = [];
  selectedColaboradorItems2Ind: any = [];
  selectedColaboradorItems2Tbl: any = [];
  observacionColaborador: string;
  servicios: any[];
  clientes: any;
  dia: any;
  datos: any;
  colaboradores: any;
  clientesSettings: IDropdownSettings = {};
  colaboradoresSettings: IDropdownSettings = {};
  colaboradoresSettings2: IDropdownSettings = {};
  paises: any[];
  estados: any[];
  estatusOperaciones: any[];
  estatusPagos: any[];
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
  isSelected: boolean;
  tienePrecio: boolean;
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
    this.comboEstatusOperaciones();
    this.comboEstatusPagos();
    this.route.queryParams.subscribe(params => {
      this.idServicio = params['idColaborador'];
    });

    if (this.idServicio) {
      this.llenarCampos(this.idServicio);
      this.isSelected = true;
    } else {
      this.isSelected = false;
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

    this.colaboradoresSettings2 = {
      singleSelection: true,
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
    this.servicio.pagoColaborador = 0;
    this.servicio.estatus = "Abierta";
    this.servicio.estatusOperativo = 1;
    this.servicio.semanaAlta = 0;
    this.servicio.estatusPago = 1;
    this.isSelected = false;
    this.servicio.fechaTerminacion = null;
    this.tienePrecio = false;
  }

  public llenarCampos(idServicio) {
    this.http.get<any>('/api/servicio/datos?idServicio=' + idServicio, this.httpOptions).subscribe(data => {
      this.datos = data.data;
      this.servicio = this.datos[0];
      this.onFechaNacimiento(); 
      this.onFechaChange(this.servicio.fechaTerminacion);
      this.comboCiudades(this.servicio.idEstadoNacimiento);
      this.onCiudadNacimiento(this.servicio.idCiudadNacimiento);
      this.onCodigoPostal(this.servicio.codigoPostal);
      this.servicio.peso = Math.floor(this.servicio.peso);
      this.servicio.estatura = Math.floor(this.servicio.estatura);

      if (this.servicio.precioServicio) {
        this.tienePrecio = true;
        console.log("true");
      } else {
        this.tienePrecio = false;
        console.log("false");
      }

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
      this.selectedColaboradorItems2Tbl = data.data;
      this.colaboradorSource = new MatTableDataSource(this.selectedColaboradorItems2Tbl);
      console.log(this.selectedColaboradorItems);
    });
  }

  public comboClientes() {
    this.http.get<any>('/api/catalogo/clientes', this.httpOptions).subscribe(data => {
      this.clientes = data.data;
    });
  }

  public onCopiar() {
    this.http.get<any>('/api/servicio/lista2', this.httpOptions).subscribe(data => {
      this.servicios = data.data;
      alert("Se copiará servicio #"+this.servicio.idServicio+" al servicio #"+(Number(this.servicios[this.servicios.length-1].idServicio)+1));
      this.servicio.idServicio = null;
      this.servicio.cantidadPagada = 0;
      this.servicio.cantidadPorPagar = this.servicio.precioServicio;
      this.servicio.estatusPago = 1;
      this.servicio.fechaTerminacion = null;
      this.servicio.semanaAlta = null;
      this.isSelected = null;
      this.tienePrecio = false;
    });
    // console.log(Number(this.servicios[this.servicios.length-1].idServicio)+1);
  }

  counter(i: number) {
    return new Array(i);
}

  public comboClientesById(idCliente) {
    this.http.get<any>('/api/catalogo/clientesById?idCliente=' + idCliente, this.httpOptions).subscribe(data => {
      this.servicio.nombre = data.data[0].nombre;
      this.servicio.a_paterno = data.data[0].a_paterno;
      this.servicio.a_materno = data.data[0].a_materno;
    });
  }

  public comboClientesByIdDir(idCliente) {
    this.http.get<any>('/api/catalogo/clientesById?idCliente=' + idCliente, this.httpOptions).subscribe(data => {
      this.servicio.calle1 = data.data[0].calle1;
      this.servicio.calle2 = data.data[0].calle2;
      this.servicio.noExt = data.data[0].noExt;
      this.servicio.noInt = data.data[0].noInt;
      this.servicio.codigoPostal = data.data[0].codigoPostal;
      this.servicio.referenciaDireccion = data.data[0].referencia;
      this.onCodigoPostal(this.servicio.codigoPostal);
      this.servicio.idColonia = data.data[0].idColonia;
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

  public comboEstatusOperaciones() {
    this.http.get<any>('/api/catalogo/estatusOperacion', this.httpOptions).subscribe(data => {
      
      this.estatusOperaciones = data.data;
      console.log(this.estatusOperaciones);
    });
  }

  public comboEstatusPagos() {
    this.http.get<any>('/api/catalogo/estatusPago', this.httpOptions).subscribe(data => {
      this.estatusPagos = data.data;
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
  
  onEstatusOperacion(value: any) {
    this.servicio.estatusOperativo = value;
    console.log(value);
  }

  onEstatusPago(value: any) {
    this.servicio.estatusPago = value;
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

  onFechaChange(fecha){
var IsDate = new Date(fecha);
   this.dia = IsDate.getDay();
   switch (IsDate.getDay()) {
     case 0:
       this.dia="Lunes"
       break;
       case 1:
        this.dia="Martes"
        break;
        case 2:
       this.dia="Miércoles"
       break;
       case 3:
       this.dia="Jueves"
       break;
       case 4:
       this.dia="Viernes"
       break;
       case 5:
       this.dia="Sábado"
       break;
       case 6:
       this.dia="Domingo"
       break;
     default:
       break;
   }
   
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
    if (this.servicio.precioServicio != null) {
      if (this.servicio.precioServicio>this.servicio.cantidadPagada && this.servicio.cantidadPagada != null && this.servicio.cantidadPagada != 0) {
        this.servicio.estatusPago = 2;
        this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
        console.log(this.servicio.cantidadPorPagar);
      }
      if (this.servicio.precioServicio==this.servicio.cantidadPagada) {
        this.servicio.estatusPago = 3;
        this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
        console.log(this.servicio.cantidadPorPagar);
      }
      if (this.servicio.precioServicio<this.servicio.cantidadPagada) {
        this.servicio.estatusPago = 4;
        this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
        console.log(this.servicio.cantidadPorPagar);
      }
      if(this.servicio.cantidadPagada == 0 || this.servicio.cantidadPagada == null) {
        this.servicio.estatusPago = 1;
        this.servicio.cantidadPorPagar = this.servicio.precioServicio;
      }
      // if (this.servicio.cantidadPagada != null) {
      //   if (this.servicio.precioServicio >= this.servicio.cantidadPagada) {
      //     this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
      //   } else {
      //     this.servicio.cantidadPorPagar = null;
      //     alert("La precio del servicio debe de ser mayor o igual que la cantidad pagada");
      //   }
      // } else {
      //   this.servicio.cantidadPagada = 0;
      //   if (this.servicio.precioServicio >= this.servicio.cantidadPagada) {
      //     this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
      //   } else {
      //     this.servicio.cantidadPorPagar = null;
      //     alert("La precio del servicio debe de ser mayor o igual que la cantidad pagada");
      //   }
      // }



      // if (this.servicio.precioServicio >= this.servicio.cantidadPagada) {
      //   this.servicio.cantidadPorPagar = this.servicio.precioServicio - this.servicio.cantidadPagada;
      // } else {
      //   this.servicio.cantidadPorPagar = null;
      //   alert("La precio del servicio debe de ser mayor o igual que la cantidad pagada");
      // }
    }
  }

  onEstatusSelect(item: any) {
    if (this.selectedColaboradorItems.find(x => x.idColaborador === item.idColaborador) === undefined) {
      this.selectedColaboradorItems.push(item);
    }
    if (Object.keys(this.selectedColaboradorItems).length >= this.servicio.colabReq) {
      this.servicio.estatus = "Asignada";
      this.servicio.estatusOperativo = 2;
    }
    console.log(this.selectedColaboradorItems);
  }

  onEstatusDeSelect(item: any) {
    this.selectedColaboradorItems.forEach((element, index) => {
      if (element.idColaborador === item.idColaborador) this.selectedColaboradorItems.splice(index, 1);
    });
    this.servicio.estatus = "Abierta";
    this.servicio.estatusOperativo = 1;
    this.servicio.colaboradores = null;
  }

  onCopiarDir() {
    if (this.servicio.cliente) {
      this.comboClientesByIdDir(this.servicio.cliente);
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

  onGrabarServicio(ngForm: NgForm) {
    if (this.servicio.idServicio) {
      this.servicio.idPais = 1;
      // this.servicio.colaboradores = this.selectedColaboradorItems;
      this.servicio.colaboradores = this.selectedColaboradorItems2Tbl;
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
      // this.servicio.colaboradores = this.selectedColaboradorItems;
      this.servicio.colaboradores = this.selectedColaboradorItems2Tbl;
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

  onNumColab() {
    if (Object.keys(this.selectedColaboradorItems2Tbl).length >= this.servicio.colabReq) {
      this.servicio.estatus = "Asignada";
      this.servicio.estatusOperativo = 2;
    } else {
      if (Object.keys(this.selectedColaboradorItems2Tbl).length < this.servicio.colabReq) {
        this.servicio.estatus = "Abierta";
        this.servicio.estatusOperativo = 1;
      }
    }
  }

  onEliminarColaborador(value: any) {
    // this.selectedColaboradorItems2Tbl.forEach((element, index) => {
    //   if (element.idColaborador === value.idColaborador) this.selectedColaboradorItems2Tbl.splice(index, 1);
    // });
    this.selectedColaboradorItems2Tbl.splice(value, 1);
    this.colaboradorSource = new MatTableDataSource(this.selectedColaboradorItems2Tbl);
    if (Object.keys(this.selectedColaboradorItems2Tbl).length >= this.servicio.colabReq) {
      this.servicio.estatus = "Asignada";
      this.servicio.estatusOperativo = 2;
    } else {
      if (Object.keys(this.selectedColaboradorItems2Tbl).length < this.servicio.colabReq) {
        this.servicio.estatus = "Abierta";
        this.servicio.estatusOperativo = 1;
      }
    }
    return;
  }

  agregarColaborador() {
    // this.selectedColaboradorItems2Ind.push(this.selectedColaboradorItems2);

    this.selectedColaboradorItems2Ind = Object.keys(this.selectedColaboradorItems2).map(index => {
      let person = this.selectedColaboradorItems2[index];
      return person;
  });

  this.selectedColaboradorItems2Ind[0]["sueldo"] = this.servicio.pagoColaborador;
  this.selectedColaboradorItems2Ind[0]["observacion"] = this.observacionColaborador;
  // this.selectedColaboradorItems2Tbl=this.selectedColaboradorItems2Ind;

  if (this.selectedColaboradorItems2Tbl.length>0) {
    this.selectedColaboradorItems2Tbl.push(this.selectedColaboradorItems2Ind[0]);
  } else {
    if (this.selectedColaboradorItems2Tbl.length==0 || this.selectedColaboradorItems2Tbl.length==undefined) {
      this.selectedColaboradorItems2Tbl=this.selectedColaboradorItems2Ind;
    }
  }

  this.colaboradorSource = new MatTableDataSource(this.selectedColaboradorItems2Tbl);
  if (Object.keys(this.selectedColaboradorItems2Tbl).length >= this.servicio.colabReq) {
    this.servicio.estatus = "Asignada";
    this.servicio.estatusOperativo = 2;
  } else {
    if (Object.keys(this.selectedColaboradorItems2Tbl).length < this.servicio.colabReq) {
      this.servicio.estatus = "Abierta";
      this.servicio.estatusOperativo = 1;
    }
  }
  this.servicio.pagoColaborador = 0;
  this.selectedColaboradorItems2 = null;
  this.observacionColaborador = null;
  console.log(this.selectedColaboradorItems2Tbl);
  }

  registrarPago() {
    const url = '/pagopaciente?idServicio=' + this.idServicio;
    this.router.navigateByUrl(url);
  } 

  onSelectedCliente(item: any) {
    this.comboClientesById(item.idCliente);
    this.servicio.cliente = item.idCliente;
  }

  onDeSelectedCliente(item: any) {
    this.servicio.cliente = null;
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