import { Component } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionService } from '../../services/peticion.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  constructor(public peticion:PeticionService){}
  datos:any[] = []
  nombre:string =""
  codigo:string = ""
  precio:string =""
  cantidad:string = "1"
  descripcion:string=""
  imagen:string=""
  estado:string="0"
  random:number = 0
  nombrearchivo:string = "Upload"
  
  IdSeleccionado:string =""

  ngOnInit(): void {
    this.Listar()
  }
  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre =""
    this.codigo=""
    this.precio=""
    this.descripcion=""
    this.imagen=""
    this.estado="0"
    this.IdSeleccionado=""
    this.cantidad = "1"
  }

  Listar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/productos/Listar",
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
      Path:"/productos/Guardar",
      Payload:{
        nombre:this.nombre,
        codigo:this.codigo,
        precio:this.precio,
        descripcion:this.descripcion,
        imagen:this.imagen,
        estado:this.estado,
        cantidad:this.cantidad
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
      Path:"/productos/ListarId",
      Payload:{
        _id:id
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos[0].nombre
      this.codigo = res.datos[0].codigo
      this.precio = res.datos[0].precio
      this.descripcion = res.datos[0].descripcion
      this.imagen = res.datos[0].imagen
      this.estado = res.datos[0].estado
      this.cantidad = res.datos[0].cantidad
      
    }) 
  }


  Actualizar(){
    let data = {
      Host:this.peticion.urlHost,
      Path:"/productos/Actualizar",
      Payload:{
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        imagen: this.imagen,
        estado:this.estado,
       _id: this.IdSeleccionado,
       cantidad: this.cantidad
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
      Path:"/productos/Eliminar",
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

  selectedfile:File | null = null


  OpenFileSelected(event:any){

    this.nombrearchivo = event.target.files[0].name
    console.log(this.nombrearchivo)
    this.selectedfile = event.target.files[0]
  }

  onUpload(){
    if(this.selectedfile){
      this.peticion.Upload(this.selectedfile,"/subirProductos/" + this.IdSeleccionado).subscribe((res:any) => {
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
          this.nombrearchivo = "Archivo Cargado"
          

        }

      })
    }
  }



}
