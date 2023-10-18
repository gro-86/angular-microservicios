import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MostrarAlumnosComponent } from './alumno/mostrar-alumnos/mostrar-alumnos.component';
import { CrearModificarAlumnoComponent } from './alumno/crear-modificar-alumno/crear-modificar-alumno.component';
import { EliminarAlumnoComponent } from './alumno/eliminar-alumno/eliminar-alumno.component';
import { CrearModificarCursoComponent } from './curso/crear-modificar-curso/crear-modificar-curso.component';
import { EliminarCursoComponent } from './curso/eliminar-curso/eliminar-curso.component';
import { MostrarCursosComponent } from './curso/mostrar-cursos/mostrar-cursos.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule} from '@angular/material/paginator'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaginadorComponent } from './paginator/paginador/paginador.component'
import { MatSelectModule } from '@angular/material/select';




const routes: Routes = [
  {path:'', component: MostrarAlumnosComponent}, //RouteGuideService activará rutas si estás logeado
  {path:'alumnos', component: MostrarAlumnosComponent}, //Activar la ruta
  {path:'alumnos/:id', component: CrearModificarAlumnoComponent},
  {path:'cursos', component: MostrarCursosComponent}, //Activar la ruta
  {path:'cursos/:id', component: CrearModificarCursoComponent},
  {path:'**', component: ErrorComponent}, //** debe ser la última ruta */

];

@NgModule({
  declarations: [
    AppComponent,
    CrearModificarAlumnoComponent,
    EliminarAlumnoComponent,
    MostrarAlumnosComponent,
    EliminarCursoComponent,
    MostrarCursosComponent,
    CrearModificarCursoComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    PaginadorComponent,
 
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NgxPaginationModule]
})
export class AppModule {  }

