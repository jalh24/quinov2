import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorServicioComponent } from './cotizador-servicio.component';

describe('CotizadorServicioComponent', () => {
  let component: CotizadorServicioComponent;
  let fixture: ComponentFixture<CotizadorServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
