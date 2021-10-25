import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWhatsappComponent } from './modal-whatsapp.component';

describe('ModalWhatsappComponent', () => {
  let component: ModalWhatsappComponent;
  let fixture: ComponentFixture<ModalWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
