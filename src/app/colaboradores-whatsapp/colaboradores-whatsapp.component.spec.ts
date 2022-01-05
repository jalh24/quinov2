import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresWhatsappComponent } from './colaboradores-whatsapp.component';

describe(' ', () => {
  let component: ColaboradoresWhatsappComponent;
  let fixture: ComponentFixture<ColaboradoresWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradoresWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
