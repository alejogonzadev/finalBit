import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(public peticion:PeticionService){}

  ngOnInit(): void {
    this.Status()
  }

  nombre:string =""
  rol:string = ""



  Status(){

    let data = {
      Host:this.peticion.urlHost,
      Path:"/status",
      Payload:{

      }
    }

    this.peticion.Post(data.Host + data.Path, data.Payload).then((res:any) => {
      console.log(res)

      this.nombre = res.nombre      


      switch (res.rol) {
        case "1":
          this.rol = "Administrador"
          break;
        case "2":
          this.rol = "Vendedor"
          break;
        case "3":
          this.rol = "Cliente"
        break;
          
      
        default:
          break;
      }
    })

  }

  Logout(){
    
    let data = {
      Host:this.peticion.urlHost,
      Path:"/logout",
      Payload:{

      }
    }

    this.peticion.Post(data.Host + data.Path, data.Payload).then((res:any) => {
      console.log(res)

      if(res.state == true){

        Swal.fire({
          title: "Perfecto!",
          text: res.mensaje,
          icon: "success",
          background: "#2c2c2c",  // Fondo oscuro
          color: "#ffffff",        // Texto blanco
          iconColor: "#f8bb86",    // Color del ícono de advertencia
        });

      this.Status()


      }


  })

}

}
