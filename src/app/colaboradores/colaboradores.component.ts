import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;

  dtOptions: any = {};
  colaborador:any=null;

  constructor(
              private router:Router
          ){  }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: '/api/colaborador',
      columns: [{
        title: 'ID',
        data: 'num_colaborador'
      }, {
        title: 'Nombre',
        data: 'nombre'
      }, {
        title: 'RFC',
        data: 'rfc'
      }],
      select: true,
      rowCallback: (row: Node, data: any | Object, index: number) => {
        
        const self = this;
        
        $('td', row).on('click', () => {
          if(self.colaborador !== null){
            if(self.colaborador.num_colaborador === data.num_colaborador){
              this.colaborador= null;
            } else{
              self.colaborador=data;
            }
          } else{
            self.colaborador=data;
          }
        });

        return row;
      }

    };
  }
 
  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  public agregarColaborador(){
    this.router.navigateByUrl("/colaborador");
  }
}
