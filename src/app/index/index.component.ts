import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserNurse, faBookMedical, faUserInjured, faAddressBook, faBriefcaseMedical, faUserCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  faUserNurse = faUserNurse;
  faUserInjured = faUserInjured;
  faBookMedical = faBookMedical;
  faAddressBook = faAddressBook;
  faBriefcaseMedical = faBriefcaseMedical;
  faUserCog = faUserCog;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public botonAltaColaboradores() {
    this.router.navigateByUrl("/colaborador");
  }

  public botonConsultaColaboradores() {
    this.router.navigateByUrl("/colaboradores");
  }

}
