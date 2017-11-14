/**
 *  root.component.ts
 *    - 'Root' component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* Importing custom providers */
import { RootService } from './root.service';

/* Creating the component */
@Component({
  selector: 'mean-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  /* Class Variables */
  rootText: string = 'Hello Root';

  constructor(
    public router: Router,
    public rootService: RootService
  ) {}

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    console.log("this.rootText", this.rootText);
  }

}
