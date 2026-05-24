import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Swift } from '../../services/swift';
import { Traductor } from '../../services/traductor';

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto4.html',
  styleUrl: './punto4.css'
})
export class Punto4 implements OnInit{

  textoOriginal: string = '';
  textoTraducido: string = '';
  
  idiomas: any[] = []; 
  idiomaSeleccionado: string = 'en';

  @ViewChild('reproductor') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private audioService: Swift, 
    private traductorService: Traductor,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.traductorService.getIdiomasSoportados().subscribe({
      next: (data) => {
        this.idiomas = data.filter((lang: any) => lang.code !== 'auto'); 
      },
      error: (err) => console.log('Error cargando idiomas:', err)
    });
  }

  traducirTexto() {
    if (!this.textoOriginal) return;

    this.traductorService.traducir(this.textoOriginal, this.idiomaSeleccionado).subscribe({
      next: (data) => {
        this.textoTraducido = data.trans; 
        this.changeDetector.detectChanges();
      },
      error: (err) => console.log('Error traduciendo:', err)
    });
  }

  convertirAudio() {
    let textoFinal = this.textoTraducido ? this.textoTraducido : this.textoOriginal;

    this.audioService.convert(textoFinal).subscribe({
      next: (data) => {
        let objectURL = URL.createObjectURL(data);
        if (this.audioPlayer) {
          this.audioPlayer.nativeElement.src = objectURL;
          this.audioPlayer.nativeElement.play();
        }
        this.changeDetector.detectChanges();
      },
      error: (err) => console.log('Error convirtiendo a audio:', err)
    });
  }
}