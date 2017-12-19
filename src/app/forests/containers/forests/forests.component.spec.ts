import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestsComponent } from './forests.component';

describe('ForestsComponent', () => {
  let component: ForestsComponent;
  let fixture: ComponentFixture<ForestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
