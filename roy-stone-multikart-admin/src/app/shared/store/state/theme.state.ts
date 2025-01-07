import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { Themes } from "../../interface/theme.interface";
import { ThemeService } from "../../services/theme.service";
import { GetHomePage, GetThemes, UpdateHomePage, UpdateTheme } from "../action/theme.action";

export class ThemesStateModel {
  themes = {
    data: [] as Themes[],
   }
   homePage: any;
}

@State<ThemesStateModel>({
  name: "theme",
  defaults: {
   themes: {
      data: []
   },
   homePage: null
  },
})
@Injectable()
export class ThemeState {

  constructor(private themeService: ThemeService, 
    public notificationService: NotificationService) {}

  @Selector()
  static themes(state: ThemesStateModel) {
    return state.themes;
  }

  @Selector()
  static homePage(state: ThemesStateModel) {
    return state.homePage;
  }

  @Action(GetThemes)
  getThemes(ctx: StateContext<ThemesStateModel>) {
    return this.themeService.getThemes().pipe(
      tap({
        next: (result) => {
         ctx.patchState({
            themes: {
               data: result.data
            },
         });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(UpdateTheme)
  update(ctx: StateContext<ThemesStateModel>, { id, status }: UpdateTheme) {
    return this.themeService.updateTheme(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const themes = [...state.themes.data];
            const index = themes.findIndex(theme => {
              theme.status = false
              theme.id === id
            });
            themes[index] = result;
            ctx.patchState({
              ...state,
              themes: {
                data: themes,
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Theme Changed Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }


 @Action(GetHomePage)
 getHomePage(ctx: StateContext<ThemesStateModel>, action: GetHomePage) {
   return this.themeService.getHomePage(action.slug).pipe(
     tap({
       next: (result) => {
        ctx.patchState({
          homePage:result
        });
       },
       error: (err) => {
         throw new Error(err?.error?.message);
       },
     })
   );
 }

 @Action(UpdateHomePage)
  updateHomePage(ctx: StateContext<ThemesStateModel>, action: UpdateHomePage) {
   return this.themeService.updateHomePage(action.id, action.payload).pipe(
     tap({
       next: (result) => {
         const state = ctx.getState();
         ctx.patchState({
            ...state,
            homePage: result
         });
       },
       complete:() => {
        this.notificationService.showSuccess('Home Page Updated Successfully');
        },
       error: (err) => {
         throw new Error(err?.error?.message);
       },
     })
   );
  }  

}