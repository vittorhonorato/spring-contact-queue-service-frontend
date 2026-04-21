import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent {
  @Input() loading = false;
  @Output() searchById = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<void>();

  constructor(private readonly fb: FormBuilder) {}

  readonly form = this.fb.nonNullable.group({
    id: ['', [Validators.required]]
  });

  get hasIdValue(): boolean {
    return this.form.getRawValue().id.trim().length > 0;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.form.getRawValue().id.trim();
    this.searchById.emit(id);
  }

  clear(): void {
    this.form.reset();
    this.resetSearch.emit();
  }
}
