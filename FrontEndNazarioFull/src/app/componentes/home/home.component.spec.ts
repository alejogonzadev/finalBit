import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Para simular observables

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],        // Declara el componente bajo prueba
      imports: [HttpClientTestingModule, HomeComponent],     // Módulo de pruebas HTTP
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
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Verificar que el título "NAZARIO" esté presente
    it('debe tener el titulo "NAZARIO"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('h2.welcome')?.textContent;
      expect(title).toBe('NAZARIO');
    });
  
    //Verificar que el carrusel tiene tres elementos (imágenes)
    it('Debe tener 3 items en el carrusel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const carouselItems = compiled.querySelectorAll('.carousel-item');
      expect(carouselItems.length).toBe(3);  // Verifica que haya tres elementos en el carrusel
    });
  
  
    //Verificar que el botón "Contactar Asesor" esté presente
    it('Debe tener el boton contactar asesor', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('a.btn.btn-primary')?.textContent;
      expect(button).toBe('Contactar Asesor');
    });
  
});
