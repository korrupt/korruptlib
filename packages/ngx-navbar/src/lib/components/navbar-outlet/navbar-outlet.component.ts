import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'kngx-navbar-outlet',
  templateUrl: './navbar-outlet.component.html',
  styleUrls: ['./navbar-outlet.component.scss'],
})
export class NavbarOutletComponent {
  constructor(private readonly navbar: NavbarService) {}

  readonly title$ = this.navbar.title$;

}
