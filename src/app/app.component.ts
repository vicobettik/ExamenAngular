import { Component, HostListener } from '@angular/core';
import { LoginService } from './services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';

  constructor(private loginService: LoginService) {}

  @HostListener('window:unload', [ '$event' ])
   beforeunloadhandler(event:void) {
   this.loginService.deleteLocalStorage();
   return false;   
  }
  unloadhandler(event:void) {
    this.loginService.deleteLocalStorage();
    
  }
}
