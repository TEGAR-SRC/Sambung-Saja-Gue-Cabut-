import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { LicenseKey, LicenseKeyModel } from '../interface/license-key.interface';

@Injectable({
  providedIn: 'root'
})
export class LicenseKeyService {

  constructor(private http: HttpClient) {}

  getLicenseKeys(payload?: Params): Observable<LicenseKeyModel> {
    return this.http.get<LicenseKeyModel>(`${environment.URL}/license-key`, { params: payload });
  }

  createLicenseKey(payload: LicenseKey): Observable<LicenseKey> {
    return this.http.post<LicenseKey>(`${environment.URL}/license-key`, payload);
  }

  editLicenseKey(id: number): Observable<LicenseKey> {
    return this.http.get<LicenseKey>(`${environment.URL}/license-key/${id}`);
  }

  updateLicenseKey(id: number, payload: LicenseKey): Observable<LicenseKey> {
    return this.http.put<LicenseKey>(`${environment.URL}/license-key/${id}`, payload);
  }

  updateLicenseKeyStatus(id: number, status: boolean): Observable<LicenseKey> {
    return this.http.put<LicenseKey>(`${environment.URL}/license-key/${id}/${status}`, {});
  }

  deleteLicenseKey(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/license-key/${id}`);
  }

  deleteAllLicenseKey(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/license-key/deleteAll`, { ids: ids });
  }

}
