import { Component } from '@angular/core';
import { MatPaginatorIntl,PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from './paginator/paginador/paginatorIntl.service';
import { DataSharingService } from './data-sharing-service/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}]
})

export class AppComponent {
  
  title = 'academy';
  alumnosPagina: number = 10; 
  paginaActual: number = 0; 
  totalPaginas: number = 0;
  totalAlumnos !: number;
  opcionesPagina: number[] = [5, 10, 20];

  constructor(private dataSharingService: DataSharingService) {

    this.dataSharingService.getAlumnosPorPaginaObservable().subscribe((total: number) => {
      this.totalAlumnos = total;
      console.log("APP COMPONENT TOTAL ALUMNOS --->"+this.totalAlumnos)
    });

  }

  onSelectChange(event: any): void {
    this.dataSharingService.setAlumnosPorPagina(event.value);
  }

  accionEventoPagina(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.alumnosPagina = event.pageSize; 
    this.dataSharingService.setAlumnosPorPagina(this.alumnosPagina);
  }

  seleccionarAlumnosPorPagina(event: any) {
    this.alumnosPagina = event.value;
    console.log("TOTAL ALUMNOS JOJO--->"+this.alumnosPagina)
  }

}
