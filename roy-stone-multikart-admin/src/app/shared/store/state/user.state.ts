import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetUsers, CreateUser, EditUser, UpdateUser, 
          UpdateUserStatus, DeleteUser, DeleteAllUser, 
          CreateUserAddress, ImportUser, ExportUser } from "../action/user.action";
import { User } from "../../interface/user.interface";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";

export class UserStateModel {
  user = {
    data: [] as User[],
    total: 0
  }
  selectedUser: User | null;
}

@State<UserStateModel>({
  name: "user",
  defaults: {
    user: {
      data: [],
      total: 0
    },
    selectedUser: null
  },
})
@Injectable()
export class UserState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private userService: UserService) {}

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }

  @Selector()
  static users(state: UserStateModel) {
    return state.user.data.map(user => {
      return { label: user?.name, value: user?.id }
    });
  }

  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UserStateModel>, action: GetUsers) {
    return this.userService.getUsers(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            user: {
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

  @Action(CreateUser)
  create(ctx: StateContext<UserStateModel>, action: CreateUser) {
    return this.userService.createUser(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            user: {
              data: [...state.user.data, result],
              total: state?.user.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('User Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditUser)
  edit(ctx: StateContext<UserStateModel>, { id }: EditUser) {
    return this.userService.editUser(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedUser: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateUser)
  update(ctx: StateContext<UserStateModel>, { payload, id }: UpdateUser) {
    return this.userService.updateUser(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const users = [...state.user.data];
            const index = users.findIndex(user => user.id === id);
            users[index] = result;

            ctx.patchState({
              ...state,
              user: {
                data: users,
                total: state.user.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('User Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateUserStatus)
  updateStatus(ctx: StateContext<UserStateModel>, { id, status }: UpdateUserStatus) {
    return this.userService.updateUserStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const users = [...state.user.data];
            const index = users.findIndex(user => user.id == id);
            users[index] = result;

            ctx.patchState({
              ...state,
              user: {
                data: users,
                total: state.user.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('User Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteUser)
  delete(ctx: StateContext<UserStateModel>, { id }: DeleteUser) {
    return this.userService.deleteUser(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetUsers({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('User Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllUser)
  deleteAll(ctx: StateContext<UserStateModel>, { ids }: DeleteAllUser) {
    return this.userService.deleteAllUser(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetUsers({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Users Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ImportUser)
  import(ctx: StateContext<UserStateModel>, action: ImportUser) {
    return this.userService.importUser(action.payload).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetUsers({'page': 1, 'paginate': 15}));
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ExportUser)
  export(ctx: StateContext<UserStateModel>, action: ExportUser) {
    return this.userService.exportUser().pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'users.csv';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateUserAddress)
  createUserAddress(ctx: StateContext<UserStateModel>, action: CreateUserAddress) {
    return this.userService.createUserAddress(action.payload).pipe(
      tap({
        complete:() => {
          this.notificationService.showSuccess('Address Added Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
