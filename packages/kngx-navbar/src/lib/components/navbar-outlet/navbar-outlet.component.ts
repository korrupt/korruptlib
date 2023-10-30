import { Component, Input, OnDestroy } from '@angular/core';
import { KngxNavbarService } from '../../services/navbar.service';
import { Subject, map, takeUntil } from 'rxjs';

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
  readonly theme$ = this.navbar.theme$;

  title?: string | null = null;
  button?: string | null = null;
  theme?: { color: string; background: string } | null = null;

  titleSub = this.title$.pipe(takeUntil(this.destroy$)).subscribe((title) => this.title = title ? title.value : null);
  buttonSub = this.button$.pipe(takeUntil(this.destroy$)).subscribe((button) => this.button = button ? button.value : null);
  themeSub = this.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => this.theme = theme ? theme.value : null);

  color$ = this.theme$.pipe(
    map((theme) => theme && theme.value ? theme.value.color : 'unset')
  )

  background$ = this.theme$.pipe(
    map((theme) => theme && theme.value ? theme.value.background : 'unset')
  )

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
