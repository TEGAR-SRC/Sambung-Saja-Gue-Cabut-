import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetBrandBySlug } from '../store/action/brand.action';

export const BrandResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetBrandBySlug(route.paramMap.get('slug')!));
};
