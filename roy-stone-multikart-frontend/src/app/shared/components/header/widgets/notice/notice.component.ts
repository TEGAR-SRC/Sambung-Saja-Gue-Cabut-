import { Component, Input } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { TopBarContent } from '../../../../interface/theme-option.interface';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [SwiperModule],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {

  @Input() content: TopBarContent[] | undefined;

}
