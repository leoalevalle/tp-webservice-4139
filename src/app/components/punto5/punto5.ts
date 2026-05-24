import { Component, ChangeDetectorRef} from '@angular/core';
import { QrGenerator } from '../../services/qr-generator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto5',
  imports: [CommonModule,FormsModule],
  templateUrl: './punto5.html',
  styleUrl: './punto5.css',
})
export class Punto5 {
  texto = '';
  qrImg!: string;
  isLoading = false;

  constructor(
    private qrService: QrGenerator,
    private cd: ChangeDetectorRef
  ) {}

  obtenerQr() {
    this.isLoading = true;
    this.qrImg = '';
    this.qrService.getQr(this.texto, '500').subscribe((base64Img) => {
      this.qrImg = base64Img;
      this.isLoading = false;
      this.cd.detectChanges();
    });
  }
}