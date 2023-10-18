import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  refrescarFecha(): string{

    const anio = document.getElementById('year');
    const anioActual = new Date().getFullYear();
  
      if (anio) {
        return anio.textContent = "All rights reserved "+anioActual.toString()+" @Grover";
      }
  
      return "";
    }

}
