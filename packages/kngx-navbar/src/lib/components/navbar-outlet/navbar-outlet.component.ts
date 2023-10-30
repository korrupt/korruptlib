import { Component, Input, OnDestroy } from '@angular/core';
import { KngxNavbarService } from '../../services/navbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'kngx-navbar-outlet',
  templateUrl: './navbar-outlet.component.html',
  styleUrls: ['./navbar-outlet.component.scss'],
})
export class KngxNavbarOutletComponent implements OnDestroy {
  constructor(private readonly navbar: KngxNavbarService) {}

  destroy$ = new Subject<void>();

  readonly title$ = this.navbar.title$;
  readonly button$ = this.navbar.button$;

  title?: string | null = null;
  button?: string | null = null;

  titleSub = this.title$.pipe(takeUntil(this.destroy$)).subscribe((title) => this.title = title ? title.value : null);
  buttonSub = this.button$.pipe(takeUntil(this.destroy$)).subscribe((button) => this.button = button ? button.value : null);

  @Input()
  animations = true;

  @Input()
  center = true;

  buttonClicked(id: number): void {
    this.navbar.events.next({ type: 'BUTTON', id });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
