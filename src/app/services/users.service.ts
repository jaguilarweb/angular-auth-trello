import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getUser(){
    const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



}
