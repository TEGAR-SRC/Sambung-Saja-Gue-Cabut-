import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormTaxComponent } from '../form-tax/form-tax.component';

@Component({
  selector: 'app-create-tax',
  standalone: true,
  imports: [PageWrapperComponent, FormTaxComponent],
  templateUrl: './create-tax.component.html',
  styleUrl: './create-tax.component.scss'
})
export class CreateTaxComponent {

}
