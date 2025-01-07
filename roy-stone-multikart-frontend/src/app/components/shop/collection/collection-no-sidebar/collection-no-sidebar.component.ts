import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionSortComponent } from '../widgets/collection-sort/collection-sort.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { Option } from '../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-collection-no-sidebar',
  standalone: true,
  imports: [CommonModule, BannerComponent, CollectionSortComponent,
            SidebarComponent, CollectionProductsComponent],
  templateUrl: './collection-no-sidebar.component.html',
  styleUrl: './collection-no-sidebar.component.scss'
})
export class CollectionNoSidebarComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }
}
