import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colaborador } from '../_model/colaborador';
import {Pago} from '../_model/pago';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../_model/experiencia';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradorComponent implements OnInit {
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
  public colaborador:Colaborador = {
    idColaborador:null,
    nombre:null,
    a_paterno:null,
    a_materno:null,
    correoElectronico:null,
    foto:null,
    rfc:null,
    nss:null,
    fecha_nacimiento:null,
    idSexo:null,
    peso:null,
    estatura:null,
    idZonaLaboral:null,
    idEstadoCivil:null,
    idTez:null,
    sgmm:null,
    atiendeCovid:null,
    antecedentePenales:null,
    autoPropio:false,
    dispuestoViajar:false,
    visa:false,
    visaNumero:null,
    tipoVisa:null,
    expiracionVisa:null,
    visaImagen:null,
    pasaporte:false,
    pasaporteNumero:null,
    expiracionPasaporte:null,
    pasaporteImagen:null,
    ine1:null,
    ine2:null,
    idEstatus:null,
    calle1:null,
    calle2:null,
    codigoPostal:null,
    idPais:null,
    idEstado:null,
    idCiudad:null,
    idColonia:null,
    noExt:null,
    noInt:null,
    horario:null
  };
  diasLaborales:any = {
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
  estatusEstudios: string[] = ['Si', 'No', 'Trunco'];
  estatusSelected:string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTriggerEstudio.next();
      console.log(this.dtTriggerEstudio);
    });
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
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
    this.colaborador.idPais=null;
    this.colaborador.idEstado=null;
    this.colaborador.idCiudad=null;
    this.colaborador.idColonia=null;
    this.colaborador.noExt=null;
    this.colaborador.noInt=null;
    this.colaborador.horario=null;

    this.idEstudio = 0;
    this.idPago = 0;
    this.idExperiencia = 0;
    
    this.pagos=[];
    this.pago = {
      idPago:null,
      nombre:null,
      banco:null,
      tipocuenta:null,
      numero:null
    };
    this.estudios=[];
    this.estudio = {
      idEstudio:null,
      idColaborador:null,
      institucion:null,
      inicio:null,
      fin:null,
      estatus:null,
      cedula:null,
      comentarios:null
    };
    this.experiencias=[];
    this.experiencia = {
      idExperiencia:null,
      lugar:null,
      actividades:null,
      inicio:null,
      fin:null,
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
  enableCed(){
    this.textBoxDisabledCed = false;
  }
  disableCed(){
    this.textBoxDisabledCed = true;
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
    console.log(this.colaborador);
    this.http.post<any>('/api/colaborador/create',this.colaborador).subscribe(data => {
        console.log(data);
        alert("Se guardo");
    })
    this.inicializaObjetos();
  }

  public onIneFileSelected(files: FileList) {
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

  public onCedulaFileSelected(files: FileList) {
    console.log("entro cedula");
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

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  onEstudioChange(data:string){
    console.log(data);
    this.estatusSelected = data;
  }

  agregarEstudio(){
    if(this.estudio.idEstudio == null)    {
      this.idEstudio++;
      this.estudio.idEstudio=this.idEstudio;
    }else{}

    this.estudio.estatus = this.estatusSelected;
    console.log(this.estudio);
    this.estudios.push(this.estudio);
    this.estudio ={
      idEstudio:null,
      idColaborador:null,
      institucion:null,
      inicio:null,
      fin:null,
      estatus:null,
      cedula:null,
      comentarios:null
    };
    this.estatusSelected = "";
  
  }

  agregarPago(){
    if(this.pago.idPago == null)    {
      this.idPago++;
      this.pago.idPago=this.idPago;
    }else{}

    
    console.log(this.pago);
    this.pagos.push(this.pago);
    this.pago ={
      idPago:null,
      nombre:null,
      banco:null,
      tipocuenta:null,
      numero:null,
    };
    
  
  }

  agregarExperiencia(){
    if(this.experiencia.idExperiencia == null)    {
      this.idExperiencia++;
      this.experiencia.idExperiencia=this.idExperiencia;
    }else{}

    
    console.log(this.experiencia);
    this.experiencias.push(this.experiencia);
    this.experiencia ={
      idExperiencia:null,
      lugar:null,
      actividades:null,
      inicio:null,
      fin:null,
      referencia:null,
      telefono:null,
      especialidad:null
    };
    
  
  }

  editaEstudio(estudioTmp:any){
    this.estudio = estudioTmp;
  }

  borraEstudio(estudioTmp){

    this.estudios.forEach((element,index)=>{
      if(element.idEstudio==estudioTmp.idEstudio)
      {
        this.estudios.splice(index,1);
        //delete this.estudios[estudioTmp.idEstudio];
      } 
   });
   this.rerender();
  }

  public comboCalificaciones(){
    this.http.get<any>('/api/catalogo/calificaciones').subscribe(data => {
        console.log(data);
        this.calificaciones = data.data;
    });
  }

  public comboTiposColaboradores(){
    this.http.get<any>('/api/catalogo/tiposColaboradores').subscribe(data => {
        console.log(data);
        this.tiposColaboradores = data.data;
    });
  }

  public comboTeces(){
    this.http.get<any>('/api/catalogo/teces').subscribe(data => {
        console.log(data);
        this.teces = data.data;
    });
  }

  public comboBancos(){
    this.http.get<any>('/api/catalogo/bancos').subscribe(data => {
        console.log(data);
        this.bancos = data.data;
    });
  }

  public comboEstadosCiviles(){
    this.http.get<any>('/api/catalogo/comboEstadosCiviles').subscribe(data => {
        console.log(data);
        this.estadosCiviles = data.data;
    });
  }

  public comboTiposTelefono(){
    this.http.get<any>('/api/catalogo/tiposTelefono').subscribe(data => {
        console.log(data);
        this.tiposTelefono = data.data;
    });
  }

  public comboPermanencias(){
    this.http.get<any>('/api/catalogo/permanencias').subscribe(data => {
        console.log(data);
        this.permanencias = data.data;
    });
  }

  public comboZonasLaborales(){
    this.http.get<any>('/api/catalogo/zonasLaborales').subscribe(data => {
        console.log(data);
        this.zonasLaborales = data.data;
    });
  }

  public comboEspecialidades(){
    this.http.get<any>('/api/catalogo/especialidades').subscribe(data => {
        console.log(data);
        this.especialidades = data.data;
    });
  }

  public comboHabilidades(){
    this.http.get<any>('/api/catalogo/habilidades').subscribe(data => {
        console.log(data);
        this.habilidades = data.data;
    });
  }

  public comboColonias(){
    this.http.get<any>('/api/catalogo/colonias').subscribe(data => {
        console.log(data);
        this.colonias = data.data;
    });
  }

  public comboSexos(){
    this.http.get<any>('/api/catalogo/sexos').subscribe(data => {
        console.log(data);
        this.sexos = data.data;
    });
  }

  public comboCiudades(e){
    this.http.get<any>('/api/catalogo/ciudades?idEstado='+ e).subscribe(data => {
        console.log(data);
        this.ciudades = data.data;
    });
  }

  public comboEstados(){
    this.http.get<any>('/api/catalogo/estados?idPais='+ this.selectedPais).subscribe(data => {
        console.log(data);
        this.estados = data.data;
    });
  }

  public comboPaises(){
    this.http.get<any>('/api/catalogo/paises').subscribe(data => {
        console.log(data);
        this.paises = data.data;
    });
  }

  public onCodigoPostal(selectedCodigoPostal){
    this.http.get<any>('/api/catalogo/coloniasByCodigoPostal?codigoPostal='+ selectedCodigoPostal).subscribe(data => {
      console.log(data);
      this.colonias = data.data;
      this.http.get<any>('/api/catalogo/ciudadByCodigoPostal?idCiudad='+ data.data[0].idCiudad).subscribe(data => {
        this.ciudadesDir = data.data;
        this.http.get<any>('/api/catalogo/estadoByCodigoPostal?idEstado='+ data.data[0].idEstado).subscribe(data => {
          console.log(data.data[0].idEstado);
          this.estadosDir = data.data;
      });
    });
  }); 
  }
}
