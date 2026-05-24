import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrGenerator {
  constructor(private _http: HttpClient) {}

  public getQr(data: string, size: string): Observable<string> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'qr-code-generator20.p.rapidapi.com',
      'x-rapidapi-key': '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5',
    });

    return this._http
      .get(`https://qr-code-generator20.p.rapidapi.com/generatebasicbase64?data=${encodeURIComponent(data)}&size=${size}`, {
        headers,
        responseType: 'text', // 👈 necesario para que Angular lo trate como texto plano
      })
      .pipe(
        map((base64: string) => `data:image/png;base64,${base64}`) // 👈 lo convertimos a un src usable en <img>
      );
  }
}
