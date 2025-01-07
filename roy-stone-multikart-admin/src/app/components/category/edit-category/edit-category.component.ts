import { Component, Input } from '@angular/core';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {

  @Input() categoryType: string | null = 'product';

}
