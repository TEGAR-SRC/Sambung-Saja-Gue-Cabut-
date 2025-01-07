import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BlogState } from '../../../shared/store/state/blog.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { TagState } from '../../../shared/store/state/tag.state';
import { Observable, Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { TagModel } from '../../../shared/interface/tag.interface';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { Blog } from '../../../shared/interface/blog.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { mediaConfig } from '../../../shared/data/media-config';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetTags } from '../../../shared/store/action/tag.action';
import { CreateBlog, EditBlog, UpdateBlog } from '../../../shared/store/action/blog.action';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, NgxEditorModule, FormFieldsComponent,
            ImageUploadComponent, AdvanceDropdownComponent, ButtonComponent
  ],
  templateUrl: './form-blog.component.html',
  styleUrl: './form-blog.component.scss'
})
export class FormBlogComponent {

  @Input() type: string;

  @Select(BlogState.selectedBlog) blog$: Observable<Blog>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(TagState.tag) tag$: Observable<TagModel>;

  public form: FormGroup;
  public id: number;
  public selectedCategories: number[] = [];
  public selectedTags: number[] = [];
  public editor: Editor;
  public mediaConfig = mediaConfig;
  public textArea = new FormControl('')
  public isCodeEditor = true;
  public html = '';
  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.store.dispatch(new GetCategories({type: 'post'}));
    this.store.dispatch(new GetTags({type: 'post'}));
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(),
      content: new FormControl(),
      meta_title: new FormControl(),
      meta_description: new FormControl(),
      blog_thumbnail_id: new FormControl('', [Validators.required]),
      blog_meta_image_id: new FormControl(''),
      categories: new FormControl(),
      tags: new FormControl(),
      is_featured: new FormControl(0),
      is_sticky: new FormControl(0),
      status: new FormControl(1),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditBlog(params['id']))
                      .pipe(mergeMap(() => this.store.select(BlogState.selectedBlog)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(blog => {
        this.id = blog?.id!;
        this.selectedCategories = blog?.categories.map(value => value?.id!)!;
        this.selectedTags = blog?.tags.map(value => value?.id!)!;
        this.form.patchValue({
          title: blog?.title,
          description: blog?.description,
          content: blog?.content,
          blog_thumbnail_id: blog?.blog_thumbnail_id,
          categories: this.selectedCategories,
          tags: this.selectedTags,
          blog_meta_image_id: blog?.blog_meta_image_id,
          meta_title: blog?.meta_title,
          meta_description: blog?.meta_description,
          is_featured: blog?.is_featured,
          is_sticky: blog?.is_sticky,
          status: blog?.status
        });
      });

      this.editor = new Editor();
  }

  selectThumbnail(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['blog_thumbnail_id'].setValue(data ? data.id : '');
    }
  }

  selectMetaImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['blog_meta_image_id'].setValue(data ? data.id : null);
    }
  }

  selectCategoryItem(data: number[]) {
    if(Array.isArray(data)) {
      this.form.controls['categories'].setValue(data);
    }
  }

  selectTagItem(data: number[]) {
    if(Array.isArray(data)) {
      this.form.controls['tags'].setValue(data);
    }
  }

  getText(event:any){
    this.form.controls['content'].setValue(this.textArea.value)
  }

  getData(description:any){
    this.textArea.setValue(this.html)
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateBlog(this.form.value);

    if(this.type == 'edit' && this.id) {
      action = new UpdateBlog(this.form.value, this.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => { this.router.navigateByUrl('/blog'); }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
