import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-fields',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.scss'
})
export class FormFieldsComponent {

  @Input() class: string = "mb-4 row align-items-center g-2";
  @Input() label: string;
  @Input() labelClass: string = "form-label-title col-sm-3 mb-0";
  @Input() gridClass: string = "col-sm-9";
  @Input() for: string;
  @Input() required: Boolean;
  
}
