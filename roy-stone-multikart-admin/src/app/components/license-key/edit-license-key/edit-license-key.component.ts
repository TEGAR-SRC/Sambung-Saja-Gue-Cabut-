import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormLicenseKeyComponent } from '../form-license-key/form-license-key.component';

@Component({
  selector: 'app-edit-license-key',
  standalone: true,
  imports: [PageWrapperComponent, FormLicenseKeyComponent],
  templateUrl: './edit-license-key.component.html',
  styleUrl: './edit-license-key.component.scss'
})
export class EditLicenseKeyComponent {

}
