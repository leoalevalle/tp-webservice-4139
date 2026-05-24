import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Peliculas {private url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  private key = '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5';
  private host = 'imdb-top-100-movies.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  getTopPeliculas(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.key,
      'x-rapidapi-host': this.host
    });

    return this.http.get<any[]>(this.url, { headers });
  }
}