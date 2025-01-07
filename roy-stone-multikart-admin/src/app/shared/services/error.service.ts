import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  getClientErrorMessage(error: Error): string {    
    if (isPlatformBrowser(this.platformId) && navigator) {
      return navigator.onLine ? 
        error.message ? error.message : 'Something Went Wrong' : 'No Internet Connection';
    }
    // Return a fallback error message if the navigator is not available
    return 'An error occurred.';
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return error.message;
  } 

}
