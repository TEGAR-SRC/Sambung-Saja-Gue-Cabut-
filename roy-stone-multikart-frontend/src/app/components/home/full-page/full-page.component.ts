import { Component, Input, SimpleChanges } from '@angular/core';
import { Banners, FullPage } from '../../../shared/interface/theme.interface';
import SwiperCore, { Navigation, Pagination, Autoplay, Mousewheel } from "swiper";
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
  selector: 'app-full-page',
  standalone: true,
  imports: [SwiperModule, CommonModule, ImageLinkComponent],
  templateUrl: './full-page.component.html',
  styleUrl: './full-page.component.scss'
})
export class FullPageComponent {

  @Input() data?: FullPage;
  @Input() slug?: string;

  public filteredBanners: Banners[];

  ngOnChanges(change: SimpleChanges){
    this.filteredBanners = change['data']?.currentValue?.content?.home_banner?.banners?.filter((banner: Banners) => {
      return banner.status
    })
  }
}
