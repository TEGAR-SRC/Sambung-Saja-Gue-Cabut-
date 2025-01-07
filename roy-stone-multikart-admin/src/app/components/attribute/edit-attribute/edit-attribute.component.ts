import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormAttributeComponent } from '../form-attribute/form-attribute.component';

@Component({
  selector: 'app-edit-attribute',
  standalone: true,
  imports: [PageWrapperComponent, FormAttributeComponent],
  templateUrl: './edit-attribute.component.html',
  styleUrl: './edit-attribute.component.scss'
})
export class EditAttributeComponent {

}
