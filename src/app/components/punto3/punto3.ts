import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CambioMoneda, Currency } from '../../services/cambio-moneda';
@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto3.html',
  styleUrls: ['./punto3.css']
})
export class Punto3 implements OnInit{
  currencies: Currency[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 1;
  result: number | null = null;
  rate: number | null = null;
  loading = false;
  error = false;
  errorMessage = '';

  constructor(
    private currencyService: CambioMoneda,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
        if (data.length > 0) {

          const tieneARS = data.find(c => c.code === 'ARS');
          const tieneUSD = data.find(c => c.code === 'USD');
          this.fromCurrency = tieneARS ? 'ARS' : data[0].code;
          this.toCurrency = tieneUSD ? 'USD' : (data[1]?.code || data[0].code);
        }
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading currencies:', err);
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Error al cargar las monedas disponibles';
        this.cd.detectChanges();
      }
    });
  }

  convert(): void {
    if (!this.fromCurrency || !this.toCurrency || !this.amount) {
      this.error = true;
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }

    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.currencyService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe({
      next: (response) => {
        if (response.success) {
          this.result = response.result;
          this.rate = response.info.rate;
        } else {
          this.error = true;
          this.errorMessage = 'Error en la conversión';
        }
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error converting currency:', err);
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Error al realizar la conversión';
        this.cd.detectChanges();
      }
    });
  }

  swapCurrencies(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    if (this.amount) {
      this.convert();
    }
  }
}
