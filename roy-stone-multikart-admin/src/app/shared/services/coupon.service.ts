import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Coupon, CouponModel } from "../interface/coupon.interface";

@Injectable({
  providedIn: "root",
})
export class CouponService {

  constructor(private http: HttpClient) {}

  getCoupons(payload?: Params): Observable<CouponModel> {
    return this.http.get<CouponModel>(`${environment.URL}/coupon`, { params: payload });
  }

  createCoupon(payload: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${environment.URL}/coupon`, payload);
  }

  editCoupon(id: number): Observable<Coupon> {
    return this.http.get<Coupon>(`${environment.URL}/coupon/${id}`);
  }

  updateCoupon(id: number, payload: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(`${environment.URL}/coupon/${id}`, payload);
  }

  updateCouponStatus(id: number, status: boolean): Observable<Coupon> {
    return this.http.put<Coupon>(`${environment.URL}/coupon/${id}/${status}`, {});
  }

  deleteCoupon(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/coupon/${id}`);
  }

  deleteAllCoupon(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/coupon/deleteAll`, {ids: ids});
  }

}
