import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { User } from 'src/app/services/auth/interfaces/user';
import {Router} from "@angular/router"

@Component({
  selector: 'shared-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  isLoged:boolean = false;
  userData?:User;

  constructor(private loginService:LoginService
            , private router: Router){
    
  }

  ngOnInit(): void {
    console.log("oninit");
    this.loginService.isLoged.subscribe(
      {
        next:(loged) => {
          this.isLoged = loged;
        }
      }
    )

    this.loginService.userData.subscribe(
      {
        next:(userData) => {
          this.userData = userData;
        }
      }
    )
  }

  ngOnDestroy(): void {
    console.log("destroy")
      this.loginService.currentUserData.unsubscribe();
      this.loginService.currentUserLoged.unsubscribe();
      this.loginService.deleteLocalStorage();
  }

  logout(){
    this.loginService.deleteLocalStorage();
    this.router.navigate([''])
  }

}
