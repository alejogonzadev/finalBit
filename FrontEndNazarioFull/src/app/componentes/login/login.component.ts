import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../services/peticion.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


interface Persona {
  nombre:string,
  apellidos:string,
  edad:number
  
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

constructor(private peticion:PeticionService, private router:Router){}

email: any = ""
password: any = ""
recordar:boolean = false


ngOnInit(): void {
  this.recordar = localStorage.getItem("recordar") == "true" ? true : false
  if(this.recordar == true){
    
    this.email = localStorage.getItem("email")?.toString()
    // this.password = localStorage.getItem("pass")?.toString()
  }
}




login(){

  let data = {
    Host:this.peticion.urlHost,
    Path:"/usuarios/Login",
    Payload:{
      email:this.email,
      password:this.password
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

      localStorage.setItem("recordar", this.recordar.toString())

      if(this.recordar == true){
        localStorage.setItem("email", this.email)
        // localStorage.setItem("pass", this.password)
      }
      else{
        localStorage.setItem("email","")
        localStorage.setItem("pass","")

      }

      this.router.navigate(["home"])
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




    
