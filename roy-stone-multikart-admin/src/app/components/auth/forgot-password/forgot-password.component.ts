import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import { Router } from '@angular/router';
import { ForgotPassWord } from '../../../shared/store/action/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            AlertComponent, ButtonComponent
],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  public form: FormGroup;
  public reCaptcha: boolean = true;

  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(private store: Store, 
    public router: Router, 
    public formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      recaptcha: ["", [Validators.required]]
    });
    this.setting$.subscribe(seting => {
       if((seting?.google_reCaptcha && !seting?.google_reCaptcha.status) || !seting?.google_reCaptcha) {
        this.form.removeControl('recaptcha');
        this.reCaptcha = false;
      } else {
        this.form.setControl('recaptcha', new FormControl(null, Validators.required))
        this.reCaptcha = true;
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new ForgotPassWord(this.form.value)).subscribe({
        complete: () => { 
          this.router.navigateByUrl('/auth/otp'); 
        }     
      });
    }
  }
  
}
