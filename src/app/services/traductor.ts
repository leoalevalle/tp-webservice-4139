import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Traductor {
  private baseUrl = 'https://google-translate113.p.rapidapi.com/api/v1/translator';
  private apiKey = '32b8af0ec7mshb2e8e5d3275f788p1659e4jsnc13fa1bb61f1';
  private apiHost = 'google-translate113.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
      'Content-Type': 'application/json'
    });
  }

  getIdiomasSoportados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/support-languages`, { headers: this.getHeaders() });
  }

  traducir(texto: string, idiomaDestino: string): Observable<any> {
    const body = {
      from: 'auto',
      to: idiomaDestino,
      text: texto
    };
    return this.http.post(`${this.baseUrl}/text`, body, { headers: this.getHeaders() });
  }
}