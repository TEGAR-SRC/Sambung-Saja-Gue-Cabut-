import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormRoleComponent } from '../form-role/form-role.component';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [PageWrapperComponent, FormRoleComponent],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {

}
