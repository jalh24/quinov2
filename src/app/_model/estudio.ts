import { Estatus } from "./estatus";

export class Estudio {
    public idEstudio:number;
    public idColaborador:number;
    public institucion:string;
    public fechaInicio:any;
    public fechaFin:any;
    public estatus:Estatus;
    public cedula:any;
    public cedulaNombre:string;
    public comentarios:string;
    constructor() {
    }
}            