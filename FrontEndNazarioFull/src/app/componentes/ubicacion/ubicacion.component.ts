import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {

}
