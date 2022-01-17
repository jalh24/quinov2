import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPacienteComponent } from './pago-paciente.component';

describe('PagoPacienteComponent', () => {
  let component: PagoPacienteComponent;
  let fixture: ComponentFixture<PagoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
