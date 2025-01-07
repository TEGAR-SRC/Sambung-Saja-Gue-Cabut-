
export class GetThemes {
   static readonly type = "[Themes] Get";
}

export class UpdateTheme {
   static readonly type = "[Theme] Update";
   constructor(public id: number, public status: number | boolean){}
}

export class GetHomePage {
   static readonly type = "[Home Page] Get";
   constructor(public slug?: {slug: string}) {}
}

export class UpdateHomePage {
   static readonly type = "[Home Page] Put";
   constructor(public id: number, public payload: any) {}
}