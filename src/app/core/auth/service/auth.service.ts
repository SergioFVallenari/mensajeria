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
}
