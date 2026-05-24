import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Swift {
  constructor(private _http: HttpClient) {}

  public generateSpeech(text: string, voice: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
      'x-rapidapi-key': '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5',
    });

    const body = {
      model: 'tts-1',
      input: text,
      voice: voice
    };

    return this._http.post('https://open-ai-text-to-speech1.p.rapidapi.com/', body, {
      headers,
      responseType: 'blob'
    });
  }
}
