import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionBarLayerRegistration, ContextualActionBarService } from 'ngx-contextual-action-bar';

import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'app-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss']
})
export class CustomElementComponent implements OnInit {

  layer!: ActionBarLayerRegistration<SearchBarComponent>;
  searchBar!: SearchBarComponent;

  constructor(
    private service: ContextualActionBarService,
    private router: Router
  ) {
    this.layer = service.register({
      button: 'arrow_back',
      background: '#FFF',
      color: '#000',
      middleElement: SearchBarComponent,
      // actions: [
      //   { displayName: 'Search', icon: 'search' }
      // ]
    })
    this.layer.onButtonClick.subscribe(() => this.router.navigate(['.']))
    this.layer.onCustomElementReady.subscribe(s => {
      this.searchBar = s;
      this.searchBar.searchChange.subscribe((s: string) => console.log('query: ',s))
    })
  }

  ngOnInit(): void {
  }

}
