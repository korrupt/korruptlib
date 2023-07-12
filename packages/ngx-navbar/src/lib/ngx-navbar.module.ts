import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNavbarService } from './services/navbar.service';
import { KngxNavbarOutletComponent } from './components/kngx-navbar-outlet/kngx-navbar-outlet.component';

@NgModule({
  imports: [CommonModule],
  providers: [NgxNavbarService],
  declarations: [KngxNavbarOutletComponent],
  exports: [KngxNavbarOutletComponent],
})
export class NgxNavbarModule {}
