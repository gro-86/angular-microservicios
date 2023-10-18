
import { Component } from '@angular/core';
import AlumnoService  from '../../alumno-service/alumno-service.service';
import { Router } from '@angular/router';
import { Alumno } from '../entity/Alumno';
import { DataSharingService } from '../../data-sharing-service/data-sharing.service';
import { AppComponent } from 'src/app/app.component';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-mostrar-alumnos',
  templateUrl: './mostrar-alumnos.component.html',
  styleUrls: ['./mostrar-alumnos.component.css']
})

export class MostrarAlumnosComponent {


  message!: string

  //PAGINADOR
  alumnos!: Alumno[]
  //alumnosPagina!: number; 
  //paginaActual!: number; 
  //totalPaginas!: number;
  
  alumnosPagina: number = 0; 
  paginaActual: number = 0; 
  totalPaginas: number = 0;

  /**Para evitar errores CORS con POSTMAN no olvides añadir un header de tipo
  * Origin con la ruta http://localhost:4200.
  */
  constructor(private alumnoServicio: AlumnoService, private router: Router, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {

    
    //this.obtenerAlumnosPorPagina(this.paginaActual, this.alumnosPagina);
    //this.refrescarAlumnos();
    
    this.dataSharingService.getAlumnosPorPaginaObservable().subscribe((alumnosPorPagina: number) => {
      this.alumnosPagina = alumnosPorPagina;
      this.obtenerAlumnosPorPagina(this.paginaActual, this.alumnosPagina);
    }); 
   
  }

  //DELETE
  borrarAlumno(id: number,nombre: string){

    this.alumnoServicio.borrarAlumno(id,nombre).subscribe({
      next: (response: Object) => {
        console.log(response);
        this.message = `¡Alumno borrado con éxito!`;
        this.refrescarAlumnos();
      }
    });

  } 

  //UPDATE
  actualizarAlumno(id: number){
    console.log(`Actualizar alumno${id}`)
    this.router.navigate(['alumnos',id]);

  }

  //REFRESH
  refrescarAlumnos(){
    this.alumnoServicio.mostrarAlumnos().subscribe({
      next: (response: Object) => {
        this.alumnos = response as Alumno []
        this.dataSharingService.setTotalAlumnos(this.alumnos.length);
        console.log(response);
      },
      error: (error: Error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log('');
      } }); 
  }

  //CREATE
  crearAlumno(){
  this.router.navigate(['alumnos',-1])
  }

  //CAMBIAR PAGINA
  paginaCambiada(event: any): void {
    this.paginaActual = event.page;
  }

 
  manejarEventoPagina(accion: string): void {
    switch (accion) {
      case 'anterior':
  
        if(this.paginaActual>0){
          this.paginaActual=this.paginaActual-1;
        }
        break;
      case 'siguiente':
        if(this.paginaActual<this.totalPaginas){
          this.paginaActual=this.paginaActual+1;
        }
        
        break;
      case 'ultimo':
       this.paginaActual=this.totalPaginas;
        break;
      default:
        
        break;
    }
  } 

  //GET ALUMNOS POR PAGINAS
  obtenerAlumnosPorPagina(pagina: number, tamanio: number): void {
    this.alumnoServicio.obtenerAlumnosPorPagina(pagina, tamanio).subscribe({
      next: (response: any) => {
        this.alumnos = response.content; // Los datos paginados
        this.totalPaginas = response.totalPages; // El número total de páginas
        console.log("Combo - Página: "+this.totalPaginas,"Tamaño: "+ this.alumnos.length)
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    });
  }
  
}
