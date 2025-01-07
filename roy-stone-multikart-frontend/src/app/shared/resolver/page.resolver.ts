import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetPageBySlug } from '../store/action/page.action';

export const PageResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetPageBySlug(route.paramMap.get('slug')!));
};
