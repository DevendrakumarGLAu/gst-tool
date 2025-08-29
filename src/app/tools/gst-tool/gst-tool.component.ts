import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UploadExcelDialogComponent } from '../upload-excel-dialog/upload-excel-dialog.component';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-gst-tool',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gst-tool.component.html',
  styleUrls: ['./gst-tool.component.scss']
})
export class GstToolComponent {
  gstForm: FormGroup;
  stateData: any = null;

  months = [
    { key: '01', name: 'January' },
    { key: '02', name: 'February' },
    { key: '03', name: 'March' },
    { key: '04', name: 'April' },
    { key: '05', name: 'May' },
    { key: '06', name: 'June' },
    { key: '07', name: 'July' },
    { key: '08', name: 'August' },
    { key: '09', name: 'September' },
    { key: '10', name: 'October' },
    { key: '11', name: 'November' },
    { key: '12', name: 'December' }
  ];

  quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  years: number[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private commonService: CommonService) {
    this.gstForm = this.fb.group({
      gstNumber: ['', [Validators.required, Validators.pattern(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      filingFrequency: ['monthly', Validators.required],
      month: [''],
      quarter: [''],
      year: ['']
    });

    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  }

  get filingFrequency() {
    return this.gstForm.get('filingFrequency')?.value;
  }

  formValues:any;
  onSubmit() {
    if (this.gstForm.valid) {
      this.formValues = this.gstForm.value;
      console.log(this.gstForm.value);
      this.commonService.stateName(this.formValues).subscribe((data: any) => {
        this.stateData = data
        console.log("state data", this.stateData)
      })
      // this.dialog.open(UploadExcelDialogComponent, {
      //   data: formValues,
      //   width: '600px' // ✅ Fix: use quotes
      // });
    }
  }
  openImportDialog(){
    const dialogData = {...this.formValues,...this.stateData}
    this.dialog.open(UploadExcelDialogComponent, {
    data: dialogData,
    width: '600px'
  });
  this.dialog.afterClosed().subscribe((success) => {
    if (success) {
      alert('Import completed successfully!');
      // Optionally refresh data or call API again
      // this.onSubmit();
    }
  });
  }
}
