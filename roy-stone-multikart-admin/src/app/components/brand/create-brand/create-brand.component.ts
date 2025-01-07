import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormBrandComponent } from '../form-brand/form-brand.component';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [PageWrapperComponent, FormBrandComponent],
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.scss'
})
export class CreateBrandComponent {

}
