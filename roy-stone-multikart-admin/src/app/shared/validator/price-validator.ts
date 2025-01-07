import { FormControl } from '@angular/forms';

export function priceValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
  
    if (value === null || value === undefined || value === '') {
      return null; // allow empty values
    }
  
    const regex = /^\d+(\.\d{1,2})?$/; // regex for decimal values with up to 2 decimal places
    if (!regex.test(value)) {
      return { 'invalidPrice': true }; // return error if value is not a valid price
    }
  
    return null; // return null if value is valid
}