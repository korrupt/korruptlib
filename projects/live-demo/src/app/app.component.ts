import { Component } from '@angular/core';
// import { ActionBarLayerRegistration } from 'dist/ngx-contextual-action-bar/lib/layer-registration';
import { ActionBarLayerRegistration, ContextualActionBarService } from 'ngx-contextual-action-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live-demo';

  layer: ActionBarLayerRegistration;

  constructor(
    private service: ContextualActionBarService
  ){
    this.layer = service.register({
      background: '#FFF',
      color: '#000',
      title: 'Live',
      button: 'clear',
      image: false,
      actions: [
        { icon: 'share', displayName: 'Del denne siden' }
      ],
      group: 'root',
      mode: 'mobile',
      prominent: true
    })
    // setTimeout(() => {
    //   this.layer = service.register({
    //     background: '#FFF',
    //     button: 'arrow_back',
    //     color: '#000',
    //     mode: 'mobile'
    //   })
    // }, 1e3)

  }
}
