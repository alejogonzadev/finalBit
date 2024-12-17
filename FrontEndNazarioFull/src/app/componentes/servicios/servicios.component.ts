import { Component } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $:any

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  constructor(private peticion:PeticionService){}
  datos:any[] = []
  nombre:string =""
  codigo:string = ""
  IdSeleccionado:string =""

  ngOnInit(): void {
    this.Listar()
  }
  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre =""
    this.codigo=""
    this.IdSeleccionado=""
  }

  Listar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/servicios/Listar",
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
      Path:"/servicios/Guardar",
      Payload:{
        nombre:this.nombre,
        codigo:this.codigo,
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
      Path:"/servicios/ListarId",
      Payload:{
        _id:id
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos[0].nombre
      this.codigo = res.datos[0].codigo
      
    }) 
  }


  Actualizar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/servicios/Actualizar",
      Payload:{
        nombre: this.nombre,
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


  Eliminar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/servicios/Eliminar",
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





}
