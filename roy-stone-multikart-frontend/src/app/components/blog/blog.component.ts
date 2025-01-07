import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { BlogState } from '../../shared/store/state/blog.state';
import { ThemeOptionState } from '../../shared/store/state/theme-option.state';

import { GetBlogs } from '../../shared/store/action/blog.action';

import { BlogModel } from '../../shared/interface/blog.interface';
import { breadcrumb } from '../../shared/interface/breadcrumb.interface';
import { Option } from '../../shared/interface/theme-option.interface';

import { BlogService } from '../../shared/services/blog.service';
import { PaginationComponent } from '../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../shared/components/widgets/no-data/no-data.component';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            SidebarComponent, BreadcrumbComponent, PaginationComponent, NoDataComponent, SkeletonBlogComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  @Select(BlogState.blog) blog$: Observable<BlogModel>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Blogs",
    items: []
  }

  public filter = {
    'page': 1, // Current page number
    'paginate': 12, // Display per page,
    'status': 1,
    'category': '',
    'tag': ''
  };

  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);
  public totalItems: number = 0;

  public style: string;
  public sidebar: string = 'left_sidebar';

  constructor(private store: Store, private route: ActivatedRoute,
    public blogService: BlogService) {
    this.route.queryParams.subscribe(params => {
      this.filter.category = params['category'] ? params['category'] : '';
      this.filter.tag = params['tag'] ? params['tag'] : ''

      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter.category ? `Blogs: ${this.filter.category.replaceAll('-', ' ')}` :
              this.filter.tag ? `Blogs: ${this.filter.tag.replaceAll('-', ' ')}` : 'Blogs';
      this.breadcrumb.items.push({ label: 'Blogs', active: true });

      this.store.dispatch(new GetBlogs(this.filter));

      // For Demo Purpose only
      if(params['style']) {
        this.style = params['style'];
      }

      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      }

      if(!params['style'] && !params['sidebar']) {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.style = theme?.blog?.blog_style;
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }

    });
    this.blog$.subscribe(blog => this.totalItems = blog?.total);
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetBlogs(this.filter));
  }
}
