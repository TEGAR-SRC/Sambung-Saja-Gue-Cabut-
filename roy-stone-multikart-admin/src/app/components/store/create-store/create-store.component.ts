import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormStoreComponent } from '../form-store/form-store.component';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [PageWrapperComponent, FormStoreComponent],
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.scss'
})
export class CreateStoreComponent {

}
