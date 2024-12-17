import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionService } from '../../services/peticion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var Chart:any
declare var document:any

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenulateralComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private peticion:PeticionService,  private router:Router){}

  ngOnInit(): void {
    this.grafico1()
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

  grafico1(){

    let data = {
      Host:this.peticion.urlHost,
      Path:"/usuarios/Listar",
      Payload:{
    }
    
    }
  
    this.peticion.Post(data.Host + data.Path,data.Payload).then((res:any) => {
      console.log(res)
      

      
    }) 

    

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    console.log(ctx)

    // new Chart(ctx, {
    //   type: 'pie', // Tipo de gráfico
    //   data: {
    //     labels: ['Usuarios','Ventas'], // Etiquetas del eje x
    //     datasets: [{
    //       label: ['Usuarios','Ventas'],// Etiqueta del conjunto de datos
    //       data: [100,200], // Datos del conjunto de datos
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
  
    //       ], // Colores de fondo de las barras
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
  
    //       ], // Colores de borde de las barras
    //       borderWidth: 1 // Ancho del borde de las barras
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       y: {
    //         beginAtZero: true // Comenzar el eje y en cero
    //       }
    //     }
    //   }
    // });


  

  }

}


