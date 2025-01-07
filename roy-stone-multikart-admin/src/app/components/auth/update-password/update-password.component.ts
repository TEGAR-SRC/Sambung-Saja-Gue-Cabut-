import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { UpdatePassword } from '../../../shared/store/action/auth.action';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            CommonModule, AlertComponent, ButtonComponent
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  public form: FormGroup;
  public email: string;
  public token: number;
  public show: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public  router: Router
  ) {
    this.email = this.store.selectSnapshot(state => state.auth.email);
    this.token = this.store.selectSnapshot(state => state.auth.token);
    if(!this.email && !this.token) this.router.navigateByUrl('/auth/login');
    this.form = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(
          new UpdatePassword({
            email: this.email,
            token: Number(this.token),
            password: this.form.value.newPassword,
            password_confirmation: this.form.value.confirmPassword,
          })
      ).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/login'); 
          }     
        }
      );
    }
  }
  
}
