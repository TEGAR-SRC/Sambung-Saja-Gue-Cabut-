import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import * as data from '../../../../../shared/data/owl-carousel';
import { CommonModule } from '@angular/common';
import { CarouselComponent, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ProductContentComponent } from '../widgets/product-content/product-content.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductDetailsComponent } from '../widgets/product-details/product-details.component';
import { ProductDetailsAccordionComponent } from '../widgets/product-details-accordion/product-details-accordion.component';
import { ProductDetailsTabComponent } from '../widgets/product-details-tab/product-details-tab.component';
import { ThemeOptionService } from '../../../../../shared/services/theme-option.service';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDigitalOptionsComponent } from '../widgets/product-digital-options/product-digital-options.component';

@Component({
  selector: 'app-product-accordion',
  standalone: true,
  imports: [CommonModule, CarouselModule, NgxImageZoomModule, TranslateModule, ProductContentComponent,
            ProductInformationComponent, ProductDeliveryInformationComponent,
            PaymentOptionComponent, ProductDetailsComponent, ProductDetailsAccordionComponent, 
            ProductDetailsTabComponent, ProductDigitalOptionsComponent],
  templateUrl: './product-accordion.component.html',
  styleUrl: './product-accordion.component.scss'
})
export class ProductAccordionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  @ViewChild('thumbnailCarousel') thumbnailCarousel: CarouselComponent;

  public selectedVariation: Variation;
  public activeSlide: string = '0';
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;

  constructor(){}

  selectedVariant(variant: Variation){
    this.selectedVariation = variant;
  }

  onCarouselLoad(){
    this.activeSlide = '0';
  }

  onSlideChange(event: SlidesOutputData){
    if(this.selectedVariation && this.selectedVariation.variation_galleries.length){
      this.selectedVariation.variation_galleries.forEach((images) => {
        if(event && event.slides && event.slides[0].id && event.slides.length > 0){
          if(images.id.toString() === event.slides[0].id){
            this.activeSlide = images.id.toString();
            if(this.activeSlide){
              this.thumbnailCarousel.to(this.activeSlide);
            }
          }
        }
      })
    }else{
      if(this.thumbnailCarousel && event && event.slides && event.slides[0].id && event.slides.length > 0){
       this.activeSlide = event.slides[0].id;

       if(this.activeSlide){
         this.thumbnailCarousel.to(this.activeSlide);
       }
     }
    }
  }
}
