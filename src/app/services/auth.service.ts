import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  //Con este metodo se pierde reactividad, ya que si se hace cambio del
  //usuario no se detectará en forma instantanea.
    getDataUser(){
      return this.user$.getValue();
    }


  login(email: string, password:string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    )
  }

  register(name: string,  email: string, password: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string,  email: string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, {
      email
    });
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {email})
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {token, newPassword})
  }

  getProfile() {
    //const token = this.tokenService.getToken()
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
      context: checkToken()
      /* headers: {
        Authorization: `Bearer ${token}`
      } */
    }).pipe(
      tap(user => {
        this.user$.next(user);
      })
    );
  }

  logout() {
    this.tokenService.removeToken();
  }


}
