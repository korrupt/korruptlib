import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KngxNavbarOutletComponent } from './navbar-outlet.component';

describe('NgxKngxNavbarOutletComponent', () => {
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
