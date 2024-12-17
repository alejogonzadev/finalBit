// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../footer/footer.component';
// import { HeaderComponent } from '../header/header.component';
// import { ActivatedRoute } from '@angular/router';
// import { PeticionService } from '../../services/peticion.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-detallado',
//   standalone: true,
//   imports: [FooterComponent, HeaderComponent, CommonModule],
//   templateUrl: './detallado.component.html',
//   styleUrl: './detallado.component.css'
// })
// export class DetalladoComponent implements OnInit {

//   constructor(private actrouter:ActivatedRoute, public peticion:PeticionService){}

//   // datos:any[] = []

//   ngOnInit(): void {
    
//     this.cargarId(this.actrouter.snapshot.params[("_id")])
//   }
  

//   datos:any = {}

//   cargarId(_id:string){

//     let data = {
//       host:this.peticion.urlHost,
//       path:"/productos/ListarId",
//       payload:{
//         _id:_id
//       }
//     }

//     this.peticion.Post(data.host + data.path, data.payload).then((res:any) =>{
//       this.datos = res.datos[0]
//     })

//   }

// }

import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detallado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './detallado.component.html',
  styleUrls: ['./detallado.component.css']
})
export class DetalladoComponent implements OnInit {

  datos: any = {}; // Inicializamos "datos" como un objeto vacío

  constructor(private actrouter: ActivatedRoute, public peticion: PeticionService) { }

  ngOnInit(): void {
    // Usamos el parámetro correcto para obtener el id
    const id = this.actrouter.snapshot.paramMap.get('_id');
    if (id) {
      this.cargarId(id);
    } else {
      console.error('No se encontró el parámetro _id en la ruta');
    }
  }

  async cargarId(_id: string): Promise<void> {
    const data = {
      host: this.peticion.urlHost,
      path: "/productos/ListarId",
      payload: {
        _id: _id
      }
    };

    try {
      const res: any = await this.peticion.Post(data.host + data.path, data.payload);
      if (res && res.datos && res.datos.length > 0) {
        this.datos = res.datos[0];
      } else {
        console.error('No se encontraron datos para el _id proporcionado');
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
}
