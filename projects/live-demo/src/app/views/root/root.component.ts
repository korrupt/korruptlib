import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionBarLayerModes, ActionBarLayerRegistration, ContextualActionBarService } from 'ngx-contextual-action-bar';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

  layer: ActionBarLayerRegistration;
  group1: ActionBarLayerRegistration = this.service.register({ group: 'group1', title: 'Fixed', mode: ActionBarLayerModes.fixed, background: '#009A44', color: '#FFF' });
  group2: ActionBarLayerRegistration = this.service.register({ group: 'group2', title: 'Follow', mode: ActionBarLayerModes.follow, background: '#FFF', color: '#000' });
  group3: ActionBarLayerRegistration = this.service.register({ group: 'group3', title: 'Mobile', mode: ActionBarLayerModes.mobile, background: '#333', color: '#FFF' });

  dummyText = [...Array(16)].map(e => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum minima dolore unde ducimus. Quasi voluptatem, unde totam tempore expedita nostrum. Tenetur obcaecati impedit cum ipsum consequatur magnam, pariatur aperiam fugit.')
  
  constructor(
    private service: ContextualActionBarService
  ) {
    this.layer = service.register({
      background: '#FFF',
      color: '#000',
      title: 'Root view',
      button: 'menu',
      actions: [
        { icon: 'share', displayName: 'Del denne siden' }
      ],
      group: 'root',
      mode: ActionBarLayerModes.follow,
      prominent: true
    })
  }

  handleProminentClick(){
    this.layer.setLayer({prominent: !this.layer.layer.prominent})
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.group1.unregister()
    this.group2.unregister()
    this.group3.unregister()
  }

}
