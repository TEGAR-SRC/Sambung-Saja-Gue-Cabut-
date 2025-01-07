import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetCategoryBySlug } from '../store/action/category.action';

export const CategoryResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetCategoryBySlug(route.paramMap.get('slug')!));
};
