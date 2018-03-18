import { AppState } from './app.state';
import { Action } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';
export function appStateReducer(state: AppState = {users: []}, action: AppActions):AppState {
    switch(action.type){
        case AppActionTypes.UsersLoaded: {
            return { ... state, users: action.payload};
        }
        default: {
            return state;
        }
    }
}