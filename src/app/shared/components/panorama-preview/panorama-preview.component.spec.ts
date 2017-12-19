import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaPreviewComponent } from './panorama-preview.component';

describe('PanoramaPreviewComponent', () => {
  let component: PanoramaPreviewComponent;
  let fixture: ComponentFixture<PanoramaPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanoramaPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanoramaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
