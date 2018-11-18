import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContactRequest } from './contact-request.model';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  contactUrl = 'https://portfolio.acidvoice.com/contactForm.php';

  postRequest(contactRequest: ContactRequest): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(this.contactUrl, contactRequest);
  }
}
