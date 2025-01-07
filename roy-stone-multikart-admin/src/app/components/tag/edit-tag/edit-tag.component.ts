import { Component, Input } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormTagComponent } from '../form-tag/form-tag.component';

@Component({
  selector: 'app-edit-tag',
  standalone: true,
  imports: [PageWrapperComponent, FormTagComponent],
  templateUrl: './edit-tag.component.html',
  styleUrl: './edit-tag.component.scss'
})
export class EditTagComponent {

  @Input() tagType: string | null = 'product';

}
