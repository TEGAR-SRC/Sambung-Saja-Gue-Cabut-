import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { BlogState } from '../../../shared/store/state/blog.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';

import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Blog } from '../../../shared/interface/blog.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, TranslateModule ,BreadcrumbComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {

  @Select(BlogState.selectedBlog) blog$: Observable<Blog>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Product",
    items: []
  }

  public sidebar: string;

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute){
    this.blog$.subscribe(blog => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = blog.title;
      this.breadcrumb.items.push({ label: 'Blog', active: true }, { label: blog.title, active: false });
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      } else {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }
    });
  }
}
