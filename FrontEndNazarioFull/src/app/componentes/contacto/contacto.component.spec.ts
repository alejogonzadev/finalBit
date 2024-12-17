import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Para simular observables

import { ContactoComponent } from './contacto.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],        // Declara el componente bajo prueba
      imports: [HttpClientTestingModule, ContactoComponent],     // Módulo de pruebas HTTP
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
    
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el titulo "NAZARIO"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.welcome').textContent).toContain('NAZARIO');
  });

  it('Debe tener 6 tarjetas de personas', () => {
    const compiled = fixture.nativeElement;
    const teamCards = compiled.querySelectorAll('.card');
    expect(teamCards.length).toBe(6);
  });

  it('Debe tener el elemento footer', () => {
    const compiled = fixture.nativeElement;
    const footer = compiled.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });


});
