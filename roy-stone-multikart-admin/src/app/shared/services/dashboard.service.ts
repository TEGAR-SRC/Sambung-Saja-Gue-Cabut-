import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { StatisticsCount, RevenueChart } from "../interface/dashboard.interface";
import { Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getStatisticsCount(payload?: Params): Observable<StatisticsCount> {
    return this.http.get<StatisticsCount>(`${environment.URL}/statistics/count`, { params: payload });
  }

  getRevenueChart(): Observable<RevenueChart> {
    return this.http.get<RevenueChart>(`${environment.URL}/dashboard/chart`);
  }

}
