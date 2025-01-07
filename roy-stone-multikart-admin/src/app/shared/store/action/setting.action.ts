import { AppSetting, Setting } from "../../interface/setting.interface";

export class GetSettingOption {
   static readonly type = "[Setting] Get";
}
 
export class UpdateSettingOption {
   static readonly type = "[Setting] Update";
   constructor(public payload: Setting){}
}

export class TestEmail {
   static readonly type = "[Setting] Test Email Update";
   constructor(public payload: Setting){}
}

export class GetAppSettingOption {
   static readonly type = "[App Setting] Get";
}
 
export class UpdateAppSettingOption {
   static readonly type = "[App Setting] Update";
   constructor(public payload: AppSetting){}
}