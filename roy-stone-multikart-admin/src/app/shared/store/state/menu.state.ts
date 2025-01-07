import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { MenuService } from "../../services/menu.service";
import { CreateMenu, DeleteMenu, EditMenu, GetMenu, UpdateMenu, UpdateSortMenu } from "../action/menu.action";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";
import { Menu } from "../../interface/menu.interface";
 

export class MenuStateModel {
  menu = {
    data: [] as Menu[],
    total: 0
  }
  selectedMenu: Menu | null;
}

@State<MenuStateModel>({
  name: "menu",
  defaults: {
    menu: {
      data: [],
      total: 0
    },
    selectedMenu: null
  },
})

@Injectable()
export class MenuState {

  constructor(private notificationService: NotificationService,
     private menuService: MenuService,
     private store: Store,
     private router: Router) {}

  @Selector()
  static menu(state: MenuStateModel) {
    return state.menu;
  }

  @Selector()
  static selectedMenu(state: MenuStateModel) {
    return state.selectedMenu;
  }

  @Action(GetMenu)
  getMenu(ctx: StateContext<MenuStateModel>, action: GetMenu) {
    return this.menuService.getMenu(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            menu: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateMenu)
  create(ctx: StateContext<MenuStateModel>, action: CreateMenu) {
    return this.menuService.createMenu(action.payload).pipe(
      tap({
        complete:() => {
          this.store.dispatch(new GetMenu());
          this.notificationService.showSuccess('Menu Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
   
  @Action(EditMenu)
  edit(ctx: StateContext<MenuStateModel>, { id }: EditMenu) {
    return this.menuService.editMenu(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedMenu: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateMenu)
  update(ctx: StateContext<MenuStateModel>, { payload, id }: UpdateMenu) {
    return this.menuService.updateMenu(id, payload).pipe(
      tap({
        complete:() => {
          this.notificationService.showSuccess('Menu Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateSortMenu)
  updateShort(ctx: StateContext<MenuStateModel>, action: UpdateSortMenu) {
    return this.menuService.updateSortMenu(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            menu: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Menu Sequence Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteMenu)
  delete(ctx: StateContext<MenuStateModel>, { id }: DeleteMenu) {
    return this.menuService.deleteMenu(id).pipe(
      tap({
        next: result => { 
          this.store.dispatch(new GetMenu());
          this.router.navigateByUrl('/menu');
        },
        complete:() => {
         
          this.notificationService.showSuccess('Menu Deleted Successfully.');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}