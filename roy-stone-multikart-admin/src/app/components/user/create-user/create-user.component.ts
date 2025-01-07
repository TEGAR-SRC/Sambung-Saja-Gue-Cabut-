import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [PageWrapperComponent, FormUserComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

}
