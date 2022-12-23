import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const tryExec = <R>(fn: () => R) => {
  try {
    fn();
  } catch (ex) {
    console.error(ex);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faCopy = faCopy;
  decodedValue$ = new BehaviorSubject('');

  get decodedValue(): string {
    return this.decodedValue$.getValue();
  }

  set decodedValue(value: string) {
    if (this.decodedValue$.getValue() !== value) {
      this.decodedValue$.next(value);
    }
  }

  encodedValue$ = new BehaviorSubject('');

  get encodedValue(): string {
    return this.encodedValue$.getValue();
  }

  set encodedValue(value: string) {
    if (this.encodedValue$.getValue() !== value) {
      this.encodedValue$.next(value);
    }
  }

  public currentCount = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.decodedValue$.subscribe(value => {
      this.encodedValue = btoa(value);
    });
    this.encodedValue$.subscribe(value => {
      tryExec(() => this.decodedValue = atob(value));
    });
  }
}
