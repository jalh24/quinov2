import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFisicoComponent } from './cliente-fisico.component';

describe('ClienteComponent', () => {
  let component: ClienteFisicoComponent;
  let fixture: ComponentFixture<ClienteFisicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteFisicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
