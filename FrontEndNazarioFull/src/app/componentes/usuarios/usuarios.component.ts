import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $:any

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  constructor(private peticion:PeticionService){}
  datos:any[] = []
  nombre:string =""
  apellido:string=""
  email:string = ""
  password:string =""
  IdSeleccionado:string =""
  estado:string ="1"
  rol:string ="3"

  ngOnInit(): void {
    this.Listar()
  }
  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre =""
    this.apellido=""
    this.email=""
    this.password=""
    this.IdSeleccionado=""
    this.estado="1"
    this.rol="3"
  }

  Listar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/Listar",
      Payload:{
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      this.datos = res.datos

      
    }) 
  
  
  }


  Guardar() {
    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/Guardar",
      Payload:{
        nombre:this.nombre,
        apellido:this.apellido,
        email: this.email,
        password:this.password,
        rol:this.rol,
        estado:this.estado
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
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
        $('#formdatos').modal('hide')
        this.Listar()
      }

      
    }) 
  }

  EditarId(id:string) {
    this.IdSeleccionado = id
    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/ListarId",
      Payload:{
        _id:id
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos[0].nombre
      this.apellido = res.datos[0].apellido
      this.email = res.datos[0].email
      this.rol = res.datos[0].rol
      this.estado = res.datos[0].estado
      
    }) 
  }


  Actualizar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/Actualizar",
      Payload:{
        nombre: this.nombre,
        apellido:this.apellido,
        rol:this.rol,
        estado:this.estado,
        _id: this.IdSeleccionado
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
        Swal.fire({
          title: "Perfecto!",
          text: res.mensaje,
          icon: "success",
          background: "#2c2c2c",  // Fondo oscuro
          color: "#ffffff",        // Texto blanco
          iconColor: "#f8bb86",    // Color del ícono de advertencia
        });
        $('#formdatos').modal('hide')
        this.Listar()
      }       
    }) 
  }


  Eliminar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/Eliminar",
      Payload:{
        _id: this.IdSeleccionado
      }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
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
        $('#formdatos').modal('hide')
        this.Listar()
      }       
    }) 
  }

}
