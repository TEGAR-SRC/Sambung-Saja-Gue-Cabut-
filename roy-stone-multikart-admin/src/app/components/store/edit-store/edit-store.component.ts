import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormStoreComponent } from '../form-store/form-store.component';

@Component({
  selector: 'app-edit-store',
  standalone: true,
  imports: [PageWrapperComponent, FormStoreComponent],
  templateUrl: './edit-store.component.html',
  styleUrl: './edit-store.component.scss'
})
export class EditStoreComponent {

}
