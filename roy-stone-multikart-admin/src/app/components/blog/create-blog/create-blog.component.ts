import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormBlogComponent } from '../form-blog/form-blog.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [PageWrapperComponent, FormBlogComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {

}
