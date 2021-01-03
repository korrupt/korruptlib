import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionBarLayerRegistration, ContextualActionBarService } from 'ngx-contextual-action-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transparent',
  templateUrl: './transparent.component.html',
  styleUrls: ['./transparent.component.scss']
})
export class TransparentComponent implements OnInit, OnDestroy {

  layer: ActionBarLayerRegistration = this.service.register({
    background: 'transparent',
    color: '#FFF',
    button: 'arrow_back',
    actions: [
      { icon: 'share', displayName: 'Share this page' }
    ]
  })

  constructor(
    private service: ContextualActionBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.layer.onButtonClick.pipe(take(1)).subscribe(s => {
      this.router.navigate(['/'])
    })
  }

  ngOnDestroy(): void {
    this.layer.unregister();
  }

}
