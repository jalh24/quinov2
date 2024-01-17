import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCotizadorServicioComponent } from './modal-cotizador-servicio.component';

describe('ModalCotizadorServicioComponent', () => {
  let component: ModalCotizadorServicioComponent;
  let fixture: ComponentFixture<ModalCotizadorServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCotizadorServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCotizadorServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
