import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorClienteComponent } from './cotizador-cliente.component';

describe('CotizadorClienteComponent', () => {
  let component: CotizadorClienteComponent;
  let fixture: ComponentFixture<CotizadorClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
