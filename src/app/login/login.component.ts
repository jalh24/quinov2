import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:any ={
    correo: null,
    password: null
  }
  constructor(private authService:AuthService, private router: Router,) { }

  ngOnInit(): void {
  }

  public enviar(){
    this.authService.login(this.login.correo,this.login.password).subscribe(
      data=>{
        if(data.refreshToken){
          localStorage.setItem('token', data.refreshToken);
          this.router.navigateByUrl("/dashboard");
        } else{
          alert("Error contraseña equivocada");
        }
      }
    );

    console.log(this.login);
  }
}
