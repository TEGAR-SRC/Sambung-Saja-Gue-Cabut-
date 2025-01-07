import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp } from '../../../shared/store/action/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            AlertComponent, ButtonComponent
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {

  public form: FormGroup;
  public email: string;
  public loading: boolean;

  constructor(
    public router: Router, 
    public store: Store, 
    public formBuilder: FormBuilder
  ) {
    this.email = this.store.selectSnapshot(state => state.auth.email);
    if(!this.email) this.router.navigateByUrl('/auth/login');
    this.form = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch( new VerifyEmailOtp({ 
        email: this.email, 
        token: this.form.value.otp
      })).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/update-password'); 
          }
        }
      );
    }
  }
  
}
