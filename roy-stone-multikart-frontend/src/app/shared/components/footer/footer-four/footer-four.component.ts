import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterLogoComponent } from '../widgets/footer-logo/footer-logo.component';
import { FooterLinksComponent } from '../widgets/footer-links/footer-links.component';
import { FooterSocialLinksComponent } from '../widgets/footer-social-links/footer-social-links.component';
import { FooterContactComponent } from '../widgets/footer-contact/footer-contact.component';
import { FooterCopyrightComponent } from '../widgets/footer-copyright/footer-copyright.component';
import { FooterPaymentOptionsComponent } from '../widgets/footer-payment-options/footer-payment-options.component';
import { FooterOneComponent } from '../footer-one/footer-one.component';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-footer-four',
  standalone: true,
  imports: [CommonModule, TranslateModule,FooterLogoComponent,
            FooterContactComponent,FooterLinksComponent,FooterSocialLinksComponent,
            FooterCopyrightComponent, FooterPaymentOptionsComponent, FooterOneComponent],
  templateUrl: './footer-four.component.html',
  styleUrl: './footer-four.component.scss'
})
export class FooterFourComponent {

  @Input() data: Option | null;
  @Input() logo: string | undefined;

  public StorageURL = environment.storageURL;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false,
    help_center: false
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
