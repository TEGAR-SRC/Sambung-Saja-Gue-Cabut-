import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { DownloadModel } from '../interface/download.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  constructor(private http: HttpClient) {}

  downloads(payload?: Params): Observable<DownloadModel> {
    return this.http.get<DownloadModel>(`${environment.URL}/download`, { params: payload });
  }

  downloadFiles(id: number): Observable<{download_link: string}> {
    return this.http.post<{download_link: string}>(`${environment.URL}/download/zip/link`, {id: id});
  }

  downloadLicense(id: number): Observable<{download_link: string}> {
    return this.http.post<{download_link: string}>(`${environment.URL}/download/key/link`, {id: id});
  }
}
