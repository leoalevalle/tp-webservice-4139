import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardMaker } from '../../services/card-maker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css',
})

export class Punto2 implements OnInit{
  marcas: any[] = [];
  marcasFiltradas: any[] = [];
  modelos: any[] = [];
  cargando: boolean = true;
  cargandoModelos: boolean = false;
  marcaSeleccionada: string = '';
  terminoBusqueda: string = '';

  constructor(
    private autosService: CardMaker,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas() {
    this.autosService.getMarcaAutos().subscribe(
      result => {
        this.marcas = result;
        this.marcasFiltradas = result;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error => {
        console.log(error);
        this.cargando = false;
        this.cd.detectChanges();
      }
    );
  }

  filtrarMarcas() {
    if (!this.terminoBusqueda.trim()) {
      this.marcasFiltradas = this.marcas;
    } else {
      const termino = this.terminoBusqueda.toLowerCase();
      this.marcasFiltradas = this.marcas.filter(marca => 
        marca.name.toLowerCase().includes(termino)
      );
    }
  }

  abrirModal(marca: any) {
    this.marcaSeleccionada = marca.name;
    this.cargandoModelos = true;
    this.modelos = [];

    this.autosService.getMarcaDetalle(marca.id).subscribe(
      res => {
        this.modelos = res;
        this.cargandoModelos = false;
        this.cd.detectChanges();
        const modal = new (window as any).bootstrap.Modal(document.getElementById('modelosModal'));
        modal.show();
      },
      err => {
        console.error(err);
        this.cargandoModelos = false;
        this.cd.detectChanges();
      }
    );
  }
}
