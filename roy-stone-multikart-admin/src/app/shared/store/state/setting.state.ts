import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { SettingService } from "../../services/setting.service";
import { GetAppSettingOption, GetSettingOption, TestEmail, UpdateAppSettingOption, UpdateSettingOption } from "../action/setting.action";
import { AppValues, Values } from "../../interface/setting.interface";

export class SettingStateModel {
  setting: Values | null;
  appSetting: AppValues | null;
}

@State<SettingStateModel>({
  name: "setting",
  defaults: {
    setting: null,
    appSetting: null
  }
})
@Injectable()
export class SettingState {

  constructor(private settingService: SettingService, 
    private notificationService: NotificationService) {}
  
  @Selector()
  static setting(state: SettingStateModel) {
    return state.setting;
  }
  
  @Selector()
  static appSetting(state: SettingStateModel) {
    return state.appSetting;
  }

  @Action(GetSettingOption)
  getSettingOptions(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getSettingOption().pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            setting: result.values,
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(UpdateSettingOption)
  updateSettingOption(ctx: StateContext<SettingStateModel>, action: UpdateSettingOption) {
    return this.settingService.updateSettingOption(action.payload).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            setting: result.values
          });
        },
        complete:() => {
         this.notificationService.showSuccess('Settings Updated Successfully');
         },
        error: (err) => {
         throw new Error(err?.error?.message);
       },
      })
    );
  }
 
  @Action(TestEmail)
  TestMailSetting(ctx: StateContext<SettingStateModel>, action: TestEmail) {
    return this.settingService.testMail(action.payload).pipe(
      tap({
        error: (err) => {
         throw new Error(err?.error?.message);
       },
      })
    );
  }
  
  @Action(GetAppSettingOption)
  getAppSettingOptions(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getAppSettingOption().pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            appSetting: result.values,
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(UpdateAppSettingOption)
  UpdateAppSettingOption(ctx: StateContext<SettingStateModel>, action: UpdateAppSettingOption) {
    return this.settingService.updateAppSettingOption(action.payload).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            appSetting: result.values
          });
        },
        complete:() => {
         this.notificationService.showSuccess('Settings Updated Successfully');
         },
        error: (err) => {
         throw new Error(err?.error?.message);
       },
      })
    );
  }
}
