import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../../core/api/api.config';
import { ContactRequest } from '../models/contact-request.model';
import { Observable } from 'rxjs';
import { ContactResponse } from '../models/contact-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly baseUrl = `${API_CONFIG}`;

  constructor(private readonly http: HttpClient) { }

  postContact(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${API_CONFIG.baseUrl}/sender-email/send`, payload);
  };
}
