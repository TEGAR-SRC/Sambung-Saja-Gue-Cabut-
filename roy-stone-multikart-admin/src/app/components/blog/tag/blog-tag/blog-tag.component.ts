import { Component } from '@angular/core';
import { TagComponent } from '../../../tag/tag.component';

@Component({
  selector: 'app-blog-tag',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './blog-tag.component.html',
  styleUrl: './blog-tag.component.scss'
})
export class BlogTagComponent {

}
