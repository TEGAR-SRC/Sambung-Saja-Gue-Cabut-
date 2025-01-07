import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormProductComponent } from '../form-product/form-product.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [PageWrapperComponent, FormProductComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

}
