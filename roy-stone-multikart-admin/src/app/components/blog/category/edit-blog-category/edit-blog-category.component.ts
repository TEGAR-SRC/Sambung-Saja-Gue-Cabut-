import { Component } from '@angular/core';
import { EditCategoryComponent } from '../../../category/edit-category/edit-category.component';

@Component({
  selector: 'app-edit-blog-category',
  standalone: true,
  imports: [EditCategoryComponent],
  templateUrl: './edit-blog-category.component.html',
  styleUrl: './edit-blog-category.component.scss'
})
export class EditBlogCategoryComponent {

}
