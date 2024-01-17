import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBitacorasServicioComponent } from './modal-bitacoras-servicio.component';

describe('ModalBitacorasServicioComponent', () => {
  let component: ModalBitacorasServicioComponent;
  let fixture: ComponentFixture<ModalBitacorasServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBitacorasServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBitacorasServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
