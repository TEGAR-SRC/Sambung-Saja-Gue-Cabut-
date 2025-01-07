import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormCurrencyComponent } from '../form-currency/form-currency.component';

@Component({
  selector: 'app-create-currency',
  standalone: true,
  imports: [PageWrapperComponent, FormCurrencyComponent],
  templateUrl: './create-currency.component.html',
  styleUrl: './create-currency.component.scss'
})
export class CreateCurrencyComponent {

}
