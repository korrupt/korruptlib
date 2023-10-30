import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KngxNavbarModule } from 'kngx-navbar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KngxNavbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
