import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarOutletComponent } from './navbar-outlet.component';

describe('NgxNavbarOutletComponent', () => {
  let component: NavbarOutletComponent;
  let fixture: ComponentFixture<NavbarOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
