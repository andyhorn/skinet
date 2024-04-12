import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label: string | null = null;

  constructor(@Self() private readonly controlDirective: NgControl) {
    this.controlDirective.valueAccessor = this;
  }

  public get control(): FormControl {
    return this.controlDirective.control as FormControl;
  }

  // We do not need any of this functionality
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
