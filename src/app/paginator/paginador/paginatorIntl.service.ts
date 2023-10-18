import { Injectable } from "@angular/core";
import { MatPaginatorIntl} from "@angular/material/paginator";
import { DataSharingService } from '../../data-sharing-service/data-sharing.service';
//import { DataSharingService } from '../data-sharing-service/data-sharing.service';


//Para sobreescribir el rango de elementos del paginador
@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {

    override itemsPerPageLabel = 'Elementos por página'; 
    override nextPageLabel = 'Siguiente';
    override previousPageLabel = 'Anterior';
    override firstPageLabel = 'Primera';
    override lastPageLabel = 'Última';

    constructor(private dataSharingService: DataSharingService) {
        super();
      }
/** 
    override getRangeLabel = (pagina: number, tamanioPagina: number, length: number) => {
        //return `Página ${pagina + 1} de ${this.totalPaginas}`
        return `Página ${pagina+1} de ${Math.ceil(length/tamanioPagina)}`
    } */

    override getRangeLabel = (pagina: number, tamanioPagina: number, length: number) => {
        // Calcular el número total de páginas basado en el número de alumnos y el tamaño de la página
        const totalAlumnos = this.dataSharingService.getTotalAlumnos();
        const totalPaginas = Math.ceil(totalAlumnos / tamanioPagina);
        return `Página ${pagina + 1} de ${totalPaginas}`;
    }

}