import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { mergeMap, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CreateFaq, EditFaq, UpdateFaq } from '../../../shared/store/action/faq.action';
import { Faq } from '../../../shared/interface/faq.interface';
import { FaqState } from '../../../shared/store/state/faq.state';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-faq',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './form-faq.component.html',
  styleUrl: './form-faq.component.scss'
})
export class FormFaqComponent {

  @Input() type: string;

  public form: FormGroup;
  public faq: Faq | null;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl(true)
      });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditFaq(params['id']))
                      .pipe(mergeMap(() => this.store.select(FaqState.selectedFaq)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(faq => {
        this.faq = faq;
        this.form.patchValue({
          title: this.faq?.title,
          description: this.faq?.description,
          status: this.faq?.status
        });
      });
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateFaq(this.form.value);

    if(this.type == 'edit' && this.faq?.id) {
      action = new UpdateFaq(this.form.value, this.faq.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
            this.router.navigateByUrl('/faq');
        }
      });
    }
  }

}
