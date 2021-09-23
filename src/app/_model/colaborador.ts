import { Estudio } from "./estudio";

export class Colaborador {
    public idColaborador:number;
    public nombre:string;
    public a_paterno:string;
    public a_materno:string;
    public correoElectronico:string;
    public foto:any;
    public rfc:string;
    public nss:string;
    public fecha_nacimiento:Date;
    public idSexo:number;
    public peso:number;
    public estatura:number;
    public idZonaLaboral:number;
    public idEstadoCivil:number;
    public idTez:number;
    public sgmm:string;
    public atiendeCovid:boolean;
    public antecedentePenales:boolean;
    public autoPropio:boolean;
    public dispuestoViajar:boolean;
    public visa:boolean;
    public visaNumero:string;
    public tipoVisa:number;
    public expiracionVisa:Date;
    public visaImagen:any;
    public pasaporte:boolean;
    public pasaporteNumero:string;
    public expiracionPasaporte:Date;
    public pasaporteImagen:any;
    public ine1:any;
    public ine2:any;
    public idEstatus:number;
    public calle1:string;
    public calle2:string;
    public codigoPostal:number;
    public idPais:number;
    public idEstado:number;
    public idCiudad:number;
    public idColonia:number;
    public noExt:string;
    public noInt:string;
    public horario:any;
    
    constructor() {
    }
}            