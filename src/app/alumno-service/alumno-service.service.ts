import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../alumno/entity/Alumno';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export default class AlumnoService {

  private urlEndPoint: string = 'http://localhost:8090/api/alumnos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private confirmacionBorrar = '¿Está seguro de querer borrar al alumno ';
  private errorTitulo = 'Error';

  constructor(private http: HttpClient, private router: Router) { }

  //GET ALL
  mostrarAlumnos(): Observable<Alumno[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Alumno[])
    );
  }

  // DELETE
  borrarAlumno(id: number, nombre: string): Observable<Alumno> {
    return new Observable<Alumno>((observador) => {
      Swal.fire({
        title: 'Confirmación',
        text: this.confirmacionBorrar+nombre+"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SÍ',
        cancelButtonText: 'CANCELAR'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete<Alumno>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).subscribe({
            next: (response) => {
              observador.next(response);
              observador.complete();
            },
            error: (error) => {
              this.mostrarError('Error en la consulta de borrado', error);
              observador.error(error);
            }
          });
        } else {
          observador.complete();
        }
      });
    });
  }

  // POST
  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post(this.urlEndPoint, alumno, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.alumno as Alumno),
      catchError((error) => this.handleError(error, 'Error al crear al alumno'))
    );
  }

  // GET BY ID
  mostrarAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((error) => this.handleError(error, 'Error al mostrar'))
    );
  }

  // PUT
  actualizarAlumno(alumno: Alumno): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${alumno.id}`, alumno, { headers: this.httpHeaders }).pipe(
      catchError((error) => this.handleError(error, 'Error al actualizar al alumno'))
    );
  }

  //GET
  obtenerAlumnosPorPagina(page: number, size: number): Observable<any> {
    const url = `${this.urlEndPoint}/obtenerAlumnosPorPagina?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  private handleError(error: any, mensaje: string): Observable<never> {
    this.mostrarError(mensaje, error);
    return throwError(() => error);
  }

  private mostrarError(titulo: string, mensaje: any): void {
    this.router.navigate(['/alumnos']);
    console.error(mensaje);
    Swal.fire(this.errorTitulo, mensaje, 'error');
  }
}