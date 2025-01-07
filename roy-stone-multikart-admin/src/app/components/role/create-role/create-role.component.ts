import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormRoleComponent } from '../form-role/form-role.component';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [PageWrapperComponent, FormRoleComponent],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {

}
