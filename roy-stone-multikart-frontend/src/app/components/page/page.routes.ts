import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { FaqComponent } from "./faq/faq.component";
import { SearchComponent } from "./search/search.component";
import { Error404Component } from "./error404/error404.component";
import { OfferComponent } from "./offer/offer.component";
import { PageComponent } from "./page/page.component";
import { PageResolver } from "../../shared/resolver/page.resolver";

export const page: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'offers',
    component: OfferComponent
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'page/:slug',
    component: PageComponent,
    resolve: {
      data: PageResolver
    }
  },
]
