
import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';  // Importa el módulo de pruebas HTTP
import { PeticionService } from './peticion.service';

describe('PeticionService', () => {
  let service: PeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers : []
    });
    service = TestBed.inject(PeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Validar una petición post', (done) => {
    const mockupUrl = "http://localhost:3000/usuarios/Registro"
    const mockuppayload = {}
    const mockupResponse = {state:false, mensaje: "El campo nombre es obligatorio"}

    service.Post(mockupUrl, mockuppayload).then((res:any) =>{
      expect(res).toEqual(mockupResponse)
      done()
    })
  });

  it('validar que una peticion post debe fallar si mando solo el nombre', (done) =>{

    const mokupUrl = "http://localhost:3000/usuarios/Registro"
    const mokupPayload = {nombre:"Alejo"}
    const mokupResponse = {state:false, mensaje:"El campo apellido es obligatorio"}

    service.Post(mokupUrl,mokupPayload).then((res:any) => {
      expect(res).toEqual(mokupResponse)
      done()
    })

  });

  it('validar que una peticion post debe fallar si mando solo el nombre y el apellido', (done) =>{

    const mokupUrl = "http://localhost:3000/usuarios/Registro"
    const mokupPayload = {nombre:"Alejo", apellido:"Gonzalez"}
    const mokupResponse = {state:false, mensaje:"El campo email es obligatorio"}

    service.Post(mokupUrl,mokupPayload).then((res:any) => {
      expect(res).toEqual(mokupResponse)
      done()
    })

  });

  it('validar que una peticion post debe fallar si mando solo el nombre, apellido y correo', (done) =>{

    const mokupUrl = "http://localhost:3000/usuarios/Registro"
    const mokupPayload = {nombre:"Alejo", apellido:"Gonzalez", email:"alejo@gmail.com"}
    const mokupResponse = {state:false, mensaje:"El campo password es obligatorio"}

    service.Post(mokupUrl,mokupPayload).then((res:any) => {
      expect(res).toEqual(mokupResponse)
      done()
    })

  });


});
