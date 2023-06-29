import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from '../models/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  url = 'http://localhost:4000/api/juegos';

  constructor(private http: HttpClient) { }

  getJuegos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerJuego(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  eliminarJuego(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  registrarJuego(juego: Juego): Observable<any> {
    return this.http.post(this.url, juego);
  }

  editarJuego(id: string, juego: Juego): Observable<any> {
    return this.http.put(`${this.url}/${id}`, juego);
  }
}
