import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RoleState } from '../../../shared/store/state/role.state';
import { Observable, Subject, forkJoin, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { countryCodes } from '../../../shared/data/country-code';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../shared/validator/password-match';
import { GetRoles } from '../../../shared/store/action/role.action';
import { CreateUser, EditUser, UpdateUser } from '../../../shared/store/action/user.action';
import { UserState } from '../../../shared/store/state/user.state';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            Select2Module, CommonModule, ButtonComponent, FormFieldsComponent],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {

  @Input() type: string;

  @Select(RoleState.roles) role$: Observable<Select2Data>;

  public form: FormGroup;
  public id: number;
  public codes = countryCodes;

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      country_code: new FormControl('1', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      status: new FormControl(1)
    },{
      validator : CustomValidators.MatchValidator('password', 'password_confirmation')
    })
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  ngOnInit() {
    const roles$ = this.store.dispatch(new GetRoles());
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditUser(params['id']))
                      .pipe(mergeMap(() => this.store.select(UserState.selectedUser)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.id = user?.id!;
        forkJoin([roles$]).subscribe({
          complete: () => {
            this.form.patchValue({
              name: user?.name,
              email: user?.email,
              phone: user?.phone,
              country_code: user?.country_code,
              role_id: user?.role ? user?.role.id : null,
              status: user?.status
            });
          }
        });
      });
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateUser(this.form.value);

    if(this.type == 'edit' && this.id) {
      this.form.removeControl('password');
      this.form.removeControl('password_confirmation');
      action = new UpdateUser(this.form.value, this.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/user');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
