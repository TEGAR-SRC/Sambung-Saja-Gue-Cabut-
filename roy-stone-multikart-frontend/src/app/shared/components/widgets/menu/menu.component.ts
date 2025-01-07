import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog, BlogModel } from '../../../interface/blog.interface';
import { MenuModel } from '../../../interface/menu.interface';
import { Product } from '../../../interface/product.interface';
import { MenuService } from '../../../services/menu.service';
import { GetSelectedBlogs } from '../../../store/action/blog.action';
import { GetMenuProducts } from '../../../store/action/product.action';
import { BlogState } from '../../../store/state/blog.state';
import { MenuState } from '../../../store/state/menu.state';
import { ProductState } from '../../../store/state/product.state';
import { Menu } from '../../interface/menu.interface';
import { NoDataComponent } from '../no-data/no-data.component';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { LinkBoxComponent } from './link-box/link-box.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,ProductBoxComponent, LinkBoxComponent, NoDataComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Input() class: string;

  @Select(BlogState.blog) blog$: Observable<BlogModel>;
  @Select(MenuState.menu) menu$: Observable<MenuModel>;
  @Select(ProductState.menuProducts) menuProduct$: Observable<MenuModel>;

  public menu: Menu[] = [];
  public products: Product[];
  public blogs: Blog[];

  constructor(private store: Store, private router: Router, public menuService: MenuService){
    this.menu$.subscribe(menu => {
      const productIds = Array.from(new Set(this.concatDynamicProductKeys(menu, 'product_ids')));
      if(productIds && productIds.length){
        this.store.dispatch(new GetMenuProducts({ids: productIds?.join()})).subscribe({
          next: (val) => {
            this.products = val.product.menuProducts.slice(0,2);
          }
        })
      }

      const blogIds = Array.from(new Set(this.concatDynamicProductKeys(menu, 'blog_ids')));
      if(blogIds && blogIds.length){
        this.store.dispatch(new GetSelectedBlogs({status: 1, ids: blogIds?.join()})).subscribe({
          next: (val) => {
            this.blogs = val.blog.selectedBlogs.slice(0,2);
          }
        })
      }
    })
  }

  mainMenuOpen(){
    this.menuService.mainMenuToggle = true;
  }

  mainMenuClose(){
    this.menuService.mainMenuToggle = false;
  }

  redirect(path:string){
    this.router.navigateByUrl(path)
  }

  toggle(menu: Menu){
    if(!menu.active){
      this.menu.forEach(item => {
        if(this.menu.includes(menu)){
          item.active = false;
        }
      })
    }
    menu.active = !menu.active;
  }

  concatDynamicProductKeys(obj: any, keyName: string) {
    const result: number[] = [];
    function traverse(obj: any) {
      for (const key in obj) {
        if (key === keyName && Array.isArray(obj[key])) {
          result.push(...obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        }else {
          if(key === keyName && obj.product_ids){
            result.push(obj.product_ids)
          };
        }
      }
    }
    traverse(obj);
    return result;
  }
}
