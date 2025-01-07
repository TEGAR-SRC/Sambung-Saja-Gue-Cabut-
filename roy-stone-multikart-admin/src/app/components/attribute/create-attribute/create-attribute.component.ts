import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormAttributeComponent } from '../form-attribute/form-attribute.component';

@Component({
  selector: 'app-create-attribute',
  standalone: true,
  imports: [PageWrapperComponent, FormAttributeComponent],
  templateUrl: './create-attribute.component.html',
  styleUrl: './create-attribute.component.scss'
})
export class CreateAttributeComponent {

}
