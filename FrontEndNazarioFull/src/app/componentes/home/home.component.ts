import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

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
