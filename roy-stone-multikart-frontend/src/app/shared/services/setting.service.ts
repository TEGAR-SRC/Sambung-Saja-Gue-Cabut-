import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleReCaptcha, Setting } from '../interface/setting.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  reCaptchaConfig: GoogleReCaptcha;

  constructor(private http: HttpClient) {}

  getSettingOption(): Observable<Setting> {
    return this.http.get<Setting>(`${environment.URL}/settings`);
  }

  async getReCaptchaConfig(): Promise<void> {
    const config = await this.getSettingOption().toPromise();
    this.reCaptchaConfig = config?.values?.google_reCaptcha!;
  }

}
