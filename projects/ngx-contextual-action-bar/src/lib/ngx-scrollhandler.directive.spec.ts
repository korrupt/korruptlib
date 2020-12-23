
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ScrollhandlerDirective } from './ngx-scrollhandler.directive';

import { fakeSchedulers } from "rxjs-marbles/jasmine/angular";
import { By } from '@angular/platform-browser';

@Component({
  template: `<div #c ngxScrollhandler class="upper"><p>a</p></div>`,
  styles: [
    'div { height: 50px; overflow-y: scroll }',
    'p {  height: 1000px; margin: 0 }'
  ]
})
class TestComponent implements OnInit {
  constructor(){}

  @ViewChild(ScrollhandlerDirective, { static: true }) scroll!: ScrollhandlerDirective;
  @ViewChild('c', { read: ElementRef, static: true }) c!: ElementRef<HTMLElement>;

  ngOnInit(){    
  }
}

describe('DmlScrollhandlerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: ScrollhandlerDirective;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollhandlerDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance;
    directive = component.scroll;
    fixture.detectChanges()
    component.ngOnInit()
  })
  
  it('should create a directive', () => {
    fixture.detectChanges()
    expect(component).toBeDefined()
    expect(directive).toBeDefined()
  })

  it('should listen to scroll event', fakeSchedulers(() => {
    let received: number | undefined;
    directive['scrollHeight'].subscribe(value => received = value);
    
    fixture.detectChanges()
    tick(50);
    expect(received).not.toBeDefined()

    directive.el.nativeElement.dispatchEvent(new Event('scroll'))
    tick(50);
    expect(received).toBeDefined()
    expect(received).toEqual(0)
    
  }))

});
