import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Juego } from '../../models/juego';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent implements OnInit {
  juegoForm: FormGroup;
  titulo = 'Crear Juego';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private juegoService: JuegoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.juegoForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      director: ['', Validators.required],
      anio: ['', Validators.required]
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id') || null;
  }

  agregarJuego() {
    const juego: Juego = {
      nombre: this.juegoForm.get('nombre')?.value,
      genero: this.juegoForm.get('genero')?.value,
      director: this.juegoForm.get('director')?.value,
      anio: this.juegoForm.get('anio')?.value
    }
    if (this.id !== null) {
      // Editar juego
      this.juegoService.editarJuego(this.id, juego).subscribe(
        data => {
          this.toastr.success(juego.nombre, 'Juego actualizado');
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.juegoForm.reset();
        }
      );
    } else {
      // Agregar juego
      this.juegoService.registrarJuego(juego).subscribe(
        data => {
          this.toastr.success(juego.nombre, 'Juego registrado');
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.juegoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Juego';
      this.juegoService.obtenerJuego(this.id).subscribe(data => {
        this.juegoForm.patchValue({
          nombre: data.nombre,
          genero: data.genero,
          director: data.director,
          anio: data.anio
        });
      });
    }
  }

  ngOnInit(): void {
    this.esEditar();
  }
}
