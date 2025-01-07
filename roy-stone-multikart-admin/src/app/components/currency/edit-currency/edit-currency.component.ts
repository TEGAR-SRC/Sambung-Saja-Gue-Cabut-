import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormCurrencyComponent } from '../form-currency/form-currency.component';

@Component({
  selector: 'app-edit-currency',
  standalone: true,
  imports: [PageWrapperComponent, FormCurrencyComponent],
  templateUrl: './edit-currency.component.html',
  styleUrl: './edit-currency.component.scss'
})
export class EditCurrencyComponent {

}
