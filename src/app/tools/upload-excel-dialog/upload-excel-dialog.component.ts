import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../app-common.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-excel-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './upload-excel-dialog.component.html',
  styleUrl: './upload-excel-dialog.component.scss'
})
export class UploadExcelDialogComponent {
  excelForm!: FormGroup;
  files: { [key: string]: File | null } = {
    tcs_sales_return: null,
    tcs_sales: null,
    tax_invoice_details: null
  };

  constructor(private fb: FormBuilder, private commonService: CommonService,
    public dialogRef: MatDialogRef<UploadExcelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.excelForm = this.fb.group({
      tcs_sales_return: [null, Validators.required],
      tcs_sales: [null, Validators.required],
      tax_invoice_details: [null, Validators.required]
    });
  }

  expectedFilenames: { [key: string]: string } = {
    tcs_sales_return: 'tcs_sales_return.xlsx',
    tcs_sales: 'tcs_sales.xlsx',
    tax_invoice_details: 'Tax_invoice_details.xlsx'
  };

  onFileChange(event: any, fileKey: string) {
    const file = event.target.files[0];

    if (!file) return;

    const expectedName = this.expectedFilenames[fileKey];
    const actualName = file.name;

    const isExcel = actualName.endsWith('.xls') || actualName.endsWith('.xlsx');

    if (!isExcel) {
      alert('Please select a valid Excel file (.xls or .xlsx)');
      this.clearFile(fileKey, event.target);
      return;
    }

    if (actualName !== expectedName) {
      alert(`Filename must be exactly "${expectedName}"`);
      this.clearFile(fileKey, event.target);
      return;
    }

    // All good
    this.files[fileKey] = file;
    this.excelForm.patchValue({ [fileKey]: file });
  }

  clearFile(fileKey: string, inputElement: HTMLInputElement) {
    this.files[fileKey] = null;
    this.excelForm.patchValue({ [fileKey]: null });
    inputElement.value = ''; // Clear the file input in UI
  }


  // onSubmit() {
  //   if (this.excelForm.valid) {
  //     const formData = new FormData();

  //     if (this.files['tcs_sales']) {
  //       formData.append('tcs_sales', this.files['tcs_sales']);
  //     }
  //     if (this.files['tcs_sales_return']) {
  //       formData.append('tcs_sales_return', this.files['tcs_sales_return']);
  //     }
  //     if (this.files['tax_invoice_details']) {
  //       formData.append('tax_invoice_details', this.files['tax_invoice_details']);
  //     }
  //     formData.append('gst_number', this.data.gstNumber);
  //     formData.append('filing_frequency', this.data.filingFrequency);
  //     formData.append('month', this.data.month || '');
  //     formData.append('year', this.data.year || '');

  //     console.log('Form Data Ready to Submit:', formData);
  //     this.commonService.uploadExcelFiles(formData).subscribe({
  //       next: (res: Blob) => {
  //         const blob = new Blob([res], {
  //           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //         });
  //         console.log("res", res)
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'tax_document_summary.xlsx';
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         alert('File downloaded successfully!');
  //         this.dialogRef.close();
  //       },
  //       error: (err) => {
  //         console.error('Download failed:', err);
  //         alert('Failed to download the Excel file.');
  //       }
  //     });
  //   }
  // }
  onSubmit() {
  if (this.excelForm.valid) {
    const formData = new FormData();

    Object.entries(this.files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    formData.append('gst_number', this.data.gstNumber);
    formData.append('filing_frequency', this.data.filingFrequency);
    formData.append('month', this.data.month || '');
    formData.append('year', this.data.year || '');

    // First download the Excel file
    this.commonService.uploadExcelFiles(formData).subscribe({
      next: (excelBlob: Blob) => {
        const excel = new Blob([excelBlob], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const excelUrl = window.URL.createObjectURL(excel);
        const excelAnchor = document.createElement('a');
        excelAnchor.href = excelUrl;
        excelAnchor.download = 'tax_document_summary.xlsx';
        excelAnchor.click();
        window.URL.revokeObjectURL(excelUrl);

        // ✅ Then request the JSON
        this.commonService.getGSTJson(formData).subscribe({
          next: (jsonData: any) => {
            const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
              type: 'application/json'
            });
            const jsonUrl = window.URL.createObjectURL(jsonBlob);
            const jsonAnchor = document.createElement('a');
            jsonAnchor.href = jsonUrl;
            jsonAnchor.download = 'gst_data.json';
            jsonAnchor.click();
            window.URL.revokeObjectURL(jsonUrl);

            alert('Both Excel and JSON downloaded successfully!');
            this.dialogRef.close(true);  // Notify parent
          },
          error: () => {
            alert('Failed to download JSON.');
            this.dialogRef.close(false);
          }
        });
      },
      error: () => {
        alert('Failed to download Excel file.');
        this.dialogRef.close(false);
      }
    });
  }
}

  close(){
    this.dialogRef.close();
  }
}
