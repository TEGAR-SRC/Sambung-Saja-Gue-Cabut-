import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [PageWrapperComponent, FormUserComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

}
