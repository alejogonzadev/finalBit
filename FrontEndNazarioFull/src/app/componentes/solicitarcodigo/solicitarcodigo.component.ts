import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PeticionService } from '../../services/peticion.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitarcodigo',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitarcodigo.component.html',
  styleUrl: './solicitarcodigo.component.css'
})
export class SolicitarcodigoComponent {

  constructor(private peticion:PeticionService, private router:Router){}

email: string = ""
password: string = ""




solicitar(){

  let data = {
    Host:this.peticion.urlHost,
    Path:"/usuarios/solicitarcodigo",
    Payload:{
      email:this.email,
  
  }
  
  }

  this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
    console.log(res)
    if(res.state == false){
      Swal.fire({
        title: "Espera!",
        text: res.mensaje,
        icon: "warning",
        background: "#2c2c2c",  // Fondo oscuro
        color: "#ffffff",        // Texto blanco
        iconColor: "#f8bb86",    // Color del ícono de advertencia
      });
    }
    else{
      this.router.navigate(["recuperarpass"])
      Swal.fire({
        title: "Perfecto!",
        text: res.mensaje,
        icon: "success",
        background: "#2c2c2c",  // Fondo oscuro
        color: "#ffffff",        // Texto blanco
        iconColor: "#f8bb86",    // Color del ícono de advertencia
      });
    }
  })






}

}
