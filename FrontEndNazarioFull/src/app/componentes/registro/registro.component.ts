import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../services/peticion.service';
import Swal from 'sweetalert2';

interface midata {
  Host:String,
  Path:String,
  Payload:any
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion:PeticionService){}
  nombre:string =""
  apellido:string=""
  email: string = ""
  password: string = ""





Registrar() {
  let data = {
    Host:this.peticion.urlHost,
    Path:"/usuarios/Registro",
    Payload:{
      nombre:this.nombre,
      apellido:this.apellido,
      email:this.email,
      password:this.password
    }
  }

  this.peticion.Post(data.Host + data.Path, data.Payload).then((res:any)=>{
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
