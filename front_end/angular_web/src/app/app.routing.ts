/**
 *  app.routing.ts
 *    - Defines the app's routes
 *  
 ******************************************************************************/

/* Importing modules */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Importing custom components */
import { HomeComponent } from './pages/';

/* Defining the app's routes */
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

/* Exporting the module (with all the providers), defining the routes as root */
export const CustomRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
