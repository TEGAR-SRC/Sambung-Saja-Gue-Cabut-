import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from '../interface/role.interface';
import { AccountState } from '../store/state/account.state';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective {

  @Input('hasPermission') permission: string | string[];

  @Select(AccountState.permissions) permissions$: Observable<Permission[]>;

  public permissions: string[] = [];

  private isViewCreated = false;

  constructor(private templateRef: TemplateRef<string>,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.permissions$.subscribe(permission => {
      this.permissions = permission?.map((value: Permission) => value?.name);
      this.checkPermissions();
    });
  }

  private checkPermissions() {
    if (!Array.isArray(this.permission) && this.permissions?.includes(this.permission) || !this.permission) {
      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      }
    } else if(Array.isArray(this.permission) && this.permission?.length &&
      this.permission.every(action => this.permissions?.includes(action))) {
      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      }
    } else {
      if (this.isViewCreated) {
        this.viewContainerRef.clear();
        this.isViewCreated = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['permission'] && !changes['permission'].firstChange) {
      this.checkPermissions();
    }
  }

}
