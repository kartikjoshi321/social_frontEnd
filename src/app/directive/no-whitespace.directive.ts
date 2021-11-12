import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NoWhitespaceValidator } from './no-whitespace.validator';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appNoWhitespace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {

  constructor() { }

  private valFn = NoWhitespaceValidator();
	validate(control: AbstractControl): { [key: string]: any } {
		return this.valFn(control);
	}

}
