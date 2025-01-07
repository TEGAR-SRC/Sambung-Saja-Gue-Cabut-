import { Component } from '@angular/core';
import { CategoryComponent } from '../../../category/category.component';

@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent {

}
