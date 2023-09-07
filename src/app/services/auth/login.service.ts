import { Injectable } from '@angular/core';
import { LoginRequest } from './interfaces/loginRequest';
import { HttpClient, HttpErrorResponse, JsonpInterceptor } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'https://localhost:7063/User';
  currentUserLoged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, username:""});
  


  constructor(private http:HttpClient) {
    const lsUserData = localStorage.getItem('userData');
    if(lsUserData){
      this.currentUserData.next(JSON.parse(lsUserData));
    }
    const lsLoged = localStorage.getItem('Loged');
    if(lsLoged){
      this.currentUserLoged.next(JSON.parse(lsLoged));
    }
   }

  login(credenciales:LoginRequest):Observable<User> {
    return this.http.post<User>(this.url, credenciales)
    .pipe(
      tap((userData) => {
        this.currentUserLoged.next(true);
        this.currentUserData.next(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('Loged', JSON.stringify(true));
      }),
      catchError(this.handleError)
      );
  }

  private handleError(error:HttpErrorResponse){
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    }
    else {
      console.error('Backend retorno el codigo de estado', error.status, error.error);
    }
    return throwError(() => new Error('Algo fallo, por favor intente nuevamente.'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get isLoged():Observable<boolean>{
    return this.currentUserLoged.asObservable();
  }

}
