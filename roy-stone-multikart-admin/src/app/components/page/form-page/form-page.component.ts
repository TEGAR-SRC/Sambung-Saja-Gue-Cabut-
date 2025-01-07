import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PageState } from '../../../shared/store/state/page.state';
import { Observable, Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { Page } from '../../../shared/interface/page.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { mediaConfig } from '../../../shared/data/media-config';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePage, EditPage, UpdatePage } from '../../../shared/store/action/page.action';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            NgxEditorModule, CommonModule, FormFieldsComponent,
            ImageUploadComponent, ButtonComponent
  ],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {

  @Input() type: string;

  @Select(PageState.selectedPage) page$: Observable<Page>;

  private destroy$ = new Subject<void>();
  public html = ''
  public form: FormGroup;
  public id: number;
  public mediaConfig = mediaConfig;
  public editor: Editor;
  public isCodeEditor = true;
  public textArea = new FormControl('');

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(),
      meta_title: new FormControl(),
      meta_description: new FormControl(),
      page_meta_image_id: new FormControl(),
      status: new FormControl(1)
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditPage(params['id']))
                      .pipe(mergeMap(() => this.store.select(PageState.selectedPage)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(page => {
        this.id = page?.id!;
        this.form.patchValue({
          title: page?.title,
          content: page?.content,
          meta_title: page?.meta_title,
          meta_description: page?.meta_description,
          status: page?.status
        });
      });

      this.editor = new Editor();
  }

  selectMetaImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['page_meta_image_id'].setValue(data ? data.id : null);
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
    let action = new CreatePage(this.form.value);

    if(this.type == 'edit' && this.id) {
      action = new UpdatePage(this.form.value, this.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/page');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
