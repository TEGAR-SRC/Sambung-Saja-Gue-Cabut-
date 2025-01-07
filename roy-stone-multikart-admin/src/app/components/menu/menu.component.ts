import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { MenuModel } from '../../shared/interface/menu.interface';
import { GetMenu } from '../../shared/store/action/menu.action';
import { MenuState } from '../../shared/store/state/menu.state';
import { FormMenuComponent } from './form-menu/form-menu.component';
import { MenuTreeComponent } from './menu-tree/menu-tree.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuTreeComponent, PageWrapperComponent, TranslateModule, FormMenuComponent, DragDropModule, NgbDropdownModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Input() type: string = 'create';

  @Select(MenuState.menu) menu$: Observable<MenuModel>;

  constructor(private store: Store, private router: Router){
    this.store.dispatch(new GetMenu());
  }

  create() {
    this.router.navigateByUrl('/menu');
  }

}
