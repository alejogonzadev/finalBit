import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { UbicacionComponent } from './componentes/ubicacion/ubicacion.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ActivarComponent } from './componentes/activar/activar.component';
import { DetalladoComponent } from './componentes/detallado/detallado.component';
import { SolicitarcodigoComponent } from './componentes/solicitarcodigo/solicitarcodigo.component';
import { RecuperarpassComponent } from './componentes/recuperarpass/recuperarpass.component';

export const routes: Routes = [
    {path: "home",component:HomeComponent, pathMatch: "full"},
    {path: "detallado/:_id",component:DetalladoComponent, pathMatch: "full"},
    {path: "",component:HomeComponent, pathMatch: "full"},
    {path: "vehiculos", component:VehiculosComponent, pathMatch: "full"},
    {path: "ubicacion", component: UbicacionComponent, pathMatch: "full"},
    {path: "contacto", component: ContactoComponent, pathMatch: "full"},
    {path: "registro", component: RegistroComponent, pathMatch: "full"},
    {path: "login", component: LoginComponent, pathMatch: "full"},
    {path: "solicitarcodigo", component: SolicitarcodigoComponent, pathMatch: "full"},
    {path: "recuperarpass", component: RecuperarpassComponent, pathMatch: "full"},
    {path: "activar/:email/:azar", component: ActivarComponent, pathMatch: "full"},
    {path: "dashboard", component: DashboardComponent, pathMatch: "full"},
    {path: "usuarios", component: UsuariosComponent, pathMatch: "full"},
    {path: "productos", component: ProductosComponent, pathMatch: "full"},
    {path: "servicios", component: ServiciosComponent, pathMatch: "full"},
];
