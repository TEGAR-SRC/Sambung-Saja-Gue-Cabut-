import { Component } from '@angular/core';
import { CreateTagComponent } from '../../../tag/create-tag/create-tag.component';

@Component({
  selector: 'app-create-blog-tag',
  standalone: true,
  imports: [CreateTagComponent],
  templateUrl: './create-blog-tag.component.html',
  styleUrl: './create-blog-tag.component.scss'
})
export class CreateBlogTagComponent {

}
