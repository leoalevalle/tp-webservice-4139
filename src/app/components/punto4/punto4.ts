import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Swift } from '../../services/swift';

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto4.html',
  styleUrl: './punto4.css'
})
export class Punto4 {
  // Referencia al elemento <audio> en el HTML
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  texto: string = '';
  vozSeleccionada: string = 'alloy';
  audioUrl: SafeUrl | null = null;
  rawUrl: string | null = null; // Guardamos la URL sin sanitizar para limpieza
  cargando: boolean = false;

  // Voces disponibles en OpenAI TTS
  voces = [
    { id: 'alloy', nombre: 'Alloy (Neutral)' },
    { id: 'echo', nombre: 'Echo (Masculina)' },
    { id: 'fable', nombre: 'Fable (Narrativa)' },
    { id: 'onyx', nombre: 'Onyx (Robusta)' },
    { id: 'nova', nombre: 'Nova (Femenina)' },
    { id: 'shimmer', nombre: 'Shimmer (Clara)' }
  ];

  constructor(
    private swiftService: Swift,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {}

  convertirTextoAAudio() {
    if (!this.texto.trim()) return;

    // Limpiar recursos anteriores
    if (this.rawUrl) {
      URL.revokeObjectURL(this.rawUrl);
    }

    this.cargando = true;
    this.audioUrl = null;
    this.rawUrl = null;
    this.cd.detectChanges();

    this.swiftService.generateSpeech(this.texto, this.vozSeleccionada).subscribe({
      next: (blob: Blob) => {
        // Si el blob es muy pequeño (ej. < 500 bytes), probablemente sea un mensaje de error JSON
        if (blob.size < 500) {
          blob.text().then(text => {
            try {
              const errorInfo = JSON.parse(text);
              console.error('La API devolvió un error en lugar de audio:', errorInfo);
            } catch (e) { /* No es JSON */ }
          });
          return;
        }

        this.rawUrl = URL.createObjectURL(blob);
        // Usamos bypassSecurityTrustUrl para mejor compatibilidad con etiquetas de audio
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawUrl);
        this.cargando = false;
        this.cd.detectChanges(); // Forzamos la detección para mostrar el audio al primer clic

        // Forzar al navegador a cargar el nuevo flujo de audio
        if (this.audioPlayer) {
          this.audioPlayer.nativeElement.load();
        }
      },
      error: (err) => {
        console.error('Error al generar audio:', err);
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }
}