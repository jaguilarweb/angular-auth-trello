import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwtDecode, {JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    //Expires: Fecha de validez de la cookie, no del token.
    setCookie('token-trello', token, { expires: 365, path: '/'});
  }

  getToken(){
    const token = getCookie('token-trello');
    return token;
  }

  removeToken(){
    removeCookie('token-trello');
  }

  isValidToken(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

}
