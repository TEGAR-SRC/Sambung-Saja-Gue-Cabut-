import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormBlogComponent } from '../form-blog/form-blog.component';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [PageWrapperComponent, FormBlogComponent],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss'
})
export class EditBlogComponent {

}
