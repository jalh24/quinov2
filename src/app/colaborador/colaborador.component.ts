import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colaborador } from '../_model/colaborador';
import {Pago} from '../_model/pago';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../_model/experiencia';
import  {  NgbToastService, NgbToastType,NgbToast }  from  'ngb-toast';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Estatus } from '../_model/estatus';


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradorComponent implements OnInit {

  show = false;
  autohide = true;

  ESTUDIO_DATA: Estudio[] = [];
  estudioSource = new MatTableDataSource<Estudio>(this.ESTUDIO_DATA);

  estudioColumns: string[] = ['institucion', 'comentarios', 'inicio', 'fin','estatus', 'deleteColaborador'];
  @ViewChild('estudiosTable',{static:true}) estudiosTable: MatTable<any>;
  
  PAGO_DATA: Pago[] = [];
  pagoSource = new MatTableDataSource<Pago>(this.PAGO_DATA);

  pagoColumns: string[] = ['nombre', 'banco', 'tipoCuenta', 'numero', 'deletePago'];
  @ViewChild('pagosTable',{static:true}) pagosTable: MatTable<any>;

  textBoxDisabledCed = true;
  textBoxDisabledSeg = true;
  textBoxDisabledOtraEsp = true;
  textBoxDisabledOtraZon = true;
  textBoxDisabledOtraHab = true;
  textBoxDisabledVis = true;
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
  selectedCodigoPostal=null;

  tabVisible:any = 1;
  @ViewChild('myForm') ngForm: NgForm;
  
  dtTriggerEstudio = new Subject();
  dtTriggerPago = new Subject();
  dtTriggerExperiencia = new Subject();

  idPago:number;
  idEstudio:number;
  idExperiencia:number;
  public colaborador:Colaborador;
  diasLaborales:any = {
    todosDias:false,
    todosDiasDesde:null,
    todosDiasHasta:null,
    lunes:false,
    lunesDesde:null,
    lunesHasta:null,
    martes:false,
    martesDesde:null,
    martesHasta:null,
    miercoles:false,
    miercolesDesde:null,
    miercolesHasta:null,
    jueves:false,
    juevesDesde:null,
    juevesHasta:null,
    viernes:false,
    viernesDesde:null,
    viernesHasta:null,
    sabado:false,
    sabadoDesde:null,
    sabadoHasta:null,
    domingo:false,
    domingoDesde:null,
    domingoHasta:null
  };
  sexos:any[];
  colonias:any[];
  ciudades:any[];
  ciudadesDir:any[];
  estadosDir:any[];
  estados:any[];
  paises:any[];
  calificaciones:any[];
  tiposColaboradores:any[];
  teces:any[];
  bancos:any[];
  estadosCiviles:any[];
  tiposTelefono:any[];
  permanencias:any[];
  zonasLaborales:any[];
  especialidades:any[];
  habilidades:any[];
  pagos:Pago[];
  pago:Pago;
  estudios:Estudio[];
  estudio:Estudio;
  experiencias:Experiencia[];
  experiencia:Experiencia;
  dtOptionsPago: any = {};
  dtOptionsEstudio: any = {};
  dtOptionsExperiencia: any = {};
  estatusEstudios: Estatus[];
  estatusSelected:string;

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
    private  toastService:  NgbToastService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listaEstatus();
    this.comboEstados();
    this.comboPaises();
    this.comboCalificaciones();
    this.comboTiposColaboradores();
    this.comboTeces();
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
          if(self.pago !== null){
            if(self.pago.idPago === data.idPago){
              this.pago= null;
            } else{
              self.pago=data;
            }
          } else{
            self.colaborador=data;
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
          if(self.estudio !== null){
            if(self.estudio.idEstudio === data.idEstudio){
              this.estudio= null;
            } else{
              self.estudio=data;
            }
          } else{
            self.colaborador=data;
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
          if(self.experiencia !== null){
            if(self.experiencia.idExperiencia === data.idExperiencia){
              this.experiencia= null;
            } else{
              self.experiencia=data;
            }
          } else{
            self.colaborador=data;
          }
        });

        return row;
      }

    };
  }

  inicializaObjetos(){
    this.colaborador = new Colaborador();
    this.colaborador.idColaborador=null;
    this.colaborador.nombre=null;
    this.colaborador.a_paterno=null;
    this.colaborador.a_materno=null;
    this.colaborador.correoElectronico=null;
    this.colaborador.foto=null;
    this.colaborador.rfc=null;
    this.colaborador.nss=null;
    this.colaborador.fecha_nacimiento=null;
    this.colaborador.idSexo=null;
    this.colaborador.peso=null;
    this.colaborador.estatura=null;
    this.colaborador.idZonaLaboral=null;
    this.colaborador.idEstadoCivil=null;
    this.colaborador.idTez=null;
    this.colaborador.sgmm=null;
    this.colaborador.atiendeCovid=null;
    this.colaborador.antecedentePenales=null;
    this.colaborador.autoPropio=false;
    this.colaborador.dispuestoViajar=false;
    this.colaborador.visa=false;
    this.colaborador.visaNumero=null;
    this.colaborador.tipoVisa=null;
    this.colaborador.expiracionVisa=null;
    this.colaborador.visaImagen=null;
    this.colaborador.pasaporte=false;
    this.colaborador.pasaporteNumero=null;
    this.colaborador.expiracionPasaporte=null;
    this.colaborador.pasaporteImagen=null;
    this.colaborador.ine1=null;
    this.colaborador.ine2=null;
    this.colaborador.idEstatus=null;
    this.colaborador.calle1=null;
    this.colaborador.calle2=null;
    this.colaborador.codigoPostal=null;
    this.colaborador.idPaisNacimiento=null;
    this.colaborador.idEstadoNacimiento=null;
    this.colaborador.idCiudadNacimiento=null;
    this.colaborador.comprobanteDomicilio= null;
    this.colaborador.idPais=null;
    this.colaborador.idEstado=null;
    this.colaborador.idCiudad=null;
    this.colaborador.idColonia=null;
    this.colaborador.noExt=null;
    this.colaborador.noInt=null;
    this.colaborador.horario=null;
    this.colaborador.estudios=[];
    this.colaborador.experiencias=[];
    this.colaborador.cuentasColaborador=[];
    this.colaborador.contactosColaborador=[];

    this.idEstudio = 0;
    this.idPago = 0;
    this.idExperiencia = 0;
    
    this.pagos=[];
    this.pago = {
      idPago:null,
      nombre:null,
      banco:null,
      tipoCuenta:null,
      numero:null
    };
    this.estudios=[];
    this.estudio = {
      idEstudio:null,
      idColaborador:null,
      institucion:null,
      fechaInicio:null,
      fechaFin:null,
      estatus:null,
      cedula:null,
      comentarios:null
    };
    this.experiencias=[];
    this.experiencia = {
      idExperiencia:null,
      empresa:null,
      actividades:null,
      fechaInicio:null,
      fechaFin:null,
      referencia:null,
      telefono:null,
      especialidad:null
    };
    
  }

  enableSeguros(){
    this.textBoxDisabledSeg = false;
  }
  disableSeguros(){
    this.textBoxDisabledSeg = true;
  }
  enableOtraEsp(){
    this.textBoxDisabledOtraEsp = !this.textBoxDisabledOtraEsp;
  }
  enableOtraZon(){
    this.textBoxDisabledOtraZon = !this.textBoxDisabledOtraZon;
  }
  enableOtraHab(){
    this.textBoxDisabledOtraHab = !this.textBoxDisabledOtraHab;
  }

  enableCed(event){
    this.textBoxDisabledCed = false;
    console.log(event);
    this.estudio.estatus = this.estatusEstudios.find(estu=> { console.log(estu); return estu.nombre == event}); 
    console.log(this.estudio);
    //this.estudio.estatus = event;
  }
  
  disableCed(event){
    this.textBoxDisabledCed = true;
    this.estudio.estatus = this.estatusEstudios.find(estu=> { return estu.nombre === event}); 
    console.log(this.estudio);
    //this.estudio.estatus = event;
  }
  
  enableTextBoxVis(){
    this.textBoxDisabledVis = false;
  }
  disableTextBoxVis(){
    this.textBoxDisabledVis = true;
  }
  enableTextBoxPas(){
    this.textBoxDisabledPas = false;
  }
  disableTextBoxPas(){
    this.textBoxDisabledPas = true;
  }
  disableTextBoxDateofWorkL(){
    this.textBoxDisabledDateofWorkL = !this.textBoxDisabledDateofWorkL;
  }
  disableTextBoxDateofWorkM(){
    this.textBoxDisabledDateofWorkM = !this.textBoxDisabledDateofWorkM;
  }
  disableTextBoxDateofWorkMi(){
    this.textBoxDisabledDateofWorkMi = !this.textBoxDisabledDateofWorkMi;
  }
  disableTextBoxDateofWorkJ(){
    this.textBoxDisabledDateofWorkJ = !this.textBoxDisabledDateofWorkJ;
  }
  disableTextBoxDateofWorkV(){
    this.textBoxDisabledDateofWorkV = !this.textBoxDisabledDateofWorkV;
  }
  disableTextBoxDateofWorkS(){
    this.textBoxDisabledDateofWorkS = !this.textBoxDisabledDateofWorkS;
  }
  disableTextBoxDateofWorkD(){
    this.textBoxDisabledDateofWorkD = !this.textBoxDisabledDateofWorkD;
  }
  disableTextBoxDateofWorkT(){
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
    this.diasLaborales.lunesDesde = null;
    this.diasLaborales.lunesHasta = null;
    this.diasLaborales.martes=false;
    this.diasLaborales.martesDesde=null;
    this.diasLaborales.martesHasta=null;
    this.diasLaborales.miercoles=false;
    this.diasLaborales.miercolesDesde=null;
    this.diasLaborales.miercolesHasta=null;
    this.diasLaborales.jueves=false;
    this.diasLaborales.juevesDesde=null;
    this.diasLaborales.juevesHasta=null;
    this.diasLaborales.viernes=false;
    this.diasLaborales.viernesDesde=null;
    this.diasLaborales.viernesHasta=null;
    this.diasLaborales.sabado=false;
    this.diasLaborales.sabadoDesde=null;
    this.diasLaborales.sabadoHasta=null;
    this.diasLaborales.domingo=false;
    this.diasLaborales.domingoDesde=null;
    this.diasLaborales.domingoHasta=null;
  }
  

  ngAfterViewInit(): void {
    this.dtTriggerEstudio.next();
  }
  

  public mostrarTab(tab:any){
    this.tabVisible=tab;
    console.log(tab);
  }

  public guardarColaborador(ngForm: NgForm){
    //this.colaborador.estudios = this.estudios;
    this.colaborador.horario = this.diasLaborales;
    // this.colaborador.codigoPostal = this.selectedCodigoPostal;
    this.colaborador.idPais=1;
    this.colaborador.idPaisNacimiento=1;
    this.colaborador.idEstatus=1;
    this.colaborador.idZonaLaboral=1;
    this.colaborador.cuentasColaborador = this.pagoSource.data;
    this.colaborador.estudios = this.estudioSource.data;
    this.colaborador.experiencias= this.experiencias;
    console.log(this.colaborador);

    if(ngForm.valid){
      this.http.post<any>('/api/colaborador/create',this.colaborador).subscribe(data => {
        this.showSuccess(NgbToastType.Success,"Se creo el colaborador exitosamente");
        });
        this.inicializaObjetos();
    } else{
      this.showSuccess(NgbToastType.Danger,"Debe llenar todos los campos obligatorios");
    }
    
  }

  showSuccess(type:any,message:string): void {
		const toast: NgbToast = {
			toastType:  type,
			text:  message,
			dismissible:  true,
      timeInSeconds:5,
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
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.ine1=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public ineReverso(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.ine2=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public fotoPersonal(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.foto=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public comprobanteDomicilio(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.comprobanteDomicilio=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public onVisa(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.visaImagen=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public onPasaporte(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.pasaporteImagen=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }


  public onCedulaFileSelected(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.estudio.cedula=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public cargaFotoPersonal(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.foto=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  agregarEstudio(){
    if(this.estudio.idEstudio == null)    {
      if(this.estudios.length==0){
        this.idEstudio= this.estudioSource.data.length + 1;
      } else{
        this.idEstudio++;
      }
      this.estudio.idEstudio=this.idEstudio;
      console.log(this.estudio);
      this.ESTUDIO_DATA.push(this.estudio);
      this.estudioSource= new MatTableDataSource(this.ESTUDIO_DATA);
    }else{
      this.estudio.estatus = this.estatusEstudios.find(estu=> { return estu.nombre === this.estatusSelected}); ;
      this.estudios.splice(this.estudio.idEstudio,1, this.estudio);
    }
    
    this.estudio ={
      idEstudio:null,
      idColaborador:null,
      institucion:null,
      fechaInicio:null,
      fechaFin:null,
      estatus:null,
      cedula:null,
      comentarios:null
    };
    this.estatusSelected = "";
    this.changeDetectorRefs.detectChanges();
    this.estudiosTable.renderRows();
  }

  borraEstudio(estudioTmp){
    this.ESTUDIO_DATA = this.ESTUDIO_DATA.filter((value,key)=>{
      return value.idEstudio != estudioTmp.idEstudio;
    });
    this.estudioSource.data = this.estudioSource.data.filter((value,key)=>{
      return value.idEstudio != estudioTmp.idEstudio;
    });
  }

  onTipoCuenta(event){
    this.pago.tipoCuenta=event;
    console.log(event);
  }

  onBanco(event){
    this.pago.banco = this.bancos.find(banco => { return banco.idBanco == event});
    console.log(this.pago);
  }

  agregarPago(){
    if(this.pago.idPago == null)    {
      if(this.pagoSource.data.length==0){
        this.idPago= this.pagoSource.data.length + 1;
      } else{
        this.idPago++;
      }
      this.pago.idPago=this.idPago;
    }
    console.log(this.pago);
    this.PAGO_DATA.push(this.pago);
    this.pagoSource= new MatTableDataSource(this.PAGO_DATA);

    this.pago ={
      idPago:null,
      nombre:null,
      banco:null,
      tipoCuenta:null,
      numero:null,
    };
      
  }

  agregarExperiencia(){
    if(this.experiencia.idExperiencia == null)    {
      if(this.experiencias.length==0){
        this.idExperiencia= Math.random();
      } else{
        this.idExperiencia++;
      }
      
      this.experiencia.idExperiencia=this.idExperiencia;
    }

    this.experiencias.push(this.experiencia);
    this.experiencia ={
      idExperiencia:null,
      empresa:null,
      actividades:null,
      fechaInicio:null,
      fechaFin:null,
      referencia:null,
      telefono:null,
      especialidad:null
    };
    
  
  }

  editaEstudio(estudioTmp:any){
    this.estudio = estudioTmp;
  }
  editaPago(pagoTmp:any){
    this.pago = pagoTmp;
  }
  editaExperiencia(experienciaTmp:any){
    this.experiencia = experienciaTmp;
  }

  

  borraPago(pagoTmp){
    this.pagos.forEach((element,index)=>{
      if(element.idPago==pagoTmp.idPago)
      {
        this.pagos.splice(index,1);
      } 
   });
  // this.rerender();
  }

  borraExperiencia(experienciaTmp){
    this.experiencias.forEach((element,index)=>{
      if(element.idExperiencia==experienciaTmp.idExperiencia)
      {
        this.experiencias.splice(index,1);
      } 
   });
  // this.rerender();
  }

  limpiarEstudio(){
    this.estudio ={
      idEstudio:null,
      idColaborador:null,
      institucion:null,
      fechaInicio:null,
      fechaFin:null,
      estatus:null,
      cedula:null,
      comentarios:null
    };
  }
  limpiarPago(){
    this.pago ={
      idPago:null,
      nombre:null,
      banco:null,
      tipoCuenta:null,
      numero:null,
    };
  }
  limpiarExperiencia(){
    this.experiencia ={
      idExperiencia:null,
      empresa:null,
      actividades:null,
      fechaInicio:null,
      fechaFin:null,
      referencia:null,
      telefono:null,
      especialidad:null
    };
  }

  public listaEstatus(){
    this.http.get<any>('/api/catalogo/estatus?tipo=ESTUDIO').subscribe(data => {
        this.estatusEstudios= data.data;
    });
  }

  public comboCalificaciones(){
    this.http.get<any>('/api/catalogo/calificaciones').subscribe(data => {
        this.calificaciones = data.data;
    });
  }

  public comboTiposColaboradores(){
    this.http.get<any>('/api/catalogo/tiposColaboradores').subscribe(data => {
        this.tiposColaboradores = data.data;
    });
  }

  public comboTeces(){
    this.http.get<any>('/api/catalogo/teces').subscribe(data => {
        this.teces = data.data;
    });
  }

  public comboBancos(){
    this.http.get<any>('/api/catalogo/bancos').subscribe(data => {
        this.bancos = data.data;
    });
  }

  public comboEstadosCiviles(){
    this.http.get<any>('/api/catalogo/comboEstadosCiviles').subscribe(data => {
        this.estadosCiviles = data.data;
    });
  }

  public comboTiposTelefono(){
    this.http.get<any>('/api/catalogo/tiposTelefono').subscribe(data => {
        this.tiposTelefono = data.data;
    });
  }

  public comboPermanencias(){
    this.http.get<any>('/api/catalogo/permanencias').subscribe(data => {
        this.permanencias = data.data;
    });
  }

  public comboZonasLaborales(){
    this.http.get<any>('/api/catalogo/zonasLaborales').subscribe(data => {
        this.zonasLaborales = data.data;
    });
  }

  public comboEspecialidades(){
    this.http.get<any>('/api/catalogo/especialidades').subscribe(data => {
        this.especialidades = data.data;
    });
  }

  public comboHabilidades(){
    this.http.get<any>('/api/catalogo/habilidades').subscribe(data => {
        this.habilidades = data.data;
    });
  }

  public comboColonias(){
    this.http.get<any>('/api/catalogo/colonias').subscribe(data => {
        this.colonias = data.data;
    });
  }

  public comboSexos(){
    this.http.get<any>('/api/catalogo/sexos').subscribe(data => {
        this.sexos = data.data;
    });
  }

  public comboCiudades(idEstadoNacimiento){
    this.colaborador.idEstadoNacimiento = idEstadoNacimiento;
    this.http.get<any>('/api/catalogo/ciudades?idEstado='+ idEstadoNacimiento).subscribe(data => {
        this.ciudades = data.data;    
    });
  }

  public comboEstados(){
    this.http.get<any>('/api/catalogo/estados?idPais='+ this.selectedPais).subscribe(data => {
        this.estados = data.data;
    });
  }

  public comboPaises(){
    this.http.get<any>('/api/catalogo/paises').subscribe(data => {
        this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal){
    this.colaborador.codigoPostal = selectedCodigoPostal;
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal='+ selectedCodigoPostal).subscribe(data => {
      this.colonias = data.data;
      this.colaborador.idCiudad = data.data[0].idCiudad;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad='+ data.data[0].idCiudad).subscribe(dataCiudad => {
        this.ciudadesDir = dataCiudad.data;
        this.colaborador.idEstado = dataCiudad.data[0].idEstado;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado='+ dataCiudad.data[0].idEstado).subscribe(data => {
          this.estadosDir = data.data;
      });
    });
  }); 
  }

  onColonia(value:any){
    this.colaborador.idColonia = value;
  }
  
  onCiudad(value:any){
    this.colaborador.idCiudad = value;
  }

  onEstado(value:any){
    this.colaborador.idEstado = value;
  }

  onEstadoCivil(value:any){
    this.colaborador.idEstadoCivil = value;
  }

  onTez(value:any){
    this.colaborador.idTez = value;
  }

  onSexo(value:any){
    this.colaborador.idSexo = value;
  }

  onCalificacion(value:any){
    this.colaborador.idCalificacion = value;
  }

  onTipoColaborador(value:any){
    this.colaborador.idTipoColaborador = value;
  }

  onCiudadNacimiento(value:any){
    this.colaborador.idCiudadNacimiento = value;
  }

  onTipoTel1(value:any){
    this.colaborador.tipoTelefono1 = value;
  }

  onTipoTel2(value:any){
    this.colaborador.tipoTelefono2 = value;
  }

  onPermanencia(value:any){
    this.colaborador.idPermanencia = value;
  }
}
