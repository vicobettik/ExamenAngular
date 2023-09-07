import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/services/auth/interfaces/loginRequest';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm = this.formBuilder.group({
    email:['victor',[Validators.required]],
    password:['victor', Validators.required],
  })
  constructor(private formBuilder:FormBuilder
    , private router:Router
    , private loginService:LoginService) { }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest)
        .subscribe({
          next: (userdata) => {
            // console.log(userdata);
          },
          error: (err) => {
            // console.log(err);
            this.loginError = err;
          },
          complete: () => {
            console.log("login completo");
            this.router.navigateByUrl("/home");
            this.loginForm.reset();
          }
        })
    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("Error en el formulario");
    }
    
  }

  get email() { return this.loginForm.controls.email; }

get password() { return this.loginForm.controls.password; }

}
