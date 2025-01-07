import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { categorySlider } from '../../../data/owl-carousel';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { CategoryState } from '../../../store/state/category.state';
import { ButtonComponent } from '../button/button.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { AttributeService } from '../../../services/attribute.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CarouselModule, TranslateModule , RouterModule,
            ButtonComponent,NoDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  @Input() categoryIds: number[] = [];
  @Input() style: string = 'vertical';
  @Input() image?: string;
  @Input() slider: boolean;
  @Input() options: OwlOptions = categorySlider;

  public categories: Category[];
  public selectedCategorySlug: string[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService) {
    this.route.queryParams.subscribe(params => {
      this.selectedCategorySlug = params['category'] ? params['category'].split(',') : [];
    });
    this.category$.subscribe(res => this.categories = res.data.map(category => category ));
  }

  ngOnChanges() {
    if(this.categoryIds && this.categoryIds.length) {
      this.category$.subscribe(res => this.categories = res.data.filter(category => this.categoryIds?.includes(category.id)));
    }

    if(this.style == 'vegetable'){
      this.options = {
        ...this.options,
        responsive: {
          ...this.options.responsive,
          768: {
            items: 4
          },
          900: {
            items: 5
          },
          1300: {
            items: 7
          },
        }
      }
    }
  }

  redirectToCollection(slug: string) {
    let index = this.selectedCategorySlug.indexOf(slug);
    if(index === -1)
      this.selectedCategorySlug.push(slug);
    else
      this.selectedCategorySlug.splice(index,1);

    this.router.navigate(['/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategorySlug.length ? this.selectedCategorySlug?.join(',') : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }
}
