import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelDialogComponent } from './upload-excel-dialog.component';

describe('UploadExcelDialogComponent', () => {
  let component: UploadExcelDialogComponent;
  let fixture: ComponentFixture<UploadExcelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadExcelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadExcelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
