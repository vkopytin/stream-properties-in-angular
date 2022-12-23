# StreamingProperties

It is experimental project. The goal is to show how RxJS stream can be used from angular templates. As element's custom properties/attributes.

With RxJS comes a possibility to synchronse data over streams. Such stream can be declared from service. And it can be used from Angular's component or in template. Usually to accomodate the synchronisation flow of streams with other data/state could lead to many coding.

Here is a small concept. What if we can declare such a property on a control that would accept stream entity. And will listen to data from it.
e.g. 
```
<input input-stream [value$]="decodedValue$" placeholder="Enter value... />
```
Where
 - `[value$]` - is a property holding RxJS stream: `BehaviorSubject` on an element decoreted by `input-stream` decorator.
 - `decodedValue$` - is a property with declared RxJS strea: `BehaviorSubject`. That can be declared from any applicatino's `Service` module.

The project here is example to show the concept. It show how data can be synchronised between properties in a bi-directional data flow.

# How to start

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
