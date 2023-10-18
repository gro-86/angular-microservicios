import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curso} from '../entity/Curso';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private urlEndPoint: string = 'http://localhost:8090/api/cursos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private confirmacionBorrar = '¿Está seguro de querer borrar el curso ';
  private errorTitulo = 'Error';

  constructor(private http: HttpClient, private router: Router) { }



//GET ALL
mostrarCursos(): Observable<Curso[]> {
  return this.http.get(this.urlEndPoint).pipe(
    map(response => response as Curso[])
  );
}

// DELETE
borrarCurso(id: number, nombre: string): Observable<Curso> {
  return new Observable<Curso>((observador) => {
    Swal.fire({
      title: 'Confirmación',
      text: this.confirmacionBorrar+nombre+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SÍ',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<Curso>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).subscribe({
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
crearCurso(curso: Curso): Observable<Curso> {
  return this.http.post(this.urlEndPoint, curso, { headers: this.httpHeaders }).pipe(
    map((response: any) => response.curso as Curso),
    catchError((error) => this.handleError(error, 'Error al crear al curso'))
  );
}

// GET BY ID
mostrarCursoPorId(id: number): Observable<Curso> {
  return this.http.get<Curso>(`${this.urlEndPoint}/${id}`).pipe(
    catchError((error) => this.handleError(error, 'Error al mostrar'))
  );
}

// PUT
actualizarCurso(curso: Curso): Observable<any> {
  return this.http.put<any>(`${this.urlEndPoint}/${curso.id}`, curso, { headers: this.httpHeaders }).pipe(
    catchError((error) => this.handleError(error, 'Error al actualizar al curso'))
  );
}

//GET
obtenerCursosPorPagina(page: number, size: number): Observable<any> {
  const url = `${this.urlEndPoint}/obtenercursosPorPagina?page=${page}&size=${size}`;
  return this.http.get(url);
}

private handleError(error: any, mensaje: string): Observable<never> {
  this.mostrarError(mensaje, error);
  return throwError(() => error);
}

private mostrarError(titulo: string, mensaje: any): void {
  this.router.navigate(['/cursos']);
  console.error(mensaje);
  Swal.fire(this.errorTitulo, mensaje, 'error');
}






  
}