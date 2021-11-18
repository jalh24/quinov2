import { Banco } from "./banco";

export class Pago {
    public idPago:number;
    public nombre:string;
    public banco:Banco;
    public tipoCuenta:string;
    public numero:number;
    public comprobantePago:any;
    public comprobantePagoNombre:string;
    constructor() {
    }
}            