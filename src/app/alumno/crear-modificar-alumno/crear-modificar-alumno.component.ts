import { Component,OnInit} from '@angular/core';
import AlumnoService  from '../../alumno-service/alumno-service.service';
import {Alumno}  from '../entity/Alumno';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-alumno',
  templateUrl: './crear-modificar-alumno.component.html',
  styleUrls: ['./crear-modificar-alumno.component.css']
})
export class CrearModificarAlumnoComponent implements OnInit {


  protected alumno: Alumno = new Alumno();
  protected titulo!: string;
  protected nombreBoton!: string;
  protected modificado: boolean = false;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.alumnoLoad();
  }

  //GET
  public alumnoLoad():void {
    this.activatedRoute.params.subscribe(
      params=>{
        let id = params['id']
        this.nombreBoton="EDITAR";
        if(id!=-1){
          this.modificado = true;
          this.titulo="Modificar Alumno";
          this.alumnoService.mostrarAlumnoPorId(id).subscribe(
            (alumno) => this.alumno = alumno
          )
        }else{
          this.titulo="Crear Alumno";
          this.nombreBoton="GUARDAR";
        }
      }
    )
  }

  //POST
  /** 
  public crearAlumno(): void {
    
    this.alumnoService.crearAlumno(this.alumno)
    .subscribe(
      alumno =>{ 
        this.router.navigate([['/alumnos']])
        Swal.fire('Nuevo Alumno', `El alumno: ${alumno.nombre} se ha creado con éxito.`, 'success');
      }
    )

  }*/

  //POST
public crearAlumno(): void {
  
  this.alumnoService.crearAlumno(this.alumno)
  .subscribe({
    next: (response: Alumno) => {
      if (response) {
        this.router.navigate([['/alumnos']]);
        Swal.fire('Alumno creado', `El alumno: ${response.nombre} se ha creado con éxito.`, 'success');
      } else {
        // Manejar el caso en el que no se reciba una respuesta válida
        // Puedes mostrar un mensaje de error o realizar otra acción apropiada.
        console.error('Respuesta inválida del servidor:', response);
        
      }
    },
    error: (error) => {
      // Manejar errores si ocurren durante la llamada al servicio
      console.error('Error al modificarr el alumno:', error);
    }
  });
}

/**
 * 
 * this.alumnoService.crearAlumno(this.alumno).subscribe({
  next: (response: AlumnoResponse) => {
    this.router.navigate([['/alumnos']]);
    Swal.fire('Nuevo Alumno', `El alumno: ${response.nombre} se ha creado con éxito.`, 'success');
  }
});
 * 
 */


  //PUT
  /** 
  public actualizarAlumno(): void{
    this.alumnoService.actualizarAlumno(this.alumno)
    .subscribe(json => {
          this.router.navigate(['/alumnos'])
          Swal.fire(
            'Alumno Actualizado',`${json.mensaje}: ${json.alumno.nombre}`,'success'
          )
      }
    )
  }*/

  public actualizarAlumno(): void{

    this.alumnoService.actualizarAlumno(this.alumno)
  .subscribe({
    next: (response: Alumno) => {
      if (response) {
        this.router.navigate([['/alumnos']]);
        Swal.fire('Alumno Modificado', `El alumno: ${response.nombre} se ha modificado con éxito.`, 'success');
      } else {
        // Manejar el caso en el que no se reciba una respuesta válida
        // Puedes mostrar un mensaje de error o realizar otra acción apropiada.
        console.error('Respuesta inválida del servidor:', response);
        
      }
    },
    error: (error) => {
      // Manejar errores si ocurren durante la llamada al servicio
      console.error('Error al modificarr el alumno:', error);
    }
  });
  
  }

  

}
