import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../models/juego';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-juegos',
  templateUrl: './listar-juegos.component.html',
  styleUrls: ['./listar-juegos.component.css']
})
export class ListarJuegosComponent implements OnInit {
  listarJuegos: Juego[] = [];
  juego: any;

  constructor(private _juegoService: JuegoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerJUEGOS();
  }

  obtenerJUEGOS() {
    this._juegoService.getJuegos().subscribe(
      data => {
        this.listarJuegos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarJuego(id: any) {
    this._juegoService.eliminarJuego(id).subscribe(
      data => {
        this.toastr.error('Juego eliminado con éxito', id);
        this.obtenerJUEGOS();
      },
      error => {
        console.log(error);
      }
    );
  }
}
