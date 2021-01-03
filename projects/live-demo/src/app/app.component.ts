import { Component } from '@angular/core';
import { ActionBarLayerRegistration, ContextualActionBarService, ActionBarLayerModes } from 'ngx-contextual-action-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live-demo';

  // layer: ActionBarLayerRegistration;

  constructor(
    private service: ContextualActionBarService
  ){
    
  }
}
