import { Component, OnDestroy } from "@angular/core";
import { KngxNavbarService } from "kngx-navbar";
import { ReleaseLayer } from "packages/kngx-navbar/src/lib/helpers";



@Component({
    template: `
        <h1>Route 3</h1>
        <a routerLink="/2">To 2</a>
    `,
    styles: [],
    selector: 'app-route3'
})
export class Route3Component  {

    constructor(private navbar: KngxNavbarService){}

    @ReleaseLayer()
    readonly layer = this.navbar.registerNavbarLayer({ title: 'Layer 3' });
}