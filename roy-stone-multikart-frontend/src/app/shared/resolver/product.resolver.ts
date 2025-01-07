import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProductBySlug } from '../store/action/product.action';

export const ProductResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetProductBySlug(route.paramMap.get('slug')!));
};
