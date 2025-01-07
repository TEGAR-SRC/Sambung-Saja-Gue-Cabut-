import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';

import { BlogState } from '../../../../shared/store/state/blog.state';

import { BlogSlider } from '../../../../shared/data/owl-carousel';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService } from '../../../../shared/services/blog.service';
import { SkeletonBlogComponent } from '../../../blog/skeleton-blog/skeleton-blog.component';

@Component({
  selector: 'app-theme-blog',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule,
            TranslateModule, NoDataComponent,SkeletonBlogComponent],
  templateUrl: './theme-blog.component.html',
  styleUrl: './theme-blog.component.scss'
})
export class ThemeBlogComponent {

  @Select(BlogState.blog) blog$: Observable<BlogModel>;

  @Input() blogIds: number[] = [];
  @Input() blogEffect: string;
  @Input() type: string;
  @Input() option: OwlOptions = BlogSlider;

  public blogs: Blog[] = [];
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);

  constructor(public blogService: BlogService){}

  ngOnChanges() {
    if (Array.isArray(this.blogIds)) {
      this.blog$.subscribe(blogs => {
        this.blogs = blogs?.data.filter(blog => this.blogIds?.includes(blog?.id!));
      });
    }
  }
}
