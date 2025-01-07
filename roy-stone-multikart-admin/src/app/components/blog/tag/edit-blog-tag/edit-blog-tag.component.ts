import { Component } from '@angular/core';
import { EditTagComponent } from '../../../tag/edit-tag/edit-tag.component';

@Component({
  selector: 'app-edit-blog-tag',
  standalone: true,
  imports: [EditTagComponent],
  templateUrl: './edit-blog-tag.component.html',
  styleUrl: './edit-blog-tag.component.scss'
})
export class EditBlogTagComponent {

}
