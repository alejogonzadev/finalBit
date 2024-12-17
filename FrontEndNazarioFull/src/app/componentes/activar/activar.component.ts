import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { PeticionService } from '../../services/peticion.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent implements OnInit {

  constructor(private peticion:PeticionService, private router:Router, private actroute:ActivatedRoute){}

email: string = ""
azar: string = ""

ngOnInit(): void {
  this.email = this.actroute.snapshot.params[("email")]
  this.azar = this.actroute.snapshot.params[("azar")]
}


Activar(){

  let data = {
    Host:this.peticion.urlHost,
    Path:"/Activar",
    Payload:{
      email:this.email,
      azar:this.azar
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
