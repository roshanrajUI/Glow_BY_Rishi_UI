import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-component',
  imports: [CommonModule],
  templateUrl: './field-error-component.html',
  styleUrl: './field-error-component.scss',
})
export class FieldErrorComponent {
  @Input() fieldName = '';
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string {
    if (!this.control || !this.control.errors) {
      return '';
    }

    for (const errorKey in this.control.errors) {
      if (this.control.errors.hasOwnProperty(errorKey)) {
        switch (errorKey) {
          case 'required':
            return `${this.fieldName} is required.`;
          case 'minlength':
            const requiredLength = this.control.errors['minlength'].requiredLength;
            return `${this.fieldName} must be at least ${requiredLength} characters long.`;
          case 'maxlength':
            const maxLength = this.control.errors['maxlength'].requiredLength;
            return `${this.fieldName} cannot exceed ${maxLength} characters.`;
          case 'pattern':
            return `${this.fieldName} has an invalid format.`;
          default:
            return `${this.fieldName} is invalid.`;
        }
      }
    }

    return '';
  }
}
