import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetStoreBySlug } from '../store/action/store.action';

export const StoreResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetStoreBySlug(route.paramMap.get('slug')!));
};

