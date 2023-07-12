import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNavbarModule } from 'ngx-navbar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxNavbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
