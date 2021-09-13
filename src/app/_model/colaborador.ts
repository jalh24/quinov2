import { Estudio } from "./estudio";

export class Colaborador {
    public rfc:string;
    public foto:any;
    public nombre:string;
    public a_paterno:string;
    public a_materno:string;
    public nss:string;
    public ine:any;
    public fecha_nacimiento:any;
    public ldn_ciudad:string;
    public ldn_pais:string;
    public calle1:string;
    public calle2:string;
    public no_ext:string;
    public no_int:string;
    public colonia:string;
    public ciudad:string;
    public estado:string;
    public pais:string;
    public codigo_postal:string;
    public comprobante:any;
    public sexo:string;
    public peso:string;
    public tez:string;
    public estado_civil:string;
    public telefono1:string;
    public telefono1_tipo:string;
    public telefono2:string;
    public telefono2_tipo:string;
    public correo_electronico:string;
    public sgmm:string;
    public aseguradora:string;
    public permanencia:string;
    public atiende_covid:string;
    public a_penales:string;
    public disp_viajar:string;
    public visa:string;
    public num_visa:string;
    public tipo_visa:string;
    public fechaexp_visa:string;
    public pasaporte:string;
    public num_pasaporte:string;
    public fechaexp_pasaporte:string;
    public referencia:string;
    public estatura:string;
    public contacto1:string;
    public parentesco_con1:string;
    public telefono_con1:string;
    public correo_con1:string;
    public contacto2:string;
    public parentesco_con2:string;
    public telefono_con2:string;
    public correo_con2:string;
    public zona_laboral:string;
    public auto_propio:string;
    public estudios:Estudio[];
    
    constructor() {
    }
}            