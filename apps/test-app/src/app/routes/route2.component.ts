import { Component, OnDestroy } from "@angular/core";
import { KngxNavbarService } from "kngx-navbar";

@Component({
    template: `
        <h1>route2</h1>
        <a routerLink="/">To 1</a><br>
        <a routerLink="/3">To 3</a>
    `,
    styles: [],
    selector: 'app-route2'
})
export class Route2Component implements OnDestroy {
    constructor(private navbar: KngxNavbarService){}

    layer = this.navbar.registerNavbarLayer({
        title: 'Route 2'
    })

    ngOnDestroy(): void {
        this.layer.release();
    }
}