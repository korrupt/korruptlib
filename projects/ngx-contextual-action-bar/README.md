# ngx-contextual-action-bar

ngx-contextual-action-bar is an Angular2+ implementation of the [Material Design Contextual Action Bar](https://material.io/components/app-bars-top#contextual-action-bar). The implementation makes it possible to change the action bar properties (i.e. title, actions, color etc.) on the fly, for example when navigating.

PSA: This package is still in the early stages. See my Github repository for planned features and known issues.

## Installation
The package can be installed NPM: 
```bash
npm install ngx-contextual-action-bar
```

## Prerequisites
Because of the way `@angular/material` packages work, which is an obvious dependency, you need to have set a [theme](https://material.angular.io/guide/theming). If not, the ripple-effect wont work. You also need to have the Material Icon font included in your `index.html` -- this is handeled automatically if you used the `ng add @angular/material`-command when installing Angular Material.

## Usage
Make sure to add `ContextualActionBarModule` to your `app.module.ts`. This way, the provided `ContextualActionBarService` is available everywhere in your app.

```typescript
@NgModule({
    ...
    imports: [
        ...
       ContextualActionBarModule 
        ...
    ]
    ...
})
export class AppModule {}
```
Add the Action Bar component to your template:
```HTML
<div class="app">
    <ngx-contextual-action-bar>
        #content here
       <router-outlet></router-outlet>
    </ngx-contextual-action-bar>
</div>
```
If you wish to add a second instance somewhere else in the app, remember to set the `group`-property to something other than `"root"`:
```HTML
<ngx-contextual-action-bar group="tertiary"></ngx-contextual-action-bar>
```
Beware: the parent element (i.e. the element with the "app"-class in this case) needs to have relative positioning, and have a set width and height. The scrolling is happening inside the component. If choose not to use this, the only mode that will work is intended is the `fixed`-mode.
```scss
.app {
    position: relative;
    width: 100%;
    height: 100%;
}
```
The component is now ready for use. It can be accessed within a component via dependency injection. To register a layer, use the `ContextualActionBarService`:
```ts
import { ActionBarLayerRegistration, ContextualActionBarService, ActionBarLayerModes } from 'ngx-contextual-action-bar'; 
...
export class AppComponent implements OnDestroy {
    layer: ActionBarLayerRegistration;
    constructor(private actionBarService: ContextualActionBarService){
        this.layer = actionBarService.register({
            color: '#000',
            background: '#FFF',
            button: 'menu',
            title: 'My app',
            mode: ActionBarLayerModes.follow
        })
        this.layer.onButtonClick.subscribe(s => console.log('do something'))
    }
    
    ngOnDestroy() {
        this.layer.unregister()
    }
}
```

## License
[MIT](https://opensource.org/licenses/mit-license.php)
