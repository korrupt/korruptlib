import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxNavbarOutletComponent } from './ngx-navbar-outlet.component';

describe('NgxNavbarOutletComponent', () => {
  let component: NgxNavbarOutletComponent;
  let fixture: ComponentFixture<NgxNavbarOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxNavbarOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxNavbarOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
