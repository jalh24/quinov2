import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUserNurse, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quino';
  faCoffee = faCoffee;
  faSignOutAlt = faSignOutAlt;
  activeSesion;

  constructor(private router: Router,) { 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.activeSesion= true;
    } else{
      this.activeSesion= false;
    }
  }

  singOut(){
    localStorage.removeItem('token');
    this.activeSesion= false;
    this.router.navigateByUrl("/");
  }
}
