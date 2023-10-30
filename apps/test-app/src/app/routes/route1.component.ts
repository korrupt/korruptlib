import { Component, OnDestroy } from "@angular/core";
import { KngxNavbarService } from "kngx-navbar";

@Component({
    template: `
        <h1>route1</h1>
        <a routerLink="/2">To route 2</a>
    `,
    styles: [],
    selector: 'app-route1'
})
export class Route1Component implements OnDestroy {
    constructor(private navbar: KngxNavbarService){}

    layer = this.navbar.registerNavbarLayer({
        title: 'Route 1'
    })

    ngOnDestroy(): void {
        this.layer.release();
    }
}