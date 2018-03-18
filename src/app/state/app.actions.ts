import { Action } from "@ngrx/store";

export enum AppActionTypes {
    StartAppInitializer = "[AppActipnTypes] Start App Initializer",
    FinishAppInitializer = "[AppActipnTypes] Finish App Initializer",
    LoadUsers = "[AppActipnTypes] Load Users" ,
    UsersLoaded = "[AppActipnTypes] Users Loaded"
}


export class StartAppInitializer implements Action {
    public readonly type = AppActionTypes.StartAppInitializer;
}

export class FinishAppInitializer implements Action {
    public readonly type = AppActionTypes.FinishAppInitializer;
}

export class LoadUsers implements Action {
    public readonly type = AppActionTypes.LoadUsers;
}

export class UsersLoaded implements Action {
    public readonly type = AppActionTypes.UsersLoaded;
    constructor(public readonly payload: Array<any>){}
}

export type AppActions = StartAppInitializer | FinishAppInitializer | LoadUsers | UsersLoaded;