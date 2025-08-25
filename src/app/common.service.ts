import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   private baseUrl = environment.backendURL

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  getMessage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  studentRegistration(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students/register`, data)
  }
  updateStudent(id: string, data: any) {
    return this.http.put(`/api/students/${id}`, data); // adjust endpoint as needed
  }

  uploadExcelFiles(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/gst/upload-excels`, formData,{
      responseType: 'blob' as 'json'
    });
  }
}
