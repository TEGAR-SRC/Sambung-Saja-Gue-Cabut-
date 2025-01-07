import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetBlogBySlug } from '../store/action/blog.action';

export const BlogResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetBlogBySlug(route.paramMap.get('slug')!));
};
