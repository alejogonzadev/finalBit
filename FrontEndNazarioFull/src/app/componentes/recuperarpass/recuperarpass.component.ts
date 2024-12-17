import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PeticionService } from '../../services/peticion.service';

@Component({
  selector: 'app-recuperarpass',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './recuperarpass.component.html',
  styleUrl: './recuperarpass.component.css'
})
export class RecuperarpassComponent {

  constructor(private peticion:PeticionService, private router:Router){}

email: string = ""
password: string = ""
confirmar:string= ""
codigo:string= ""




Recuperar(){

  let data = {
    Host:this.peticion.urlHost,
    Path:"/usuarios/recuperarpass",
    Payload:{
      email:this.email,
      password:this.password,
      codigo:this.codigo
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
      this.router.navigate(["login"])
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
