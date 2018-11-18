import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WebProject } from './web-design-project.model';

@Injectable()
export class WebDesignService {

  constructor(private http: HttpClient) { }

  projectUrl = 'https://portfolio.acidvoice.com/displayWebDesign.php';

  getProjects(): Observable<WebProject[]> {
    return this.http.get<WebProject[]>(this.projectUrl);
  }
}
