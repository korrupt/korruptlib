import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveAnimation } from './animations/active.animation';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    ActiveAnimation
  ]
})
export class SearchBarComponent implements OnInit {

  private readonly _state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public active$: Observable<boolean> = this._state.asObservable();
  public searchChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('inputel', { static: true }) private el!: ElementRef<HTMLInputElement>;

  handleInput(ev: Event) {
    this.searchChange.emit((<HTMLInputElement>ev.target).value);
  }

  constructor() { }

  ngOnInit(): void {
  }

  setActive(): void {
    this._state.next(true);
    // console.log(this.el);
    
    setTimeout(() => {
      this.el.nativeElement.focus()
    }, 0)
  }

  setInactive(): void {
    this._state.next(false);
  }

}
