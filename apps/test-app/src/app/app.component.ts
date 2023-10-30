import { Component } from '@angular/core';
import { KngxNavbarService } from 'kngx-navbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private navbar: KngxNavbarService) {}

  layer$ = this.navbar.registerNavbarLayer({
    button: 'menu'
  })

  title = 'test-app';
}
