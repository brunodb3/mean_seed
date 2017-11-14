/**
 *  app.module.ts
 *    - The main app module file, where Angular starts
 *  
 ******************************************************************************/

/* Importing modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Importing custom components */
import { CustomRouting } from './app.routing';
import { HomeComponent, RootComponent } from './pages/';

/* Importing custom providers */
import { HomeService, RootService } from './pages/';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CustomRouting
  ],
  providers: [
    RootService,
    HomeService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
