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

  colonias:any[];
  ciudades:any[];
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
    this.comboColonias();
    this.comboCiudades();
    this.comboEstados();
    this.comboPaises();
    this.comboCalificaciones();
    this.comboTeces();
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
    this.http.get<any>('/api/catalogo/estadosCiviles').subscribe(data => {
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

  public comboCiudades(){
    this.http.get<any>('/api/catalogo/ciudades').subscribe(data => {
        console.log(data);
        this.ciudades = data.data;
    });
  }

  public comboEstados(){
    this.http.get<any>('/api/catalogo/estados').subscribe(data => {
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
}
