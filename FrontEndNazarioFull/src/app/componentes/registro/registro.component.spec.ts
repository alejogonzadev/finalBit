import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Para simular observables


import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],        // Declara el componente bajo prueba
      imports: [HttpClientTestingModule, RegistroComponent],     // Módulo de pruebas HTTP
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
    
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar la imagen del logo correctamente', () => {
    const compiled = fixture.nativeElement;
    const logoImage = compiled.querySelector('.side-image img');
    expect(logoImage).toBeTruthy();
    expect(logoImage.src).toContain('logonazario.png');
  });


  it('El boton de sign up debe estar prensente', () => {
    const compiled = fixture.nativeElement;
    const signUpButton = compiled.querySelector('.submit');
    expect(signUpButton).toBeTruthy();
    expect(signUpButton.value).toBe('Sign Up');
  });

  it('Debe tener el mensaje promocional', () => {
    const compiled = fixture.nativeElement;
    const promoText = compiled.querySelector('.side-image .text p');
    expect(promoText).toBeTruthy();
    expect(promoText.textContent).toContain('El carro de tus sueños, te espera.');
  });
});
