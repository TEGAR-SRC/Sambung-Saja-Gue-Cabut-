import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { debounceTime, mergeMap, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import * as media from '../../../shared/data/media-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { Menu, MenuModel } from '../../../shared/interface/menu.interface';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { CreateMenu, EditMenu, UpdateMenu } from '../../../shared/store/action/menu.action';
import { GetPages } from '../../../shared/store/action/page.action';
import { GetProducts } from '../../../shared/store/action/product.action';
import { BlogState } from '../../../shared/store/state/blog.state';
import { MenuState } from '../../../shared/store/state/menu.state';
import { PageState } from '../../../shared/store/state/page.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldsComponent, ImageUploadComponent,
            TranslateModule, Select2Module, AdvanceDropdownComponent, ButtonComponent],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss'
})
export class FormMenuComponent {

  @Input() type: string;

  @Select(MenuState.menu) menu$: Observable<MenuModel>;
  @Select(ProductState.products) products$: Observable<Select2Data>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(PageState.pages) page$: Observable<Select2Data>;

  public form: FormGroup;
  public menu: Menu;
  public selectedMenu: Menu[];
  public mediaConfig = media.mediaConfig;
  public colors = ["bg-danger", "bg-dark", "bg-success", "bg-warning"]
  private destroy$ = new Subject<void>();
  private search = new Subject<string>();

  public link_type = [
    {
      value: 'sub',
      label: 'Sub',
    },
    {
      value: 'link',
      label: 'Link',
    },
  ]

  public target = [
    {
      value: 'product',
      label: 'Product',
    },
    {
      value: 'blog',
      label: 'Blog',
    },
  ]

  public megaMenuLayout = [
    {
      value: 'simple',
      label: 'Simple',
      image: 'assets/images/menu/menu_6.png'
    },
    {
      value: 'link_with_image',
      label: 'Link With Image',
      image: 'assets/images/menu/menu_1.png'

    },
    {
      value: 'side_banner',
      label: 'Side Banner',
      image: 'assets/images/menu/menu_3.png'

    },
    {
      value: 'bottom_banner',
      label: 'Bottom Banner',
      image: 'assets/images/menu/menu_4.png'

    },
    {
      value: 'product_box',
      label: 'Product Box',
      image: 'assets/images/menu/menu_2.png'
    },
    {
      value: 'blog_box',
      label: 'Blog Box',
      image: 'assets/images/menu/menu_5.png'
    },
  ]

  public filter = {
    'search': '',
    'paginate': 15,
    'ids': '',
    'with_union_products': 0,
    'is_approved': 1
  };

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      link_type: new FormControl('sub'),
      path: new FormControl(''),
      is_target_blank: new FormControl(0),
      set_page_link: new FormControl(''), 
      parent_id: new FormControl(), 
      mega_menu: new FormControl(1),
      mega_menu_type: new FormControl('simple'),
      badge_text: new FormControl(''),
      badge_color: new FormControl(''),
      product_ids: new FormControl([]), 
      blog_ids: new FormControl([]), 
      banner_image_id: new FormControl(),
      item_image_id: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBlogs({status: 1}));
    this.store.dispatch(new GetProducts(this.filter));
    this.store.dispatch(new GetPages({status: 1}));

    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.renderer.addClass(this.document.body, 'loader-none');
        this.filter['search'] = inputValue; 
        this.store.dispatch(new GetProducts(this.filter));
    });

    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditMenu(params['id']))
                      .pipe(mergeMap(() => this.store.select(MenuState.selectedMenu)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(menu => {
        if(menu?.product_ids){
          this.filter['paginate'] = menu?.product_ids?.length >= 15 ? menu?.product_ids?.length: 15;
          this.filter['ids'] = menu?.product_ids?.join();
          this.filter['with_union_products'] = menu?.product_ids?.length ? menu?.product_ids?.length >= 15 ? 0 : 1 : 0; 
        }
        this.menu = menu!;
        this.form.patchValue({
          title: this.menu.title,
          link_type: this.menu.link_type,
          path: this.menu.path,
          parent_id: this.menu.parent_id, 
          mega_menu: this.menu.mega_menu,
          mega_menu_type: this.menu.mega_menu_type,
          set_page_link: this.menu.set_page_link,
          badge_text: this.menu.badge_text,
          is_target_blank:  this.menu.is_target_blank,
          badge_color: this.menu.badge_color,
          product_ids: this.menu.product_ids, 
          blog_ids: this.menu.blog_ids, 
          banner_image_id: this.menu.banner_image_id,
          item_image_id: this.menu.item_image_id,
      });
    })

    this.form.controls['mega_menu_type'].valueChanges.subscribe(data => {
      if(data === 'side_banner' || data === 'bottom_banner'){
        this.form.setControl('banner_image_id', new FormControl('',  [Validators.required]));
      } else {
        this.form.setControl('banner_image_id', new FormControl(''));
      }
    })

    this.form.controls['link_type'].valueChanges.subscribe(data => {
      if(data === 'sub') {
        this.form.setControl('path',new FormControl(''));
        this.form.setControl('is_target_blank', new FormControl(''));
      } else {
        this.form.setControl('path', new FormControl(this.menu ? this.menu.path : '', [Validators.required]));
        this.form.setControl('mega_menu', new FormControl(this.menu ? this.menu.mega_menu : 0, [Validators.required]));
        this.form.setControl('is_target_blank', new FormControl(this.menu ? this.menu.is_target_blank : 0, [Validators.required]));
      }
    })

    this.form.controls['badge_text'].valueChanges.subscribe(data => {
      if(!data?.length) {
        this.form.setControl('badge_color', new FormControl(''));
      } else {
        this.form.setControl('badge_color', new FormControl(this.menu ? this.menu.badge_color : 'bg-danger', [Validators.required]));
      }
    })

    this.form.controls['set_page_link'].valueChanges.subscribe(data => {
      if(!data?.length) {
        this.form.setControl('badge_color',new FormControl(''));
      } else {
        this.form.setControl('is_target_blank', new FormControl(0, [Validators.required]))
        this.form.setControl('badge_color', new FormControl(this.menu ? this.menu.badge_color : 'bg-danger', [Validators.required]));
      }
    })

  }

  setPage(data: Select2UpdateEvent){
    if(data && data.value){
      let option: any = data.component.option
      this.form.controls['path'].setValue(`page/${option.value}`)
    } else {
      this.form.controls['path'].setValue(this.menu ? this.menu.path : '')
    }
  }

  selectItem(data: number[]) {
    if(Array.isArray(data) && data.length) {
      this.form.controls['parent_id'].setValue(data[0]);
      this.form.controls['mega_menu'].setValue(0)
      this.menu$.subscribe(res => this.selectedMenu = res.data.filter(id => data?.includes(id.id!)));
    } else {
      this.form.controls['parent_id'].setValue('');
      this.form.controls['mega_menu'].setValue(1)

    }
  }

  selectThumbnail(data: Attachment, key: string) {
    if(!Array.isArray(data)) {
      this.form.controls[key].setValue(data ? data.id : null);
    }
  }

  productDropdown(event: Select2){
    if(event['innerSearchText']){
      this.search.next('');
    }
  }

  searchProduct(event: Select2SearchEvent){
    this.search.next(event.search);
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateMenu(this.form.value);
    
    if(this.type == 'edit' && this.menu?.id) {
      action = new UpdateMenu(this.form.value, this.menu.id)
    }
    
    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => { 
          if(this.type == 'create'){
            this.form.reset();
            this.form.controls['banner_image_id'].setValue('');
            this.form.controls['item_image_id'].setValue('');
            this.form.controls['mega_menu'].setValue(1);
            this.form.controls['link_type'].setValue('sub');
          }else {
            this.router.navigateByUrl('/menu');
          }
        }
      });
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
