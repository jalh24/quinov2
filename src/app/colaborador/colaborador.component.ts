import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colaborador } from '../_model/colaborador';
import { Pago } from '../_model/pago';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Experiencia } from '../_model/experiencia';
import { NgbToastService, NgbToastType, NgbToast } from 'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Estatus } from '../_model/estatus';
import { FormControl } from '@angular/forms';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialServicio } from '../_model/historialservicio';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ColaboradorComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token')
    })
  };

  faSignOutAlt = faSignOutAlt;

  show = false;
  autohide = true;
  archivosDescargaVisa: boolean = false;
  archivosDescargaPasaporte: boolean = false;
  archivosDescargaIne1: boolean = false;
  archivosDescargaIne2: boolean = false;
  archivosDescargaFoto: boolean = false;
  archivosDescargaComprobanteDomicilio: boolean = false;
  selected = new FormControl(0);
  ESTUDIO_DATA: Estudio[] = [];
  estudioSource = new MatTableDataSource<Estudio>(this.ESTUDIO_DATA);

  estudioColumns: string[] = ['institucion', 'comentarios', 'inicio', 'fin', 'estatus', 'comprobanteEstudios', 'deleteColaborador'];
  @ViewChild('estudiosTable', { static: true }) estudiosTable: MatTable<any>;

  PAGO_DATA: Pago[] = [];
  pagoSource = new MatTableDataSource<Pago>(this.PAGO_DATA);

  pagoColumns: string[] = ['nombre', 'banco', 'tipoCuenta', 'numero', 'comprobantePago', 'deletePago'];
  @ViewChild('pagosTable', { static: true }) pagosTable: MatTable<any>;

  EXPERIENCIA_DATA: Experiencia[] = [];
  experienciaSource = new MatTableDataSource<Experiencia>(this.EXPERIENCIA_DATA);

  experienciaColumns: string[] = ['institucion', 'comentario', 'fechaInicio', 'fechaFin', 'telefono', 'deleteExperiencia'];
  @ViewChild('experiencasTable', { static: true }) experiencasTable: MatTable<any>;

  HISTORIALSERVICIO_DATA: HistorialServicio[] = [];
  historialServicioSource = new MatTableDataSource<HistorialServicio>(this.HISTORIALSERVICIO_DATA);

  historialServicioColumns: string[] = ['fecha', 'responsable', 'observaciones', 'deleteHistorialServicio'];
  @ViewChild('historialServicioTable', { static: true }) historialServicioTable: MatTable<any>;

  selectedHistorialServicioItems2Ind: any = [];
  selectedHistorialServicioItems2: any = [];
  selectedHistorialServicioItems2Tbl: any = [];

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
  indexNuevo: number = 1000000;
  idPago: number;
  idEstudio: number;
  idExperiencia: number;
  idHistorialServicio: number;
  visaImagenDatos: any;
  visaImagenNombre: any;
  comprobantePagoImagenDatos: any;
  comprobantePagoImagenNombre: any;
  cedulaImagenDatos: any;
  cedulaImagenNombre: any;
  pasaporteImagenDatos: any;
  pasaporteImagenNombre: any;
  ineImagenDatos1: any;
  ineImagenNombre1: any;
  ineImagenDatos2: any;
  ineImagenNombre2: any;
  fotoImagenDatos: any;
  fotoImagenNombre: any;
  comprobanteDomicilioImagenDatos: any;
  comprobanteDomicilioImagenNombre: any;
  public colaborador: Colaborador;
  diasLaborales: any = {
    todosDias: false,
    todosDiasTurno: null,
    lunes: false,
    lunesTurno: null,
    martes: false,
    martesTurno: null,
    miercoles: false,
    miercolesTurno: null,
    jueves: false,
    juevesTurno: null,
    viernes: false,
    viernesTurno: null,
    sabado: false,
    sabadoTurno: null,
    domingo: false,
    domingoTurno: null
  };
  sexos: any[];
  colonias: any[];
  ciudades: any[];
  ciudadesDir: any[];
  estadosDir: any[];
  estados: any[];
  paises: any[];
  calificaciones: any[];
  colaboradoresCurps: any[];
  curpExiste: boolean;
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
  tablaHistorialServicioVacia: boolean = false;
  historialServicios: HistorialServicio[];
  historialServicio: HistorialServicio;
  dtOptionsPago: any = {};
  dtOptionsEstudio: any = {};
  dtOptionsExperiencia: any = {};
  dtOptionsHistorialServicio: any = {};
  estatusEstudios: Estatus[];
  estatusSelected: string;
  gradoEstudios: any[];
  idColaborador: number;
  datos: any;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTriggerEstudio.next();
      this.dtTriggerPago.next();
      this.dtOptionsExperiencia.next();
      this.dtOptionsHistorialServicio.next();
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.colaboradoresCurp();

    this.route.queryParams.subscribe(params => {
      this.idColaborador = params['idColaborador'];
    });

    if (this.idColaborador) {
      this.llenarCampos(this.idColaborador);
    }

    this.dtOptionsPago = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
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

    this.dtOptionsHistorialServicio = {
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td', row).on('click', () => {
          if (self.historialServicio !== null) {
            if (self.historialServicio.idHistorialServicio === data.idHistorialServicio) {
              this.historialServicio = null;
            } else {
              self.historialServicio = data;
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
    this.colaborador.nombre = "";
    this.colaborador.a_paterno = null;
    this.colaborador.a_materno = null;
    this.colaborador.correoElectronico = null;
    this.colaborador.hijos = false;
    this.colaborador.hijosViven = false;
    this.colaborador.foto = null;
    this.colaborador.fotoNombre = null;
    this.colaborador.rfc = null;
    this.colaborador.curp = null;
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
    this.colaborador.referenciaDireccion = null;
    this.colaborador.idPermanencia = null;
    this.colaborador.idGradoEstudio = null;
    this.idEstudio = 0;
    this.idPago = 0;
    this.idExperiencia = 0;
    this.idHistorialServicio = 0;
    this.pagos = [];
    this.pago = {
      idPago: null,
      nombre: null,
      banco: null,
      tipoCuenta: null,
      numero: null,
      comprobantePago: null,
      comprobantePagoNombre: null
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
    this.historialServicios = [];
    this.historialServicio = {
      idHistorialServicio: null,
      fechaHistorialServicio: null,
      responsableHistorialServicio: null,
      observacionesHistorialServicio: null
    };
    this.especialidadesSelected = [];
    this.habilidadesSelected = [];
    this.zonasSelected = [];
    this.experienciaSource.data = [];
    this.historialServicioSource.data = [];
    this.pagoSource.data = [];
    this.estudioSource.data = [];
    this.curpExiste = false;
  }

  public llenarCampos(idColaborador) {
    this.http.post<any>('/api/colaborador/colaboradorId', { idColaborador: idColaborador }, this.httpOptions).subscribe(data => {
      console.log(data.data);
      this.datos = data.data;
      this.colaborador = this.datos[0];
      this.colaborador.habilidades = this.colaborador.habilidades !== undefined ? JSON.parse(this.colaborador.habilidades.toString()) : [];
      this.habilidadesSelected = this.colaborador.habilidades;
      this.colaborador.especialidades = this.colaborador.especialidades != undefined ? JSON.parse(this.colaborador.especialidades.toString()) : [];
      this.especialidadesSelected = this.colaborador.especialidades;
      this.colaborador.horario = this.colaborador.horario != undefined ? JSON.parse(this.colaborador.horario.toString()) : null;

      if (this.colaborador.horario != null) {
        this.diasLaborales = this.colaborador.horario;
      }

      this.comboCiudades(this.colaborador.idEstadoNacimiento);
      this.onCiudadNacimiento(this.colaborador.idCiudadNacimiento);
      this.onCodigoPostal(this.colaborador.codigoPostal);
      this.colaborador.peso = Math.floor(this.colaborador.peso);
      // this.colaborador.estatura = Math.floor(this.colaborador.estatura);
      this.datos.cuentas.forEach(element => {
        let pago = new Pago;
        pago.idPago = element.idCuenta;
        pago.nombre = element.beneficiario;
        pago.banco = {
          idBanco: element.idBanco,
          nombre: element.nombre,
        };
        pago.tipoCuenta = element.tipoCuenta;
        pago.numero = element.numero;
        pago.comprobantePago = element.comprobantePago;
        this.agregarPago(pago);
      });
      console.log(this.datos.cuentas);
      this.datos.estudios.forEach(element => {
        let estudio = new Estudio;
        estudio.cedula = element.cedula;
        estudio.comentarios = element.comentarios;
        estudio.estatus = {
          idEstatus: element.idEstatus,
          nombre: element.estatusNombre,
          tipo: "ESTUDIO",
        };
        estudio.fechaFin = element.fechaFin;
        estudio.fechaInicio = element.fechaInicio;
        estudio.idColaborador = idColaborador;
        estudio.idEstudio = element.idEstudio;
        estudio.institucion = element.institucion;
        if (this.estudio.cedula) {
          estudio.cedulaNombre = "cedula." + estudio.cedula.substring(estudio.cedula.indexOf("/") + 1, estudio.cedula.indexOf(";"));
        }
        this.agregarEstudio(estudio);
      });
      this.datos.experiencia.forEach(element => {
        let experiencia = new Experiencia;
        experiencia = element;
        this.agregarExperiencia(experiencia);
      });
      // this.datos.historialServicio.forEach(element => {
      //   let historialServicio = new HistorialServicio;
      //   historialServicio.fechaHistorialServicio = element.fecha;
      //   historialServicio.responsableHistorialServicio = element.responsable;
      //   historialServicio.observacionesHistorialServicio = element.observaciones;
      //   this.agregarHistorialServicio(historialServicio);
      // });
      if (this.datos[0].visaImagen != null) {
        this.textBoxDisabledVis = false;
        this.archivosDescargaVisa = true;
        this.visaImagenDatos = this.datos[0].visaImagen;
        this.visaImagenNombre = this.datos[0].visaNombre;
      }
      if (this.datos[0].pasaporteImagen != null) {
        this.textBoxDisabledPas = false;
        this.archivosDescargaPasaporte = true;
        this.pasaporteImagenDatos = this.datos[0].pasaporteImagen;
        this.pasaporteImagenNombre = this.datos[0].pasaporteNombre;
      }
      if (this.datos[0].ine1 != null) {
        this.archivosDescargaIne1 = true;
        this.ineImagenDatos1 = this.datos[0].ine1;
        this.ineImagenNombre1 = this.datos[0].ine1Nombre;
      }
      if (this.datos[0].ine2 != null) {
        this.archivosDescargaIne2 = true;
        this.ineImagenDatos2 = this.datos[0].ine2;
        this.ineImagenNombre2 = this.datos[0].ine2Nombre;
      }
      if (this.datos[0].foto != null) {
        this.archivosDescargaFoto = true;
        this.fotoImagenDatos = this.datos[0].foto;
        this.fotoImagenNombre = this.datos[0].fotoNombre;
      }
      if (this.datos[0].comprobanteDomicilio != null) {
        this.archivosDescargaComprobanteDomicilio = true;
        this.comprobanteDomicilioImagenDatos = this.datos[0].comprobanteDomicilio;
        this.comprobanteDomicilioImagenNombre = this.datos[0].comprobanteNombre;
      }
      this.http.post<any>('/api/colaborador/zonasLaborales', { idColaborador: idColaborador }, this.httpOptions).subscribe(data => {
        this.colaborador.zonas = data.data;
        this.zonasSelected = this.colaborador.zonas;
      });
    });

    this.http.post<any>('/api/colaborador/historialServiciosColaborador?idColaborador', { idColaborador: idColaborador }, this.httpOptions).subscribe(data => {
      this.selectedHistorialServicioItems2Tbl = data.data;
      this.historialServicioSource = new MatTableDataSource(this.selectedHistorialServicioItems2Tbl);
      if(this.selectedHistorialServicioItems2Tbl == []) {
        this.tablaHistorialServicioVacia = true;
      } else {
        this.tablaHistorialServicioVacia = false;
      }
      console.log(this.selectedHistorialServicioItems2Tbl);
    });
  }

  public descargarComprobantePago(item) {
    this.comprobantePagoImagenNombre = "comprobante." + item.comprobantePago.substring(item.comprobantePago.indexOf("/") + 1, item.comprobantePago.indexOf(";"));
    this.comprobantePagoImagenDatos = item.comprobantePago;
    const linkSource = this.comprobantePagoImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.comprobantePagoImagenNombre;
    downloadLink.click();
  }

  public descargarComprobanteEstudios(item) {
    this.cedulaImagenNombre = "cedula." + item.cedula.substring(item.cedula.indexOf("/") + 1, item.cedula.indexOf(";"));
    this.cedulaImagenDatos = item.cedula;
    const linkSource = this.cedulaImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.cedulaImagenNombre;
    downloadLink.click();
  }

  downloadBase64FileVisa() {
    const linkSource = this.visaImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.visaImagenNombre;
    downloadLink.click();
  }

  downloadBase64FilePasaporte() {
    const linkSource = this.pasaporteImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.pasaporteImagenNombre;
    downloadLink.click();
  }

  downloadBase64FileIne1() {
    const linkSource = this.ineImagenDatos1;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.ineImagenNombre1;
    downloadLink.click();
  }

  downloadBase64FileIne2() {
    const linkSource = this.ineImagenDatos2;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.ineImagenNombre2;
    downloadLink.click();
  }

  downloadBase64FileFoto() {
    const linkSource = this.fotoImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.fotoImagenNombre;
    downloadLink.click();
  }

  downloadBase64FileComprobanteDomicilio() {
    const linkSource = this.comprobanteDomicilioImagenDatos;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = this.comprobanteDomicilioImagenNombre;
    downloadLink.click();
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
    this.estudio.estatus = this.estatusEstudios.find(estu => { console.log(estu); return estu.nombre == event });
  }

  disableCed(event) {
    this.textBoxDisabledCed = true;
    this.estudio.estatus = this.estatusEstudios.find(estu => { return estu.nombre === event });
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

  checkboxesDiasLaborales(index: number, event) {
    if (index == 0 && event) {
      this.diasLaborales.lunes = false;
      this.diasLaborales.lunesTurno = null;
      this.diasLaborales.martes = false;
      this.diasLaborales.martesTurno = null;
      this.diasLaborales.miercoles = false;
      this.diasLaborales.miercolesTurno = null;
      this.diasLaborales.jueves = false;
      this.diasLaborales.juevesTurno = null;
      this.diasLaborales.viernes = false;
      this.diasLaborales.viernesTurno = null;
      this.diasLaborales.sabado = false;
      this.diasLaborales.sabadoTurno = null;
      this.diasLaborales.domingo = false;
      this.diasLaborales.domingoTurno = null;
    }
    if (index > 0 && event) {
      this.diasLaborales.todosDias = false;
      this.diasLaborales.todosDiasTurno = null;
    }
  }

  ngAfterViewInit(): void {
    this.dtTriggerEstudio.next();
  }

  public mostrarTab(tab: any) {
    this.tabVisible = tab;
  }

  public guardarColaborador(ngForm: NgForm) {
    this.colaborador.horario = this.diasLaborales;
    this.colaborador.idPais = 1;
    this.colaborador.idPaisNacimiento = 1;
    this.colaborador.idEstatus = 1;
    this.colaborador.zonas = this.zonasSelected;
    this.colaborador.cuentasColaborador = this.pagoSource.data;
    this.colaborador.estudios = this.estudioSource.data;
    this.colaborador.experiencias = this.experienciaSource.data;
    this.colaborador.especialidades = this.especialidadesSelected;
    this.colaborador.historialServicios = this.selectedHistorialServicioItems2Tbl;
    this.colaborador.habilidades = this.habilidadesSelected;
    console.log(this.colaborador.historialServicios);
    if (this.colaborador.idColaborador) {
      if (ngForm.valid) {
        this.http.post<any>('/api/colaborador/update', this.colaborador, this.httpOptions).subscribe(data => {
          this.showSuccess(NgbToastType.Success, "Se actualizo el colaborador exitosamente");
          window.history.back();
          alert("Se actualizo el colaborador exitosamente");
        });
        this.inicializaObjetos();
      } else {
        this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
      }
    } else {
      if (ngForm.valid) {
        this.http.post<any>('/api/colaborador/create', this.colaborador, this.httpOptions).subscribe(data => {
          this.showSuccess(NgbToastType.Success, "Se creo el colaborador exitosamente");
          window.history.back();
          alert("Se creo el colaborador exitosamente");
        });
        this.inicializaObjetos();
      } else {
        this.showSuccess(NgbToastType.Danger, "Debe llenar todos los campos obligatorios");
      }
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

  public colaboradoresCurp() {
      this.http.get<any>('/api/catalogo/colaboradoresCurp', this.httpOptions).subscribe(data => {
        this.colaboradoresCurps = data.data;
      });
  }

  public onCurp() {
    this.colaboradoresCurps.forEach(element => {
      if (element.curp == this.colaborador.curp) {
        console.log("exist");
        alert("El colaborador ya existe CURP");
        this.curpExiste = true;
      } else {
        this.curpExiste = false;
      }
    });
  }

  public cargaFotoPersonal(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
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

  public onPagoFileSelected(files: FileList) {
    let me = this;
    let file = files[0];
    let currentDate = new Date();
    let extension = file.type.split("/");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.pago.comprobantePago = reader.result;
      me.pago.comprobantePagoNombre = currentDate.getTime() + "." + extension[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  agregarEstudio(estudioParam: any) {
    if (estudioParam != null) {
      this.estudio = estudioParam;
    }
    if (this.estudio.idEstudio == null || estudioParam != null) {
      if (this.estudios.length == 0) {
        this.idEstudio = this.estudioSource.data.length + 1;
      } else {
        this.idEstudio++;
      }
      this.estudio.idEstudio = this.idEstudio;
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
  }

  onBanco(event) {
    this.pago.banco = this.bancos.find(banco => { return banco.idBanco == event });
  }

  agregarPago(pagoParam: any) {
    if (pagoParam != null) {
      this.pago = pagoParam;
    }
    if (this.pago.idPago == null || pagoParam != null) {
      if (this.pagoSource.data.length == 0) {
        this.idPago = this.pagoSource.data.length + 1;
      } else {
        this.idPago++;
      }
      this.pago.idPago = this.idPago;
    }
    this.PAGO_DATA.push(this.pago);
    this.pagoSource = new MatTableDataSource(this.PAGO_DATA);
    this.pago = {
      idPago: null,
      nombre: null,
      banco: null,
      tipoCuenta: null,
      numero: null,
      comprobantePago: null,
      comprobantePagoNombre: null,
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

  agregarExperiencia(experienciaParam: any) {
    if (experienciaParam != null) {
      this.experiencia = experienciaParam;
    }
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

  agregarHistorialServicio(historialServicioParam: any) {
    console.log(historialServicioParam);
    if (historialServicioParam != null) {
      this.historialServicio = historialServicioParam;
    }
    if (this.historialServicio.idHistorialServicio == null) {
      if (this.historialServicioSource.data.length == 0) {
        this.idHistorialServicio = this.historialServicioSource.data.length + 1;
      } else {
        this.idHistorialServicio = this.historialServicioSource.data[this.historialServicioSource.data.length - 1].idHistorialServicio + 1;
      }
      this.historialServicio.idHistorialServicio = this.idHistorialServicio;
    }
    console.log(this.historialServicio);
    this.HISTORIALSERVICIO_DATA.push(this.historialServicio);
    this.historialServicioSource = new MatTableDataSource(this.HISTORIALSERVICIO_DATA);
    console.log(this.historialServicioSource);

    this.historialServicio = {
      idHistorialServicio: null,
      fechaHistorialServicio: null,
      responsableHistorialServicio: null,
      observacionesHistorialServicio: null
    };
  }

  agregarHistorialServicio1() {
    // this.selectedHistorialServicioItems2Ind.push(this.historialServicio);

  //   this.selectedHistorialServicioItems2Ind = Object.keys(this.selectedHistorialServicioItems2).map(index => {
  //     let person = this.selectedHistorialServicioItems2[index];
  //     return person;
  // });
  
  let nuevoHistorial = {idHistorialServicio: this.indexNuevo, idColaborador: this.idColaborador != null ? this.idColaborador : null
  , fecha: this.historialServicio.fechaHistorialServicio, responsable: this.historialServicio.responsableHistorialServicio,
  observaciones: this.historialServicio.observacionesHistorialServicio};
  // nuevoHistorial["idHistorialServicio"] = this.indexNuevo;
  this.indexNuevo++;

  // nuevoHistorial["idColaborador"] = this.idColaborador != null ? this.idColaborador : null;
  // nuevoHistorial["fecha"] = this.historialServicio.fechaHistorialServicio;
  // nuevoHistorial["responsable"] = this.historialServicio.responsableHistorialServicio;
  // nuevoHistorial["observaciones"] = this.historialServicio.observacionesHistorialServicio;

  // if (this.selectedHistorialServicioItems2Tbl.length>0) {
  //   this.selectedHistorialServicioItems2Tbl.push(this.selectedHistorialServicioItems2Ind);
  // } else {
  //   if (this.selectedHistorialServicioItems2Tbl.length==0 || this.selectedHistorialServicioItems2Tbl.length==undefined) {
  //     this.selectedHistorialServicioItems2Tbl=this.selectedHistorialServicioItems2Ind;
  //   }
  // }

  this.selectedHistorialServicioItems2Tbl.push(nuevoHistorial);


  this.historialServicioSource = new MatTableDataSource(this.selectedHistorialServicioItems2Tbl);
  console.log(this.selectedHistorialServicioItems2Tbl);
  this.historialServicio = {
    idHistorialServicio: null,
    fechaHistorialServicio: null,
    responsableHistorialServicio: null,
    observacionesHistorialServicio: null
  };
  // this.selectedHistorialServicioItems2 = null;
  // this.selectedHistorialServicioItems2Ind = [];
  console.log(this.selectedHistorialServicioItems2Tbl);
  }

  agregarHistorialServicioExistente() {

    let nuevoHistorial = {idColaborador: this.idColaborador,
      fecha: this.historialServicio.fechaHistorialServicio,
      responsable: this.historialServicio.responsableHistorialServicio,
      observaciones: this.historialServicio.observacionesHistorialServicio};

    this.http.post<any>('/api/colaborador/createHistorialServicioExistente', nuevoHistorial, this.httpOptions).subscribe(data => {
      this.showSuccess(NgbToastType.Success, "Se agrego nueva observación");
      this.selectedHistorialServicioItems2Tbl.push(nuevoHistorial);
      this.historialServicioSource = new MatTableDataSource(this.selectedHistorialServicioItems2Tbl);
    });
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

  borraHistorialServicio(historialServicioTmp) {
    this.HISTORIALSERVICIO_DATA = this.HISTORIALSERVICIO_DATA.filter((value, key) => {
      return value.idHistorialServicio != historialServicioTmp.idHistorialServicio;
    });
    this.historialServicioSource.data = this.historialServicioSource.data.filter((value, key) => {
      return value.idHistorialServicio != historialServicioTmp.idHistorialServicio;
    });
  }

  borraHistorialServicioExistente(historialServicioTmp) {
    console.log(historialServicioTmp);

    this.http.post<any>('/api/colaborador/borrarHistorialServicioExistente', historialServicioTmp.idHistorialServicio, this.httpOptions).subscribe(data => {
      this.showSuccess(NgbToastType.Success, "Se eliminó observación");

      
      // this.selectedHistorialServicioItems2Tbl.push(nuevoHistorial);
      // this.historialServicioSource = new MatTableDataSource(this.selectedHistorialServicioItems2Tbl);
    });

    for(var i = 0; i < this.selectedHistorialServicioItems2Tbl.length; i++) {
      if(this.selectedHistorialServicioItems2Tbl[i].idHistorialServicio == historialServicioTmp.idHistorialServicio) {
        this.selectedHistorialServicioItems2Tbl.splice(i, 1);
          break;
      }
  }
    this.historialServicioSource = new MatTableDataSource(this.selectedHistorialServicioItems2Tbl);
      
    // this.HISTORIALSERVICIO_DATA = this.HISTORIALSERVICIO_DATA.filter((value, key) => {
    //   return value.idHistorialServicio != historialServicioTmp.idHistorialServicio;
    // });
    // this.historialServicioSource.data = this.historialServicioSource.data.filter((value, key) => {
    //   return value.idHistorialServicio != historialServicioTmp.idHistorialServicio;
    // });
  }

  pagAtras(index) {
    if (this.selected.value > 0) {
      this.selected.setValue(this.selected.value - index);
    }
  }

  pagDelante(index) {
    if (this.selected.value < 8) {
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
      comprobantePago: null,
      comprobantePagoNombre: null
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

  limpiarHistorialServicio() {
    this.historialServicio = {
      idHistorialServicio: null,
      fechaHistorialServicio: null,
      responsableHistorialServicio: null,
      observacionesHistorialServicio: null
    };
  }

  public listaEstatus() {
    this.http.get<any>('/api/catalogo/estatus?tipo=ESTUDIO', this.httpOptions).subscribe(data => {
      this.estatusEstudios = data.data;
    });
  }

  public comboCalificaciones() {
    this.http.get<any>('/api/catalogo/calificaciones', this.httpOptions).subscribe(data => {
      this.calificaciones = data.data;
    });
  }

  public comboGradoEstudios() {
    this.http.get<any>('/api/catalogo/gradoEstudios', this.httpOptions).subscribe(data => {
      this.gradoEstudios = data.data;
    });
  }

  public comboTiposColaboradores() {
    this.http.get<any>('/api/catalogo/tiposColaboradores', this.httpOptions).subscribe(data => {
      this.tiposColaboradores = data.data;
    });
  }

  public comboTeces() {
    this.http.get<any>('/api/catalogo/teces', this.httpOptions).subscribe(data => {
      this.teces = data.data;
    });
  }

  public comboTipoVisas() {
    this.http.get<any>('/api/catalogo/tipoVisas', this.httpOptions).subscribe(data => {
      this.tipoVisas = data.data;
    });
  }

  public comboBancos() {
    this.http.get<any>('/api/catalogo/bancos', this.httpOptions).subscribe(data => {
      this.bancos = data.data;
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

  public comboPermanencias() {
    this.http.get<any>('/api/catalogo/permanencias', this.httpOptions).subscribe(data => {
      this.permanencias = data.data;
    });
  }

  public comboZonasLaborales() {
    this.http.get<any>('/api/catalogo/zonasLaborales', this.httpOptions).subscribe(data => {
      this.zonasLaborales = data.data;
    });
  }

  public comboEspecialidades() {
    this.http.get<any>('/api/catalogo/especialidades', this.httpOptions).subscribe(data => {
      this.especialidades = data.data;
    });
  }

  public comboHabilidades() {
    this.http.get<any>('/api/catalogo/habilidades', this.httpOptions).subscribe(data => {
      this.habilidades = data.data;
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

  public comboCiudades(idEstadoNacimiento) {
    this.colaborador.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado=' + idEstadoNacimiento, this.httpOptions).subscribe(data => {
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

  public comboEstados() {
    this.http.get<any>('/api/catalogo/estados?idPais=' + this.selectedPais, this.httpOptions).subscribe(data => {
      this.estados = data.data;
    });
  }

  public comboPaises() {
    this.http.get<any>('/api/catalogo/paises', this.httpOptions).subscribe(data => {
      this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal) {
    this.colaborador.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal=' + selectedCodigoPostal, this.httpOptions).subscribe(data => {
      this.colonias = data.data;
      this.colaborador.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad=' + data.data[0].idCiudad, this.httpOptions).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.colaborador.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado=' + dataCiudad.data[0].idEstado, this.httpOptions).subscribe(data => {
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

  inputCheckedHabilidad(habilidadParam) {
    if (this.habilidadesSelected.find(habilidad => { return habilidad.idHabilidad === habilidadParam.idHabilidad }) === undefined) {
      return false;
    } else {
      return true;
    }
  }

  inputCheckedEspecialidad(especialidadParam) {
    if (this.especialidadesSelected.find(especialidad => { return especialidad.idEspecialidad === especialidadParam.idEspecialidad }) === undefined) {
      return false;
    } else {
      return true;
    }
  }

  inputCheckedZonasLaborales(zonasParam) {
    if (this.zonasSelected.find(zonas => { return zonas.idZonaLaboral === zonasParam.idZonaLaboral }) === undefined) {
      return false;
    } else {
      return true;
    }
  }
}