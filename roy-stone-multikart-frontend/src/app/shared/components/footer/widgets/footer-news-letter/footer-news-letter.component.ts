import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Subscription } from '../../../../store/action/subscription.action';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
  selector: 'app-footer-news-letter',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule,
            ButtonComponent
  ],
  templateUrl: './footer-news-letter.component.html',
  styleUrl: './footer-news-letter.component.scss'
})
export class FooterNewsLetterComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  
  @Input() newsLetterStyle: string;

  public newsLetterForm: FormGroup;
  public isSubmit: boolean = false;

  constructor(private store: Store, public formBuilder: FormBuilder ){
    this.newsLetterForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  submit(){
    this.isSubmit = true;
    this.newsLetterForm.markAllAsTouched();
    if(this.newsLetterForm.valid){
      this.store.dispatch(new Subscription(this.newsLetterForm.value!))
      this.newsLetterForm.reset();
      this.isSubmit = false;
    }
  }

}
