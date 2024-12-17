import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {
  datos:any[] = []

  constructor(public peticion:PeticionService){} 

  ngOnInit(): void {
    this.Listar()
  }

  Listar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/productos/ListarProductosActivos",
      Payload:{
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      this.datos = res.datos      
    }) 
  
  
  }

}
