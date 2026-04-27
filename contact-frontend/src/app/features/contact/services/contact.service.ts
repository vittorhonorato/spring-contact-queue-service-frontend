import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {API_CONFIG} from '../../../core/api/api.config';
import { ContactRequest } from '../models/contact-request.model';
import { Observable } from 'rxjs';
import { ContactResponse } from '../models/contact-response.model';
import { ContactDetailsResponse } from '../models/contact-details-response';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly baseUrl = API_CONFIG.baseUrl;

  constructor(private readonly http: HttpClient) { }

  postContact(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${API_CONFIG.baseUrl}/sender-email/send`, payload);
  };

  getContact(): Observable<ContactDetailsResponse[]> {
    return this.http.get<ContactDetailsResponse[]>(`${this.baseUrl}/sender-email`);
  };

  getContactById(id: string): Observable<ContactDetailsResponse> {
    return this.http.get<ContactDetailsResponse>(`${this.baseUrl}/sender-email/${id}`);
  };

  getContactByEmail(email: string): Observable<ContactDetailsResponse | ContactDetailsResponse[]> {
    const normalizedEmail = email.trim();
    const params = new HttpParams().set('email', normalizedEmail);

    return this.http.get<ContactDetailsResponse | ContactDetailsResponse[]>(
      `${this.baseUrl}/sender-email`,
      {params}
    )
  }
}
