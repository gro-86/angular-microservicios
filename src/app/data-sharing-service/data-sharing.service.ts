import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  
  private alumnosPorPaginaSubject = new Subject<number>();
  totalAlumnos: number = 0;

  constructor() {    
    this.alumnosPorPaginaSubject = new BehaviorSubject<number>(5);
  }
  
  setTotalAlumnos(total: number) {
    this.totalAlumnos = total;
  }

  getTotalAlumnos() {
    return this.totalAlumnos;
  }

  setAlumnosPorPagina(valor: number) {
    return this.alumnosPorPaginaSubject.next(valor);
  }

  getAlumnosPorPaginaObservable() {
    return this.alumnosPorPaginaSubject.asObservable();
  }

}


