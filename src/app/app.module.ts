import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {ServiceWorkerService, StateService, WeatherService} from 'services';

@NgModule({
    imports      : [
        BrowserModule,
        routing
    ],
    declarations : [
        AppComponent
    ],
    providers    : [
        HTTP_PROVIDERS,
        appRoutingProviders,
        {provide : LocationStrategy, useClass : HashLocationStrategy},
        ServiceWorkerService,
        StateService,
        WeatherService
    ],
    bootstrap    : [AppComponent]
})
export class AppModule {
}
