import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Directive({
  selector: '[input-stream]',
})
export class InputStreamComponent implements OnDestroy {
  private _value$ = new BehaviorSubject('');
  private valueSubscribtion: Subscription;

  @Input() get value$(): BehaviorSubject<string> {
    return this._value$;
  }
  set value$(value: BehaviorSubject<string>) {
    if (this._value$ !== value) {
      this._value$ = value;
      this.resetValueChangeSubscribtion();
    }
  }

  @Input() get value() {
    return this.el.nativeElement.value;
  }
  set value(value: string) {
    if (this.el.nativeElement.value !== value) {
      this.updateInputValue(value);
      this.triggerValueChange(value);
    }
  }

  @Output() valueChange = new EventEmitter();

  constructor(private el: ElementRef<HTMLInputElement>) {
    this.valueSubscribtion = this.resetValueChangeSubscribtion();
  }

  ngOnDestroy(): void {
    this.valueSubscribtion.unsubscribe();
  }

  @HostListener('input') onOnput(): void {
    const value = this.el.nativeElement.value;
    this.triggerValueChange(value);
  }

  private triggerValueChange(value: string): void {
    this.valueChange?.emit(value);
    this.value$?.next(value);
  }

  private updateInputValue(value: string): void {
    const selectionStart = this.el.nativeElement.selectionStart;
    this.el.nativeElement.value = value;
    this.el.nativeElement.selectionEnd = value.length;
    this.el.nativeElement.selectionStart = selectionStart;
  }

  private resetValueChangeSubscribtion(): Subscription {
    if (this.valueSubscribtion) {
      this.valueSubscribtion.unsubscribe();
    }

    return this.valueSubscribtion = this._value$.subscribe(value => this.value = value);
  }
}
