/**
 *  index.ts
 *    - Pages barrel definition
 *    - We import every file from every page folder here, so we can import
 *      everything from a single definition
 *
 ******************************************************************************/

/* Exporting the app's pages */

/* Root Page */
export * from './root/root.service';
export * from './root/root.component';

/* Home Page */
export * from './home/home.service';
export * from './home/home.component';