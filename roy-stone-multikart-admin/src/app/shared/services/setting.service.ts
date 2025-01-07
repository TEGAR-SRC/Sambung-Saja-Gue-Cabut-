import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { AppSetting, GoogleReCaptcha, Setting } from '../interface/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  reCaptchaConfig: GoogleReCaptcha;

  constructor(private http: HttpClient) { }

  getSettingOption(): Observable<Setting> {
    return this.http.get<Setting>(`${environment.URL}/settings`);
  }

  updateSettingOption(payload: Params): Observable<Setting> {
    return this.http.put<Setting>(`${environment.URL}/settings`, payload);
  }

  testMail(payload: Params): Observable<Setting> {
    return this.http.post<Setting>(`${environment.URL}/notifications/test`, payload);
  }

  getAppSettingOption(): Observable<AppSetting> {
    return this.http.get<AppSetting>(`${environment.URL}/app/settings`);
  }

  updateAppSettingOption(payload: Params): Observable<AppSetting> {
    return this.http.put<AppSetting>(`${environment.URL}/app/settings`, payload);
  }

  async getReCaptchaConfig(): Promise<void> {
    // const config = await this.getSettingOption().toPromise();
    // this.reCaptchaConfig = config?.values?.google_reCaptcha!;
  }

}
