import { Estudio } from "./estudio";

export class Servicio {
    public idServicio: number;
    public idEstadoNacimiento: number;
    public idCiudadNacimiento: number;
    public fecha_nacimiento: Date;
    public edad: number;
    public codigoPostal: number;
    public idCiudad: number;
    public idEstado: number;
    public idColonia: number;
    public idSexo: number;
    public idEstadoCivil: number;
    public idTipoTelefono: number;
    public idTipoServicio: number;
    public idResponsable: number;
    public precioServicio: number;
    public cantidadPagada: number;
    public cantidadPorPagar: number;
    public estatus: string;
    public nombre: string;
    public a_paterno: string;
    public a_materno: string;
    public idPaisNacimiento: number;
    public calle1: string;
    public calle2: string;
    public noExt: string;
    public noInt: string;
    public idPais: number;
    public referenciaDireccion: string;
    public idComplexion: number;
    public peso: number;
    public estatura: number;
    public telefono: string;
    public correoElectronico: string;
    public idParentesco: number;
    public nombreMedico: string;
    public especialidadMedico: string;
    public telefonoMedico: string;
    public correoElectronicoMedico: string;
    public enfermedades: string;
    public procedimientos: string;
    public medicamentos: string;
    public notas: string;
    public tieneCovid: boolean;
    public tieneAlzheimer: boolean;
    public movimiento: boolean;
    public cliente: number;
    public colaboradores: any[];
    public colabReq: number;
    constructor() {
    }
}