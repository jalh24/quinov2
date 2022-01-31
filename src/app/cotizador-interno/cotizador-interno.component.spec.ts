import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorInternoComponent } from './cotizador-interno.component';

describe('CotizadorInternoComponent', () => {
  let component: CotizadorInternoComponent;
  let fixture: ComponentFixture<CotizadorInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
