import { Option } from "../../interface/theme-option.interface";

export class GetThemeOption {
   static readonly type = "[ThemeOption] Get";
}
 
export class UpdateThemeOption {
   static readonly type = "[ThemeOption] Update";
   constructor(public payload: { options: Option }) { }
}