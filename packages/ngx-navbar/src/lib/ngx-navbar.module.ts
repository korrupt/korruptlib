import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNavbarService } from './services/navbar.service';
import { NgxNavbarOutletComponent } from './components/ngx-navbar-outlet/ngx-navbar-outlet.component';

@NgModule({
  imports: [CommonModule],
  providers: [NgxNavbarService],
  declarations: [NgxNavbarOutletComponent],
  exports: [NgxNavbarOutletComponent],
})
export class NgxNavbarModule {}
