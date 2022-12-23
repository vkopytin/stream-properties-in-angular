import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render contents', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.container form')?.textContent).toBeDefined();
  });

  it(`should update binded field from stream properly`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const value$ = new BehaviorSubject('');
    app.decodedValue$ = value$;
    value$.next('test');

    expect(app.decodedValue).toEqual('test');
  });

  it(`should update stream from binded field properly`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const value$ = new BehaviorSubject('');
    app.decodedValue$ = value$;
    app.decodedValue = 'test'

    expect(value$.getValue()).toEqual('test');
  });
});
