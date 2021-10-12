import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMoralComponent } from './cliente-moral.component';

describe('ClienteMoralComponent', () => {
  let component: ClienteMoralComponent;
  let fixture: ComponentFixture<ClienteMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteMoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
