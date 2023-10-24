import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(
    private snack: MatSnackBar, 
    private loginService:LoginService, 
    private router:Router) { }


  ngOnInit(): void {
    
  }

  formSubmit(){
    if(this.loginData.username.trim()== '' || this.loginData.username.trim()== null){
      this.snack.open('El nombre de usuario es requerido', 'Aceptar', 
      {duration:3000});
      return;
    }
    if(this.loginData.password.trim()== '' || this.loginData.password.trim()== null){
      this.snack.open('La contraseña es requerida', 'Aceptar', 
      {duration:3000});
      return;
    }

    console.log(this.loginData)
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user); 
          if(this.loginService.getUserRoles() == "ADMIN"){
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          }else if(this.loginService.getUserRoles() == "NORMAL"){
            this.router.navigate(['tutoriales']);
            this.loginService.loginStatusSubject.next(true);
          }else{
            this.loginService.logout();
          }
        })
      },(error: any) => {
        console.log(error);
        this.snack.open('Detalles invalidos, vuelve a intentarlo','Aceptar', {duration: 3000});  
      }
    )
  }

}
