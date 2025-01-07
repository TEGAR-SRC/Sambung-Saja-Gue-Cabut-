import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../../shared/store/action/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            RouterModule, AlertComponent, ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form: FormGroup;
  public reCaptcha: boolean = true;

  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // recaptcha: new FormControl(null, Validators.required),
    });
    // this.setting$.subscribe(setting => {
    //   if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
    //     this.form.removeControl('recaptcha');
    //     this.reCaptcha = false;
    //   } else {
    //     this.form.setControl('recaptcha', new FormControl(null, Validators.required))
    //     this.reCaptcha = true;
    //   }
    // });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new Login(this.form.value)).subscribe({
          complete: () => {
            this.router.navigateByUrl('/dashboard');
          }
        }
      );
    }
  }
  
}
