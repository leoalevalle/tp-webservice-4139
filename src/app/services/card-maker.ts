import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardMaker {

  constructor(private _http: HttpClient) { 

  }

  public getMarcaAutos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5',
      }),
    };
    return this._http.get('https://car-specs.p.rapidapi.com/v2/cars/makes',httpOptions);
  }

  public getMarcaDetalle(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5',
      }),
    };
    return this._http.get(`https://car-specs.p.rapidapi.com/v2/cars/makes/${id}/models`, httpOptions);
  }
}
