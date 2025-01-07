import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormProductComponent } from '../form-product/form-product.component';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [PageWrapperComponent, FormProductComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

}
