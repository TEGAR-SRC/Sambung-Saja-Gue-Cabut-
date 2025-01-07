import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormBrandComponent } from '../form-brand/form-brand.component';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [PageWrapperComponent, FormBrandComponent],
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.scss'
})
export class EditBrandComponent {

}
