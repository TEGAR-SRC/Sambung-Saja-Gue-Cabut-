import { Routes } from "@angular/router";
import { ThemeComponent } from "./theme.component";
import { PermissionGuard } from "../../core/guard/permission.guard";
import { Fashion1Component } from "./fashion/fashion-1/fashion-1.component";
import { Fashion2Component } from "./fashion/fashion-2/fashion-2.component";
import { Fashion3Component } from "./fashion/fashion-3/fashion-3.component";
import { Fashion4Component } from "./fashion/fashion-4/fashion-4.component";
import { Fashion5Component } from "./fashion/fashion-5/fashion-5.component";
import { Fashion6Component } from "./fashion/fashion-6/fashion-6.component";
import { Fashion7Component } from "./fashion/fashion-7/fashion-7.component";
import { Furniture1Component } from "./furniture/furniture-1/furniture-1.component";
import { Furniture2Component } from "./furniture/furniture-2/furniture-2.component";
import { FurnitureDarkComponent } from "./furniture/furniture-dark/furniture-dark.component";
import { Electronics1Component } from "./electronics/electronics-1/electronics-1.component";
import { Electronics2Component } from "./electronics/electronics-2/electronics-2.component";
import { Electronics3Component } from "./electronics/electronics-3/electronics-3.component";
import { Marketplace1Component } from "./marketplace/marketplace-1/marketplace-1.component";
import { Marketplace2Component } from "./marketplace/marketplace-2/marketplace-2.component";
import { Marketplace3Component } from "./marketplace/marketplace-3/marketplace-3.component";
import { Marketplace4Component } from "./marketplace/marketplace-4/marketplace-4.component";
import { Vegetables1Component } from "./vegetables/vegetables-1/vegetables-1.component";
import { Vegetables2Component } from "./vegetables/vegetables-2/vegetables-2.component";
import { Vegetables3Component } from "./vegetables/vegetables-3/vegetables-3.component";
import { Vegetables4Component } from "./vegetables/vegetables-4/vegetables-4.component";
import { Jewellery1Component } from "./jewellery/jewellery-1/jewellery-1.component";
import { Jewellery2Component } from "./jewellery/jewellery-2/jewellery-2.component";
import { Jewellery3Component } from "./jewellery/jewellery-3/jewellery-3.component";
import { BagComponent } from "./bag/bag.component";
import { WatchComponent } from "./watch/watch.component";
import { MedicalComponent } from "./medical/medical.component";
import { PerfumeComponent } from "./perfume/perfume.component";
import { YogaComponent } from "./yoga/yoga.component";
import { ChristmasComponent } from "./christmas/christmas.component";
import { BicycleComponent } from "./bicycle/bicycle.component";
import { MarijuanaComponent } from "./marijuana/marijuana.component";
import { GymComponent } from "./gym/gym.component";
import { ToolsComponent } from "./tools/tools.component";
import { ShoesComponent } from "./shoes/shoes.component";
import { BooksComponent } from "./books/books.component";
import { KidsComponent } from "./kids/kids.component";
import { GameComponent } from "./game/game.component";
import { BeautyComponent } from "./beauty/beauty.component";
import { SurfboardComponent } from "./surfboard/surfboard.component";
import { VideoSliderComponent } from "./video-slider/video-slider.component";
import { GogglesComponent } from "./goggles/goggles.component";
import { FlowerComponent } from "./flower/flower.component";
import { NurseryComponent } from "./nursery/nursery.component";
import { PetsComponent } from "./pets/pets.component";
import { VideoComponent } from "./video/video.component";
import { FullPageComponent } from "./full-page/full-page.component";
import { ParallaxComponent } from "./parallax/parallax.component";
import { GradientComponent } from "./gradient/gradient.component";
import { DigitalDownloadComponent } from "./digital-download/digital-download.component";
import { SingleProductComponent } from "./single-product/single-product.component";

export const themeRoutes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_one',
    component: Fashion1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_two',
    component: Fashion2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_three',
    component: Fashion3Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_four',
    component: Fashion4Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_five',
    component: Fashion5Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_six',
    component: Fashion6Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'fashion_seven',
    component: Fashion7Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'furniture_one',
    component: Furniture1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'furniture_two',
    component: Furniture2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'furniture_dark',
    component: FurnitureDarkComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'electronics_one',
    component: Electronics1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'electronics_two',
    component: Electronics2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'electronics_three',
    component: Electronics3Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'marketplace_one',
    component: Marketplace1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'marketplace_two',
    component: Marketplace2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'marketplace_three',
    component: Marketplace3Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'marketplace_four',
    component: Marketplace4Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'vegetables_one',
    component: Vegetables1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'vegetables_two',
    component: Vegetables2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'vegetables_three',
    component: Vegetables3Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'vegetables_four',
    component: Vegetables4Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'jewellery_one',
    component: Jewellery1Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'jewellery_two',
    component: Jewellery2Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'jewellery_three',
    component: Jewellery3Component,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'bag',
    component: BagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'watch',
    component: WatchComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'medical',
    component: MedicalComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'perfume',
    component: PerfumeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'yoga',
    component: YogaComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'christmas',
    component: ChristmasComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'bicycle',
    component: BicycleComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'marijuana',
    component: MarijuanaComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'gym',
    component: GymComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'tools',
    component: ToolsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'shoes',
    component: ShoesComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'kids',
    component: KidsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'beauty',
    component: BeautyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'surfboard',
    component: SurfboardComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'video_slider',
    component: VideoSliderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'goggles',
    component: GogglesComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'flower',
    component: FlowerComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'nursery',
    component: NurseryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'pets',
    component: PetsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'full_page',
    component: FullPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'parallax',
    component: ParallaxComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'gradient',
    component: GradientComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'digital_download',
    component: DigitalDownloadComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
  {
    path: 'single_product',
    component: SingleProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'theme.index'
    }
  },
]
