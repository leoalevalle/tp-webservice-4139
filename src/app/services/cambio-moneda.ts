import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Currency {
  code: string;
  name: string;
}

export interface ConversionResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  result: number;
}

@Injectable({
  providedIn: 'root',
})

export class CambioMoneda {
  private baseUrl = 'https://api.apilayer.com/currency_data';
  private apiKey = 'IW8riOwKV08F0wG55xt0awjtmG2fca7B';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    const headers = new HttpHeaders({
      'apikey': this.apiKey
    });
    return this.http.get<any>(`${this.baseUrl}/list`, { headers }).pipe(
      map(response => {
        if (response.success) {
          return Object.entries(response.currencies).map(([code, name]) => ({
            code,
            name: name as string
          }));
        }
        return [];
      })
    );
  }

  convertCurrency(from: string, to: string, amount: number): Observable<ConversionResponse> {
    const headers = new HttpHeaders({
      'apikey': this.apiKey
    });
    return this.http.get<ConversionResponse>(
      `${this.baseUrl}/convert?from=${from}&to=${to}&amount=${amount}`,
      { headers }
    );
  }
} 