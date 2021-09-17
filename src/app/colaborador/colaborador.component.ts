import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colaborador } from '../_model/colaborador';
import { DataTableDirective } from 'angular-datatables';
import { Estudio } from '../_model/estudio';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColaboradorComponent implements OnInit {
  textBoxDisabledSeg = true;
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

  idEstudio:number;
  public colaborador:Colaborador = {
    rfc:null,
    foto:null,
    nombre:null,
    a_paterno:null,
    a_materno:null,
    nss:null,
    ine:null,
    fecha_nacimiento:null,
    ldn_ciudad:null,
    ldn_pais:null,
    calle1:null,
    calle2:null,
    no_ext:null,
    no_int:null,
    colonia:null,
    ciudad:null,
    estado:null,
    pais:null,
    codigo_postal:null,
    comprobante:null,
    sexo:null,
    peso:null,
    tez:null,
    estado_civil:null,
    telefono1:null,
    telefono1_tipo:null,
    telefono2:null,
    telefono2_tipo:null,
    correo_electronico:null,
    sgmm:null,
    aseguradora:null,
    permanencia:null,
    atiende_covid:null,
    a_penales:null,
    disp_viajar:null,
    visa:null,
    num_visa:null,
    tipo_visa:null,
    fechaexp_visa:null,
    pasaporte:null,
    num_pasaporte:null,
    fechaexp_pasaporte:null,
    referencia:null,
    estatura:null,
    contacto1:null,
    parentesco_con1:null,
    telefono_con1:null,
    correo_con1:null,
    contacto2:null,
    parentesco_con2:null,
    telefono_con2:null,
    correo_con2:null,
    zona_laboral:null,
    auto_propio:null,
    estudios: []
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
  teces:any[];
  estadosCiviles:any[];
  tiposTelefono:any[];
  permanencias:any[];
  zonasLaborales:any[];
  estudios:Estudio[];
  estudio:Estudio;
  dtOptionsEstudio: any = {};
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
    this.comboTeces();
    this.comboSexos();
    this.comboEstadosCiviles();
    this.comboTiposTelefono();
    this.comboPermanencias();
    this.comboZonasLaborales();
    this.idEstudio = 0;
    this.colaborador.ine=null;
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
  }
  enableSeguros(){
    this.textBoxDisabledSeg = false;
  }
  disableSeguros(){
    this.textBoxDisabledSeg = true;
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
    this.colaborador= {
      rfc:null,
      foto:null,
      nombre:null,
      a_paterno:null,
      a_materno:null,
      nss:null,
      ine:null,
      fecha_nacimiento:null,
      ldn_ciudad:null,
      ldn_pais:null,
      calle1:null,
      calle2:null,
      no_ext:null,
      no_int:null,
      colonia:null,
      ciudad:null,
      estado:null,
      pais:null,
      codigo_postal:null,
      comprobante:null,
      sexo:null,
      peso:null,
      tez:null,
      estado_civil:null,
      telefono1:null,
      telefono1_tipo:null,
      telefono2:null,
      telefono2_tipo:null,
      correo_electronico:null,
      sgmm:null,
      aseguradora:null,
      permanencia:null,
      atiende_covid:null,
      a_penales:null,
      disp_viajar:null,
      visa:null,
      num_visa:null,
      tipo_visa:null,
      fechaexp_visa:null,
      pasaporte:null,
      num_pasaporte:null,
      fechaexp_pasaporte:null,
      referencia:null,
      estatura:null,
      contacto1:null,
      parentesco_con1:null,
      telefono_con1:null,
      correo_con1:null,
      contacto2:null,
      parentesco_con2:null,
      telefono_con2:null,
      correo_con2:null,
      zona_laboral:null,
      auto_propio:null,
      estudios: []
    };
  }

  public onIneFileSelected(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.colaborador.ine=reader.result;
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
    }else{

    }

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

  editaEstudio(estudioTmp:any){
    this.estudio = estudioTmp;
  }

  borraEstudio(estudioTmp){

    this.estudios.forEach((element,index)=>{
      if(element.idEstudio==estudioTmp.idEstudio) delete this.estudios[index];
   });
   this.rerender();
  }

  public comboCalificaciones(){
    this.http.get<any>('/api/catalogo/calificaciones').subscribe(data => {
        console.log(data);
        this.calificaciones = data.data;
    });
  }

  public comboTeces(){
    this.http.get<any>('/api/catalogo/teces').subscribe(data => {
        console.log(data);
        this.teces = data.data;
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
