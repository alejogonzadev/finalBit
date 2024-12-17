import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Para simular observables

import { SolicitarcodigoComponent } from './solicitarcodigo.component';

describe('SolicitarcodigoComponent', () => {
  let component: SolicitarcodigoComponent;
  let fixture: ComponentFixture<SolicitarcodigoComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],        // Declara el componente bajo prueba
      imports: [HttpClientTestingModule, SolicitarcodigoComponent],     // Módulo de pruebas HTTP
      providers: [
        {
          provide: ActivatedRoute,           // Simula ActivatedRoute
          useValue: {
            params: of({ id: '123' }),       // Simula parámetros de ruta
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarcodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
