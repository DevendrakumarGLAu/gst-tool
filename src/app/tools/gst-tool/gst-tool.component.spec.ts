import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstToolComponent } from './gst-tool.component';

describe('GstToolComponent', () => {
  let component: GstToolComponent;
  let fixture: ComponentFixture<GstToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
