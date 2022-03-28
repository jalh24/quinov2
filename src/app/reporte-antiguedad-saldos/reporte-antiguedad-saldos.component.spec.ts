import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAntiguedadSaldosComponent } from './reporte-antiguedad-saldos.component';

describe('ReporteAntiguedadSaldosComponent', () => {
  let component: ReporteAntiguedadSaldosComponent;
  let fixture: ComponentFixture<ReporteAntiguedadSaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAntiguedadSaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAntiguedadSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
