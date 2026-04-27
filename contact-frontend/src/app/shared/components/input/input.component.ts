import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = 'Input';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() multiline = false;
  @Input() rows = 4;

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.updateValue(target.value);
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.updateValue(target.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  private updateValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

}
