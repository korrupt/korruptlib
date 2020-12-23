import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, pairwise, scan } from 'rxjs/operators';

@Directive({
  selector: '[ngxScrollhandler]',
  exportAs: 'scroll'
})
export class ScrollhandlerDirective implements OnDestroy {

  public scrollHeight = fromEvent(this.el.nativeElement, 'scroll').pipe(
    debounceTime(10),
    map(e => {        
      return this.el.nativeElement.scrollTop
    })
  )

  public scrolled$: Observable<number> = this.scrollHeight.pipe(
    pairwise(),
    scan((acc, cur) => {
      const [a, b] = cur;
      if (b > a){
        if (acc < 50) return 0;
      } else {
        if (acc > 50) return 0;
      }
      return acc + (b - a);
    }, 0)
  )

  constructor(
    public el: ElementRef<HTMLElement>
  ) {
    
  }

  ngOnDestroy(){
    
  }

}
