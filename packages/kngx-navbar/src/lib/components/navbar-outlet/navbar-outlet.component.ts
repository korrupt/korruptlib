import { Component, Input } from '@angular/core';
import { KngxNavbarService } from '../../services/navbar.service';

@Component({
  selector: 'kngx-navbar-outlet',
  templateUrl: './navbar-outlet.component.html',
  styleUrls: ['./navbar-outlet.component.scss'],
})
export class KngxNavbarOutletComponent {
  constructor(private readonly navbar: KngxNavbarService) {
    this.title$.subscribe((s) => console.log(s))
  }

  readonly title$ = this.navbar.title$;
  readonly button$ = this.navbar.button$;

  @Input()
  animations = true;
}
