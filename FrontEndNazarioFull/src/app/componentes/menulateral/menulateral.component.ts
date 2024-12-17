import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit{

  constructor(public peticion:PeticionService, private router:Router){}

  ngOnInit(): void {
    this.Status()
  }

  nombre:string = "Cargando"
  rol:string ="Cargando"
  ultimologin:string ="1900/01/01"
  _id: string = ""
  random:number = 0

  Status(){

    let data = {
      Host:this.peticion.urlHost,
      Path:"/status",
      Payload:{

      }
    }

    this.peticion.Post(data.Host + data.Path, data.Payload).then((res:any) => {
      console.log(res)
      if(res.nombre == undefined || res.nombre == null){
        this.router.navigate(["login"])
      }
      this.nombre = res.nombre
      this.ultimologin = res.ultimologin
      this._id = res._id

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

        this.router.navigate(["login"])


      }


  })

}

selectedfile:File | null = null


OpenFileSelected(event:any){

  this.selectedfile = event.target.files[0]
  this.onUpload()
}

onUpload(){
  if(this.selectedfile){
    this.peticion.Upload(this.selectedfile,"/subirAvatar/" + this._id).subscribe((res:any) => {
      console.log(res)

      this.random = Math.random() * (9999 - 0) + 0;

      if(res.state == false){
        Swal.fire({
          title: "Espera!",
          text: res.mensaje,
          icon: "warning"
        });
      }
      else{
        Swal.fire({
          title: "Perfecto!",
          text: res.mensaje,
          icon: "success"
        });
        

      }

    })
  }
}


}
