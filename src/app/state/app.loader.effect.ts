import { Injectable } from "@angular/core";
import { initApplication } from "../app.module";
import { HttpClient } from "@angular/common/http";
import { OnRunEffects, EffectNotification, Actions, Effect } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";
import { AppActionTypes, UsersLoaded } from "./app.actions";
import { exhaustMap, takeUntil, switchMap, map, concatMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
@Injectable() 
export class LoaderEffect implements OnRunEffects {
    
    @Effect()
    loadUser$ = this.actions$.ofType(AppActionTypes.LoadUsers)
        .pipe(
            concatMap(action => {
                return Observable.of([{
                    userId: 1,
                    name: "Some Name"
                }]).delay(6000);
            }),
             map((result: Array<any>) => {
                 console.log(result);
                    return new UsersLoaded(result);
            })
    );

    ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
        return this.actions$.ofType(AppActionTypes.StartAppInitializer)
            .pipe(
                exhaustMap(()=> resolvedEffects$.pipe(
                    takeUntil(this.actions$.ofType(AppActionTypes.FinishAppInitializer))
                ))
            );
    }
    constructor(public actions$: Actions, private httpService: HttpClient){}
}