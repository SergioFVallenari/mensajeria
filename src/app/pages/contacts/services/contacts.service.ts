import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../shared/constants/endpoints.constants';
import { Observable } from 'rxjs';
import { Contacts } from '../interface/contacts.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) {}
  
  getContacts():Observable<Contacts[]>{
   return this.http.get<Contacts[]>(`${ENDPOINTS.api}/contacts`)
  }

  postContacts(data:Contacts):Observable<Contacts>{
    return this.http.post<Contacts>(`${ENDPOINTS.api}/contacts`,data)
   }

   deleteContacts(data:string):Observable<Contacts>{
    return this.http.delete<Contacts>(`${ENDPOINTS.api}/contacts/${data}`)
   }

   editContacts(data:Contacts, _id:string):Observable<Contacts>{
    return this.http.patch<Contacts>(`${ENDPOINTS.api}/contacts/${_id}`, data)
   }
}
