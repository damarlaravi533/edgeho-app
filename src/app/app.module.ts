import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CustomRowFrozeComponent} from './custom-row-froze/custom-row-froze.component';
import {AgGridModule} from "ag-grid-angular";

@NgModule({
    declarations: [
        AppComponent,
        CustomRowFrozeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AgGridModule.withComponents([]),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
