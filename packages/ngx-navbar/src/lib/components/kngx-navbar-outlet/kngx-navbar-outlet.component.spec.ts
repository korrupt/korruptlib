import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KngxNavbarOutletComponent } from './kngx-navbar-outlet.component';

describe('NgxNavbarOutletComponent', () => {
  let component: KngxNavbarOutletComponent;
  let fixture: ComponentFixture<KngxNavbarOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KngxNavbarOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KngxNavbarOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
