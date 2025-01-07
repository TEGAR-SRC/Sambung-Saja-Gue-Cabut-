import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormTaxComponent } from '../form-tax/form-tax.component';

@Component({
  selector: 'app-edit-tax',
  standalone: true,
  imports: [PageWrapperComponent, FormTaxComponent],
  templateUrl: './edit-tax.component.html',
  styleUrl: './edit-tax.component.scss'
})
export class EditTaxComponent {

}
