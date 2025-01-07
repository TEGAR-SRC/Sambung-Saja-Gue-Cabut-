import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tag } from '../../../shared/interface/tag.interface';
import { Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTag, EditTag, UpdateTag } from '../../../shared/store/action/tag.action';
import { TagState } from '../../../shared/store/state/tag.state';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-tag',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './form-tag.component.html',
  styleUrl: './form-tag.component.scss'
})
export class FormTagComponent {

  @Input() type: string;
  @Input() tagType: string | null = 'product';

  public form: FormGroup;
  public tag: Tag | null;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(),
        type: new FormControl(this.tagType, []),
        status: new FormControl(true)
      });
  }

  ngOnChanges() {
    this.form.controls['type'].setValue(this.tagType);
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditTag(params['id']))
                      .pipe(mergeMap(() => this.store.select(TagState.selectedTag)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(tag => {
        this.tag = tag;
        this.form.patchValue({
          name: this.tag?.name,
          description: this.tag?.description,
          status: this.tag?.status
        });
      });
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateTag(this.form.value);

    if(this.type == 'edit' && this.tag?.id) {
      action = new UpdateTag(this.form.value, this.tag.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          if(this.tagType == 'post')
            this.router.navigateByUrl('/blog/tag');
          else
            this.router.navigateByUrl('/tag');
        }
      });
    }
  }

}
