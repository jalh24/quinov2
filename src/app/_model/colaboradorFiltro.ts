import { Estudio } from "./estudio";

export class ColaboradorFiltro {
    
    public edad1:number;
    public edad2:number;
    public peso1:number;
    public peso2:number;
    public genero:number;
    public estatura1:number;
    public estatura2:string;
    public nombre: string;
    public calificacion1:number;
    public calificacion2:number;
    public permanencia:number;
    public tipoColaborador:number;
    public zonasLaborales:[];
    public diasLaborales:any[];
    public turnoHorario:string;
    public atiendeCovid:boolean;
    public antecedentePenales:boolean;
    public autoPropio:boolean;
    public dispuestoViajar:boolean;
    public especialidades:any[];
    public habilidades:any[];
    public limit:number;
    public start:number;
    public hijos:boolean;
    public hijosViven:boolean;
    public hacerComer:boolean;
    public limpiarUtensiliosCocina:boolean;
    public limpiarDormitorio:boolean;
    public limpiarBano:boolean;
    public ayudaPaciente:boolean;
    constructor() {
    }
}            