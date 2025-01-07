import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCompare } from '../../../store/action/compare.action';
import { CompareState } from '../../../store/state/compare.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sticky-compare',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sticky-compare.component.html',
  styleUrl: './sticky-compare.component.scss'
})
export class StickyCompareComponent {

  @Select(CompareState.compareTotal) compareTotal$: Observable<number>;

  constructor(private store: Store) {
    this.store.dispatch(new GetCompare());
  }

}
