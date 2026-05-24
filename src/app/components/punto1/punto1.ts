import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Peliculas } from '../../services/peliculas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrl: './punto1.css',
})

export class Punto1 implements OnInit {peliculas: any[] = [];
  loading: boolean = true;

  constructor(
    private peliculaService: Peliculas,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.peliculaService.getTopPeliculas().subscribe({
    next: (data) => {
      this.peliculas = data.map(peli => {
        return {
          ...peli,
          image: peli.image && peli.image !== '' ? peli.image : 'https://placehold.jp/24/3e8ed0/ffffff/400x600.png?text=Sin+Imagen'
        };
      });
      this.loading = false;
      this.cd.detectChanges();
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
      this.cd.detectChanges();
    }
  });
}
}