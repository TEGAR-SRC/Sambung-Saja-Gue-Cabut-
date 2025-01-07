import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
  selector: 'app-collection-top-filter',
  standalone: true,
  imports: [CommonModule, BannerComponent, CollectionProductsComponent],
  templateUrl: './collection-top-filter.component.html',
  styleUrl: './collection-top-filter.component.scss'
})
export class CollectionTopFilterComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }
}
