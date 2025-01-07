import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Stores, StoresModel } from "../interface/store.interface";

@Injectable({
  providedIn: "root",
})
export class StoreService {

  constructor(private http: HttpClient) {}

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store`, { params: payload });
  }

  createStore(payload: Stores): Observable<Stores> {
    return this.http.post<Stores>(`${environment.URL}/store`, payload);
  }

  editStore(id: number): Observable<Stores> {
    return this.http.get<Stores>(`${environment.URL}/store/${id}`);
  }

  updateStore(id: number, payload: Stores): Observable<Stores> {
    return this.http.put<Stores>(`${environment.URL}/store/${id}`, payload);
  }

  updateStoreStatus(id: number, status: boolean): Observable<Stores> {
    return this.http.put<Stores>(`${environment.URL}/store/${id}/${status}`, {});
  }

  approveStoreStatus(id: number, status: boolean): Observable<Stores> {
    return this.http.put<Stores>(`${environment.URL}/store/approve/${id}/${status}`, {});
  }

  deleteStore(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/store/${id}`);
  }

  deleteAllStore(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/store/deleteAll`, { ids: ids});
  }

}
