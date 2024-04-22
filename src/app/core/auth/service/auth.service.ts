import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../shared/constants/endpoints.constants';
import { Session, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  loginUser(data:User):Observable<User>{
    return this.http.post<User>(`${ENDPOINTS.api}/auth/login`, data)
  }

  isLoggedIn() {
    return !!localStorage.getItem('sessionMensajeria'); // Si encuentra el item de sessionMensajeria en localStorage, te devuelve un true
    
  }

}
