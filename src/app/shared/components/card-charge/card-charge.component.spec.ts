import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChargeComponent } from './card-charge.component';

describe('CardChargeComponent', () => {
  let component: CardChargeComponent;
  let fixture: ComponentFixture<CardChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
