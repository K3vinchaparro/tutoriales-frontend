import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn = false;
  user:any = null;
  credencialesValidas = false;

  constructor(
    public loginService:LoginService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.loginService.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
        console.log(this.isLoggedIn)
      }
    )
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();

    
  }

  public logout(){
    this.loginService.logout();
    window.location.reload();
  }

  irAlDashboardSegunRol(){
    if(this.loginService.getUserRoles() == "Administrador"){
      this.router.navigate(['admin']);
    }
  }

}
