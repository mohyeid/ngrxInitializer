import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appStateReducer } from './state/reducer';
import { AppState } from './state/app.state';
import { StartAppInitializer, LoadUsers, FinishAppInitializer } from './state/app.actions';
import { EffectsModule } from '@ngrx/effects';
import { LoaderEffect } from './state/app.loader.effect';
import { filter, take } from 'rxjs/operators';

export function initApplication(store: Store<AppState>): Function {
  return () => new Promise(resolve => {
    store.dispatch(new StartAppInitializer());
    store.dispatch(new LoadUsers());
    store.select((state: any) => state.appState.users).pipe(
      filter(users =>  users !== null && users !== undefined && users.length > 0),
      take(1)
    ).subscribe((users) => {
      store.dispatch(new FinishAppInitializer());
      resolve(true);
    });
  })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({appState: appStateReducer}),
    EffectsModule.forRoot([LoaderEffect]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    LoaderEffect,
    {
      provide: APP_INITIALIZER, 
      useFactory: initApplication,
      multi: true,
      deps: [[new Inject(Store)]]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
