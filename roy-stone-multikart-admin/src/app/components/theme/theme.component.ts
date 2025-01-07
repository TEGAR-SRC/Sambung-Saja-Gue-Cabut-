import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { ConfirmationModalComponent } from "../../shared/components/ui/modal/confirmation-modal/confirmation-modal.component";
import { Themes, ThemesModel } from '../../shared/interface/theme.interface';
import { GetThemes, UpdateTheme } from '../../shared/store/action/theme.action';
import { ThemeState } from '../../shared/store/state/theme.state';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, TranslateModule, HasPermissionDirective,
            PageWrapperComponent, ConfirmationModalComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {

  public themes: Themes[]
  public selectedTheme: number | null;
  public storageURL = environment.storageURL;

  @Select(ThemeState.themes) themes$: Observable<ThemesModel>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetThemes())
    this.themes$.subscribe(item => {
      item?.data?.map((data:Themes)=> {
        if(data.status === 1) this.selectedTheme = data.id;
      })
    })
  }

  themeRoute(route: string) {
    this.router.navigateByUrl(`/theme/${route}`)
  }

  activeTheme(theme: any) {
    this.selectedTheme = null;
    this.selectedTheme = theme.data.id!;
    this.store.dispatch(new UpdateTheme(theme.data.id, 1));
  }

}
