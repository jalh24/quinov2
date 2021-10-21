import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colaborador } from '../_model/colaborador';
import { Pago } from '../_model/pago';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../_model/experiencia';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Estatus } from '../_model/estatus';
import { FormControl } from '@angular/forms';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradorComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  show = false;
  autohide = true;
  selected = new FormControl(0);
  ESTUDIO_DATA: Estudio[] = [];
  estudioSource = new MatTableDataSource<Estudio>(this.ESTUDIO_DATA);

  estudioColumns: string[] = ['institucion', 'comentarios', 'inicio', 'fin', 'estatus', 'deleteColaborador'];
  @ViewChild('estudiosTable', { static: true }) estudiosTable: MatTable<any>;

  PAGO_DATA: Pago[] = [];
  pagoSource = new MatTableDataSource<Pago>(this.PAGO_DATA);

  pagoColumns: string[] = ['nombre', 'banco', 'tipoCuenta', 'numero', 'deletePago'];
  @ViewChild('pagosTable', { static: true }) pagosTable: MatTable<any>;

  EXPERIENCIA_DATA: Experiencia[] = [];
  experienciaSource = new MatTableDataSource<Experiencia>(this.EXPERIENCIA_DATA);

  experienciaColumns: string[] = ['institucion', 'comentario', 'fechaInicio', 'fechaFin', 'telefono', 'deleteExperiencia'];
  @ViewChild('experiencasTable', { static: true }) experiencasTable: MatTable<any>;

  textBoxDisabledCed = true;
  textBoxDisabledSeg = true;
  textBoxDisabledOtraEsp = true;
  textBoxDisabledOtraZon = true;
  textBoxDisabledOtraHab = true;
  textBoxDisabledVis = true;
  radioDisabledHijosViven = true;
  textBoxDisabledPas = true;
  textBoxDisabledDateofWorkL = true;
  textBoxDisabledDateofWorkM = true;
  textBoxDisabledDateofWorkMi = true;
  textBoxDisabledDateofWorkJ = true;
  textBoxDisabledDateofWorkV = true;
  textBoxDisabledDateofWorkS = true;
  textBoxDisabledDateofWorkD = true;
  textBoxDisabledDateofWorkT = true;

  selectedPais = 1;
  selectedEstado = null;
  selectedCodigoPostal = null;

  tabVisible: any = 1;
  @ViewChild('myForm') ngForm: NgForm;

  dtTriggerEstudio = new Subject();
  dtTriggerPago = new Subject();
  dtTriggerExperiencia = new Subject();

  idPago: number;
  idEstudio: number;
  idExperiencia: number;
  public colaborador: Colaborador;
  diasLaborales: any = {
    todosDias: false,
    todosDiasTurno: null,
    // todosDiasDesde: null,
    // todosDiasHasta: null,
    lunes: false,
    lunesTurno: null,
    // lunesDesde: null,
    // lunesHasta: null,
    martes: false,
    martesTurno: null,
    // martesDesde: null,
    // martesHasta: null,
    miercoles: false,
    miercolesTurno: null,
    // miercolesDesde: null,
    // miercolesHasta: null,
    jueves: false,
    juevesTurno: null,
    // juevesDesde: null,
    // juevesHasta: null,
    viernes: false,
    viernesTurno: null,
    // viernesDesde: null,
    // viernesHasta: null,
    sabado: false,
    sabadoTurno: null,
    // sabadoDesde: null,
    // sabadoHasta: null,
    domingo: false,
    domingoTurno: null
    // domingoDesde: null,
    // domingoHasta: null
  };
  sexos: any[];
  colonias: any[];
  ciudades: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  estados: any[];
  paises: any[];
  calificaciones: any[];
  tiposColaboradores: any[];
  teces: any[];
  tipoVisas: any[];
  bancos: any[];
  estadosCiviles: any[];
  tiposTelefono: any[];
  permanencias: any[];
  zonasLaborales: any[];
  especialidades: any[];
  especialidadesSelected: any[];
  habilidades: any[];
  habilidadesSelected: any[];
  zonasSelected: any[];
  pagos: Pago[];
  pago: Pago;
  estudios: Estudio[];
  estudio: Estudio;
  experiencias: Experiencia[];
  experiencia: Experiencia;
  dtOptionsPago: any = {};
  dtOptionsEstudio: any = {};
  dtOptionsExperiencia: any = {};
  estatusEstudios: Estatus[];
  estatusSelected: string;
  gradoEstudios: any[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTriggerEstudio.next();
      this.dtTriggerPago.next();
      this.dtOptionsExperiencia.next();
      //console.log(this.dtTriggerEstudio);
    });
  }

  constructor(
    private http: HttpClient,
    private toastService: NgbToastService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listaEstatus();
    this.comboEstados();
    this.comboPaises();
    this.comboCalificaciones();
    this.comboGradoEstudios();
    this.comboTiposColaboradores();
    this.comboTeces();
    this.comboTipoVisas();
    this.comboBancos();
    this.comboSexos();
    this.comboEstadosCiviles();
    this.comboTiposTelefono();
    this.comboPermanencias();
    this.comboZonasLaborales();
    this.comboEspecialidades();
    this.comboHabilidades();
    this.inicializaObjetos();


    this.dtOptionsPago = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        console.log(data);
        const self = this;

        $('td', row).on('click', () => {
          if (self.pago !== null) {
            if (self.pago.idPago === data.idPago) {
              this.pago = null;
            } else {
              self.pago = data;
            }
          } else {
            self.colaborador = data;
          }
        });

        return row;
      }

    };

    this.dtOptionsEstudio = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        console.log(data);
        const self = this;

        $('td', row).on('click', () => {
          if (self.estudio !== null) {
            if (self.estudio.idEstudio === data.idEstudio) {
              this.estudio = null;
            } else {
              self.estudio = data;
            }
          } else {
            self.colaborador = data;
          }
        });

        return row;
      }

    };
    this.dtOptionsExperiencia = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        console.log(data);
        const self = this;

        $('td', row).on('click', () => {
          if (self.experiencia !== null) {
            if (self.experiencia.idExperiencia === data.idExperiencia) {
              this.experiencia = null;
            } else {
              self.experiencia = data;
            }
          } else {
            self.colaborador = data;
          }
        });

        return row;
      }

    };
  }

  inicializaObjetos() {
    this.colaborador = new Colaborador();
    this.colaborador.idColaborador = null;
    this.colaborador.nombre = null;
    this.colaborador.a_paterno = null;
    this.colaborador.a_materno = null;
    this.colaborador.correoElectronico = null;
    this.colaborador.hijos = false;
    this.colaborador.hijosViven = false;
    this.colaborador.foto = null;
    this.colaborador.fotoNombre = null;
    this.colaborador.rfc = null;
    this.colaborador.nss = null;
    this.colaborador.fecha_nacimiento = null;
    this.colaborador.idSexo = null;
    this.colaborador.peso = null;
    this.colaborador.estatura = null;
    this.colaborador.zonas = [];
    this.colaborador.idEstadoCivil = null;
    this.colaborador.idTez = null;
    this.colaborador.sgmm = null;
    this.colaborador.atiendeCovid = false;
    this.colaborador.antecedentePenales = false;
    this.colaborador.autoPropio = false;
    this.colaborador.licenciaManejar = false;
    this.colaborador.dispuestoViajar = false;
    this.colaborador.visa = false;
    this.colaborador.visaNumero = null;
    this.colaborador.tipoVisa = null;
    this.colaborador.expiracionVisa = null;
    this.colaborador.visaImagen = null;
    this.colaborador.visaNombre = null;
    this.colaborador.pasaporte = false;
    this.colaborador.pasaporteNumero = null;
    this.colaborador.expiracionPasaporte = null;
    this.colaborador.pasaporteImagen = null;
    this.colaborador.hacerComer = false;
    this.colaborador.limpiarUtensiliosCocina = false;
    this.colaborador.limpiarDormitorio = false;
    this.colaborador.limpiarBano = false;
    this.colaborador.ayudaPaciente = false;
    this.colaborador.pasaporteNombre = null;
    this.colaborador.ine1 = null;
    this.colaborador.ine1Nombre = null;
    this.colaborador.ine2 = null;
    this.colaborador.ine2Nombre = null;
    this.colaborador.idEstatus = null;
    this.colaborador.calle1 = null;
    this.colaborador.calle2 = null;
    this.colaborador.codigoPostal = null;
    this.colaborador.idPaisNacimiento = null;
    this.colaborador.idEstadoNacimiento = null;
    this.colaborador.idCiudadNacimiento = null;
    this.colaborador.comprobanteDomicilio = null;
    this.colaborador.comprobanteNombre = null;
    this.colaborador.idPais = null;
    this.colaborador.idEstado = null;
    this.colaborador.idCiudad = null;
    this.colaborador.idColonia = null;
    this.colaborador.noExt = null;
    this.colaborador.noInt = null;
    this.colaborador.horario = null;
    this.colaborador.estudios = [];
    this.colaborador.experiencias = [];
    this.colaborador.cuentasColaborador = [];
    this.colaborador.contactosColaborador = [];
    this.colaborador.especialidades = [];
    this.colaborador.habilidades = [];
    this.colaborador.telefono = null;
    this.colaborador.idTipoTelefono = null;
    this.colaborador.telefono2 = null;
    this.colaborador.idTipoTelefono2 = null;
    this.colaborador.idCalificacion = null;
    this.colaborador.idTipoColaborador = null;
    this.colaborador.observaciones = null;
    this.colaborador.idPermanencia = null;
    this.colaborador.idGradoEstudio = null;

    this.idEstudio = 0;
    this.idPago = 0;
    this.idExperiencia = 0;

    this.pagos = [];
    this.pago = {
      idPago: null,
      nombre: null,
      banco: null,
      tipoCuenta: null,
      numero: null
    };
    this.estudios = [];
    this.estudio = {
      idEstudio: null,
      idColaborador: null,
      institucion: null,
      fechaInicio: null,
      fechaFin: null,
      estatus: null,
      cedula: null,
      cedulaNombre: null,
      comentarios: null
    };
    this.experiencias = [];
    this.experiencia = {
      idExperiencia: null,
      empresa: null,
      comentario: null,
      fechaInicio: null,
      fechaFin: null,
      referencia: null,
      telefono: null
    };
    this.especialidadesSelected = [];
    this.habilidadesSelected = [];
    this.zonasSelected = [];
    this.experienciaSource.data = [];
    this.pagoSource.data = [];
    this.estudioSource.data = [];
  }

  enableSeguros() {
    this.textBoxDisabledSeg = false;
  }
  disableSeguros() {
    this.textBoxDisabledSeg = true;
  }
  enableOtraEsp() {
    this.textBoxDisabledOtraEsp = !this.textBoxDisabledOtraEsp;
  }
  enableOtraZon() {
    this.textBoxDisabledOtraZon = !this.textBoxDisabledOtraZon;
  }
  enableOtraHab() {
    this.textBoxDisabledOtraHab = !this.textBoxDisabledOtraHab;
  }

  enableCed(event) {
    this.textBoxDisabledCed = false;
    console.log(event);
    this.estudio.estatus = this.estatusEstudios.find(estu => { console.log(estu); return estu.nombre == event });
    console.log(this.estudio);
    //this.estudio.estatus = event;
  }

  disableCed(event) {
    this.textBoxDisabledCed = true;
    this.estudio.estatus = this.estatusEstudios.find(estu => { return estu.nombre === event });
    console.log(this.estudio);
    //this.estudio.estatus = event;
  }

  enableHijosViven() {
    this.radioDisabledHijosViven = false;
  }
  disableHijosViven() {
    this.radioDisabledHijosViven = true;
  }

  enableTextBoxVis() {
    this.textBoxDisabledVis = false;
  }
  disableTextBoxVis() {
    this.textBoxDisabledVis = true;
  }
  enableTextBoxPas() {
    this.textBoxDisabledPas = false;
  }
  disableTextBoxPas() {
    this.textBoxDisabledPas = true;
  }
  disableTextBoxDateofWorkL() {
    this.textBoxDisabledDateofWorkL = !this.textBoxDisabledDateofWorkL;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkL == true){
      this.diasLaborales.lunesTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkM() {
    this.textBoxDisabledDateofWorkM = !this.textBoxDisabledDateofWorkM;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkM == true){
      this.diasLaborales.martesTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkMi() {
    this.textBoxDisabledDateofWorkMi = !this.textBoxDisabledDateofWorkMi;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkMi == true){
      this.diasLaborales.miercolesTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkJ() {
    this.textBoxDisabledDateofWorkJ = !this.textBoxDisabledDateofWorkJ;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkJ == true){
      this.diasLaborales.juevesTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkV() {
    this.textBoxDisabledDateofWorkV = !this.textBoxDisabledDateofWorkV;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkV == true){
      this.diasLaborales.viernesTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkS() {
    this.textBoxDisabledDateofWorkS = !this.textBoxDisabledDateofWorkS;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkS == true){
      this.diasLaborales.sabadoTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkD() {
    this.textBoxDisabledDateofWorkD = !this.textBoxDisabledDateofWorkD;
    this.textBoxDisabledDateofWorkT = true;
    this.diasLaborales.todosDias = false;
    this.diasLaborales.todosDiasTurno = null;
    if(this.textBoxDisabledDateofWorkD == true){
      this.diasLaborales.domingoTurno = null;
    }
    // this.diasLaborales.todosDiasDesde = null;
    // this.diasLaborales.todosDiasHasta = null;
  }
  disableTextBoxDateofWorkT() {
    this.textBoxDisabledDateofWorkT = !this.textBoxDisabledDateofWorkT;
    this.textBoxDisabledDateofWorkL = true;
    this.textBoxDisabledDateofWorkM = true;
    this.textBoxDisabledDateofWorkMi = true;
    this.textBoxDisabledDateofWorkJ = true;
    this.textBoxDisabledDateofWorkV = true;
    this.textBoxDisabledDateofWorkS = true;
    this.textBoxDisabledDateofWorkD = true;
    this.diasLaborales.todosDias = !this.diasLaborales.todosDias;
    this.diasLaborales.lunes = false;
    this.diasLaborales.lunesTurno = null;
    // this.diasLaborales.lunesDesde = null;
    // this.diasLaborales.lunesHasta = null;
    this.diasLaborales.martes = false;
    this.diasLaborales.martesTurno = null;
    // this.diasLaborales.martesDesde = null;
    // this.diasLaborales.martesHasta = null;
    this.diasLaborales.miercoles = false;
    this.diasLaborales.miercolesTurno = null;
    // this.diasLaborales.miercolesDesde = null;
    // this.diasLaborales.miercolesHasta = null;
    this.diasLaborales.jueves = false;
    this.diasLaborales.juevesTurno = null;
    // this.diasLaborales.juevesDesde = null;
    // this.diasLaborales.juevesHasta = null;
    this.diasLaborales.viernes = false;
    this.diasLaborales.viernesTurno = null;
    // this.diasLaborales.viernesDesde = null;
    // this.diasLaborales.viernesHasta = null;
    this.diasLaborales.sabado = false;
    this.diasLaborales.sabadoTurno = null;
    // this.diasLaborales.sabadoDesde = null;
    // this.diasLaborales.sabadoHasta = null;
    this.diasLaborales.domingo = false;
    this.diasLaborales.domingoTurno = null;
    // this.diasLaborales.domingoDesde = null;
    // this.diasLaborales.domingoHasta = null;
  }


  ngAfterViewInit(): void {
    this.dtTriggerEstudio.next();
  }


  public mostrarTab(tab: any) {
    this.tabVisible = tab;
    console.log(tab);
  }

  public guardarColaborador(ngForm: NgForm) {
    console.log(this.diasLaborales);
    this.colaborador.horario = this.diasLaborales;
    this.colaborador.idPais = 1;
    this.colaborador.idPaisNacimiento = 1;
    this.colaborador.idEstatus = 1;
    this.colaborador.zonas = this.zonasSelected;
    this.colaborador.cuentasColaborador = this.pagoSource.data;
    this.colaborador.estudios = this.estudioSource.data;
    this.colaborador.experiencias = this.experienciaSource.data;
    this.colaborador.especialidades = this.especialidadesSelected;
    this.colaborador.habilidades = this.habilidadesSelected;
    console.log(this.colaborador);
    if (ngForm.valid) {
      this.http.post<any>('/api/colaborador/create', this.colaborador).subscribe(data => {
        this.showSuccess(NgbToastType.Success, "Se creo el colaborador exitosamente");
        window.history.back();
        alert("Se creo el colaborador exitosamente");
        
      });
      this.inicializaObjetos();
    } else {
      this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
    }

  }

  zonasCheck(zona: any) {
    if (this.zonasSelected.length == 0) {
      this.zonasSelected.push(zona)
    } else {
      if (this.zonasSelected.find(obj => {
        return obj.idZonaLaboral == zona.idZonaLaboral
      })) {

        this.zonasSelected = this.zonasSelected.filter((value, key) => {
          return value.idZonaLaboral != zona.idZonaLaboral;
        });

      } else {
        this.zonasSelected.push(zona);
      }
    }
    console.log(this.zonasSelected);
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

  public ineFrontal(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.ine1 = reader.result;
      me.colaborador.ine1Nombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public ineReverso(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.ine2 = reader.result;
      me.colaborador.ine2Nombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public cargaFotoPersonal(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    console.log(extension);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.foto = reader.result;
      me.colaborador.fotoNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public comprobanteDomicilio(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.comprobanteDomicilio = reader.result;
      me.colaborador.comprobanteNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public onVisa(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.visaImagen = reader.result;
      me.colaborador.visaNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public onPasaporte(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.pasaporteImagen = reader.result;
      me.colaborador.pasaporteNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }


  public onCedulaFileSelected(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.estudio.cedula = reader.result;
      me.estudio.cedulaNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }


  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  agregarEstudio() {
    if (this.estudio.idEstudio == null) {
      if (this.estudios.length == 0) {
        this.idEstudio = this.estudioSource.data.length + 1;
      } else {
        this.idEstudio++;
      }
      this.estudio.idEstudio = this.idEstudio;
      console.log(this.estudio);
      this.ESTUDIO_DATA.push(this.estudio);
      this.estudioSource = new MatTableDataSource(this.ESTUDIO_DATA);
    } else {
      this.estudio.estatus = this.estatusEstudios.find(estu => { return estu.nombre === this.estatusSelected });;
      this.estudios.splice(this.estudio.idEstudio, 1, this.estudio);
    }

    this.estudio = {
      idEstudio: null,
      idColaborador: null,
      institucion: null,
      fechaInicio: null,
      fechaFin: null,
      estatus: null,
      cedula: null,
      cedulaNombre: null,
      comentarios: null
    };
    this.estatusSelected = "";
    this.changeDetectorRefs.detectChanges();
    this.estudiosTable.renderRows();
  }

  borraEstudio(estudioTmp) {
    this.ESTUDIO_DATA = this.ESTUDIO_DATA.filter((value, key) => {
      return value.idEstudio != estudioTmp.idEstudio;
    });
    this.estudioSource.data = this.estudioSource.data.filter((value, key) => {
      return value.idEstudio != estudioTmp.idEstudio;
    });
  }

  onTipoCuenta(event) {
    this.pago.tipoCuenta = event;
    console.log(event);
  }

  onBanco(event) {
    this.pago.banco = this.bancos.find(banco => { return banco.idBanco == event });
    console.log(this.pago);
  }

  agregarPago() {
    if (this.pago.idPago == null) {
      if (this.pagoSource.data.length == 0) {
        this.idPago = this.pagoSource.data.length + 1;
      } else {
        this.idPago++;
      }
      this.pago.idPago = this.idPago;
    }
    this.PAGO_DATA.push(this.pago);
    this.pagoSource = new MatTableDataSource(this.PAGO_DATA);
console.log(this.pagoSource);
    this.pago = {
      idPago: null,
      nombre: null,
      banco: null,
      tipoCuenta: null,
      numero: null,
    };

  }

  especialidadCheck(especialidad: any) {
    if (this.especialidadesSelected.length == 0) {
      this.especialidadesSelected.push(especialidad)
    } else {
      if (this.especialidadesSelected.find(obj => {
        return obj.idEspecialidad == especialidad.idEspecialidad
      })) {

        this.especialidadesSelected = this.especialidadesSelected.filter((value, key) => {
          return value.idEspecialidad != especialidad.idEspecialidad;
        });

      } else {
        this.especialidadesSelected.push(especialidad);
      }
    }
  }

  habilidadCheck(habilidad: any) {
    if (this.habilidadesSelected.length == 0) {
      this.habilidadesSelected.push(habilidad)
    } else {
      if (this.habilidadesSelected.find(obj => {
        return obj.idEspecialidad == habilidad.idHabilidad
      })) {

        this.habilidadesSelected = this.habilidadesSelected.filter((value, key) => {
          return value.idEspecialidad != habilidad.idHabilidad;
        });

      } else {
        this.habilidadesSelected.push(habilidad);
      }
    }
  }

  agregarExperiencia() {
    if (this.experiencia.idExperiencia == null) {
      if (this.experienciaSource.data.length == 0) {
        this.idExperiencia = this.experienciaSource.data.length + 1;
      } else {
        this.idExperiencia++;
      }
      this.experiencia.idExperiencia = this.idExperiencia;
    }
    this.EXPERIENCIA_DATA.push(this.experiencia);
    this.experienciaSource = new MatTableDataSource(this.EXPERIENCIA_DATA);

    this.experiencia = {
      idExperiencia: null,
      empresa: null,
      comentario: null,
      fechaInicio: null,
      fechaFin: null,
      referencia: null,
      telefono: null
    };


  }

  editaEstudio(estudioTmp: any) {
    this.estudio = estudioTmp;
  }
  editaPago(pagoTmp: any) {
    this.pago = pagoTmp;
  }
  editaExperiencia(experienciaTmp: any) {
    this.experiencia = experienciaTmp;
  }

  borraPago(pagoTmp) {
    this.PAGO_DATA = this.PAGO_DATA.filter((value, key) => {
      return value.idPago != pagoTmp.idPago;
    });
    this.pagoSource.data = this.pagoSource.data.filter((value, key) => {
      return value.idPago != pagoTmp.idPago;
    });
  }

  borraExperiencia(experienciaTmp) {
    this.EXPERIENCIA_DATA = this.EXPERIENCIA_DATA.filter((value, key) => {
      return value.idExperiencia != experienciaTmp.idExperiencia;
    });
    this.experienciaSource.data = this.experienciaSource.data.filter((value, key) => {
      return value.idExperiencia != experienciaTmp.idExperiencia;
    });

  }

  pagAtras(index) {
    if (this.selected.value > 0) {
      this.selected.setValue(this.selected.value - index);
    }

  }
  pagDelante(index) {
    if (this.selected.value < 7) {
      this.selected.setValue(this.selected.value + index);
    }

  }

  limpiarEstudio() {
    this.estudio = {
      idEstudio: null,
      idColaborador: null,
      institucion: null,
      fechaInicio: null,
      fechaFin: null,
      estatus: null,
      cedula: null,
      cedulaNombre: null,
      comentarios: null
    };
  }
  limpiarPago() {
    this.pago = {
      idPago: null,
      nombre: null,
      banco: null,
      tipoCuenta: null,
      numero: null,
    };
  }
  limpiarExperiencia() {
    this.experiencia = {
      idExperiencia: null,
      empresa: null,
      comentario: null,
      fechaInicio: null,
      fechaFin: null,
      referencia: null,
      telefono: null
    };
  }

  public listaEstatus() {
    this.http.get<any>('/api/catalogo/estatus?tipo=ESTUDIO').subscribe(data => {
      this.estatusEstudios = data.data;
    });
  }

  public comboCalificaciones() {
    this.http.get<any>('/api/catalogo/calificaciones').subscribe(data => {
      this.calificaciones = data.data;
    });
  }

  public comboGradoEstudios() {
    this.http.get<any>('/api/catalogo/gradoEstudios').subscribe(data => {
      this.gradoEstudios = data.data;
    });
  }

  public comboTiposColaboradores() {
    this.http.get<any>('/api/catalogo/tiposColaboradores').subscribe(data => {
      this.tiposColaboradores = data.data;
    });
  }

  public comboTeces() {
    this.http.get<any>('/api/catalogo/teces').subscribe(data => {
      this.teces = data.data;
    });
  }

  public comboTipoVisas() {
    this.http.get<any>('/api/catalogo/tipoVisas').subscribe(data => {
      this.tipoVisas = data.data;
    });
  }

  public comboBancos() {
    this.http.get<any>('/api/catalogo/bancos').subscribe(data => {
      this.bancos = data.data;
    });
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

  public comboPermanencias() {
    this.http.get<any>('/api/catalogo/permanencias').subscribe(data => {
      this.permanencias = data.data;
    });
  }

  public comboZonasLaborales() {
    this.http.get<any>('/api/catalogo/zonasLaborales').subscribe(data => {
      this.zonasLaborales = data.data;
    });
  }

  public comboEspecialidades() {
    this.http.get<any>('/api/catalogo/especialidades').subscribe(data => {
      this.especialidades = data.data;
    });
  }

  public comboHabilidades() {
    this.http.get<any>('/api/catalogo/habilidades').subscribe(data => {
      this.habilidades = data.data;
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
    this.colaborador.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento).subscribe(data => {
      this.ciudades = data.data;
    });
  }

  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais).subscribe(data => {
      this.estados = data.data;
    });
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises').subscribe(data => {
      this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.colaborador.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal).subscribe(data => {
      this.colonias = data.data;
      this.colaborador.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.colaborador.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado).subscribe(data => {
          this.estadosDir = data.data;
        });
      });
    });
  }

  onColonia(value: any) {
    this.colaborador.idColonia = value;
  }

  onCiudad(value: any) {
    this.colaborador.idCiudad = value;
  }

  onEstado(value: any) {
    this.colaborador.idEstado = value;
  }

  onEstadoCivil(value: any) {
    this.colaborador.idEstadoCivil = value;
  }

  onTez(value: any) {
    this.colaborador.idTez = value;
  }

  onSexo(value: any) {
    this.colaborador.idSexo = value;
  }

  onCalificacion(value: any) {
    this.colaborador.idCalificacion = value;
  }

  onGradoEstudio(value: any) {
    this.colaborador.idGradoEstudio = value;
  }

  onTipoVisa(value: any) {
    this.colaborador.idTipoVisa = value;
  }

  onTipoColaborador(value: any) {
    this.colaborador.idTipoColaborador = value;
  }

  onCiudadNacimiento(value: any) {
    this.colaborador.idCiudadNacimiento = value;
  }

  onTipoTel1(value: any) {
    this.colaborador.idTipoTelefono = value;
  }

  onTipoTel2(value: any) {
    this.colaborador.idTipoTelefono2 = value;
  }

  onPermanencia(value: any) {
    this.colaborador.idPermanencia = value;
  }
}
