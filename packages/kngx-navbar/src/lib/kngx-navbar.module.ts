import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KngxNavbarService } from './services/navbar.service';
import { KngxNavbarOutletComponent } from './components';

@NgModule({
  imports: [CommonModule],
  providers: [KngxNavbarService],
  declarations: [KngxNavbarOutletComponent],
  exports: [KngxNavbarOutletComponent],
})
export class KngxNavbarModule {}
