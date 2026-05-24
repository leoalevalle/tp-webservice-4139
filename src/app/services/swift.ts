import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class Swift {
  constructor(private http: HttpClient) { }
  convert(text: string): Observable<Blob> {
    let httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '6281753bbamsh380fb4ed58a8798p1521d3jsne4a4453ad3b5',
        'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'blob'
    }
    let body = {
      "model": "tts-1",
      "input": text,
      "instructions": "Speak in a lively and optimistic tone.",
      "voice": "alloy"
    }

    return this.http.post('https://open-ai-text-to-speech1.p.rapidapi.com/', body, httpOptions);
  }

}
