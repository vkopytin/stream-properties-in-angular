import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    fixture.detectChanges();

    value$.next('test');

    expect(app.decodedValue).toEqual('test');
  });

  it(`should update stream from binded field properly`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const value$ = new BehaviorSubject('');
    app.decodedValue$ = value$;
    fixture.detectChanges();

    app.decodedValue = 'test'

    expect(value$.getValue()).toEqual('test');
  });

  it(`should update stream from UI properly`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const page = makePage(fixture);
    const app = fixture.componentInstance;
    const value$ = new BehaviorSubject('');
    app.decodedValue$ = value$;
    fixture.detectChanges();

    page.selectInput().value = 'test';
    page.selectInput().dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(value$.getValue()).toEqual('test');
  });

  it(`should update property from UI properly`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const page = makePage(fixture);
    const app = fixture.componentInstance;
    const value$ = new BehaviorSubject('');
    app.encodedValue$ = value$;
    fixture.detectChanges();

    page.selectTextarea().value = 'dGVzdA==';
    page.selectTextarea().dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(value$.getValue()).toEqual('dGVzdA==');
  });
});

const makePage = (fixture: ComponentFixture<AppComponent>) => {
  return {
    selectInput(): HTMLInputElement {
      return fixture.debugElement.query(By.css('input')).nativeElement;
    },
    selectTextarea(): HTMLTextAreaElement {
      return fixture.debugElement.query(By.css('textarea')).nativeElement;
    },
  }
}