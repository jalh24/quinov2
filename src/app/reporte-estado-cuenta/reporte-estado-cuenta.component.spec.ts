import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadoCuentaComponent } from './reporte-estado-cuenta.component';

describe('ReporteEstadoCuentaComponent', () => {
  let component: ReporteEstadoCuentaComponent;
  let fixture: ComponentFixture<ReporteEstadoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEstadoCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
