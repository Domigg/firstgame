import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { SnowLevelComponent } from './components/snow-level/snow-level.component';
import { GhostLevelComponent } from './components/ghost-level/ghost-level.component';

@NgModule({
  declarations: [
    AppComponent,
    SnowLevelComponent,
    GhostLevelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
