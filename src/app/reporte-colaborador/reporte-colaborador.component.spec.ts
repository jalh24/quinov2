import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteColaboradorComponent } from './reporte-colaborador.component';

describe('ReporteColaboradorComponent', () => {
  let component: ReporteColaboradorComponent;
  let fixture: ComponentFixture<ReporteColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
