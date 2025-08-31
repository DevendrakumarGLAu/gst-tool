import { Component, OnInit } from '@angular/core';
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
export class GstToolComponent implements OnInit {
  gstForm: FormGroup;
  stateData: any = null;
  downloadReady = false;
  formDataForDownload!: FormData;

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

  ngOnInit() {
  const savedForm = localStorage?.getItem('gstFormData');
  if (savedForm) {
    this.gstForm.patchValue(JSON.parse(savedForm));
  }
}

  get filingFrequency() {
    return this.gstForm.get('filingFrequency')?.value;
  }
  uploadedJsonData: any = null;
  uploadedExcelBase64: string = '';
  formValues: any;
  onSubmit() {
    if (this.gstForm.valid) {
      this.formValues = this.gstForm.value;
      // console.log(this.gstForm.value);
      localStorage.setItem('gstFormData', JSON.stringify(this.formValues));

      this.commonService.stateName(this.formValues).subscribe((data: any) => {
        this.stateData = data
      })
    }
  }


  openImportDialog() {
    const dialogData = { ...this.formValues, ...this.stateData };
    const dialogRef = this.dialog.open(UploadExcelDialogComponent, {
      data: dialogData,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        console.log('Dialog result:', result);
        this.uploadedJsonData = result.jsonData;
        this.uploadedExcelBase64 = result.excelBase64;
        this.downloadReady = true;
        alert('Files processed. Click to download.');
      } else {
        alert('Something went wrong.');
      }
    });
  }

  downloadJson() {
    const blob = new Blob([JSON.stringify(this.uploadedJsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gst_data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadExcel() {
    try {
      // Clean the base64 string: remove prefix & whitespace
      let base64String = this.uploadedExcelBase64;
      if (base64String.startsWith('data:')) {
        base64String = base64String.split(',')[1];
      }
      base64String = base64String.replace(/\s/g, '');

      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tax_document_summary.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error decoding base64 or downloading file:', error);
    }
  }
}
