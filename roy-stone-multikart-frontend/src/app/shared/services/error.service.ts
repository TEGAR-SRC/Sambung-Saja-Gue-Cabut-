import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientErrorMessage(error: Error): string {
    return navigator.onLine ?
           error.message ? error.message : 'Something Went Wrong' : 'No Internet Connection';
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return error.message;
  }
}
