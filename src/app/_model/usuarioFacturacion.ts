export class UsuarioFacturacion {
    public idUsuarioFacturacion: number;
    public nombre: string;
    public a_paterno: string;
    public a_materno: string;
    public telefono: string;
    public correoElectronico: string;
    public calle1: string;
    public calle2: string;
    public noExt: string;
    public noInt: string;
    public codigoPostal: number;
    public idColonia: number;
    public idCiudad: number;
    public idEstado: number;
    public idPais: number;
    public idBanco: number;
    public tipoCuenta: string;
    public numeroCuenta: number;
    public clienteExistente: boolean;
    public clienteExistenteSelected: number;
    public validacionCorreoExistente: boolean;

    constructor() {
    }
}