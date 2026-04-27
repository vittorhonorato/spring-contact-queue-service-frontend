import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})
export class ContactSearchComponent {
  @Input() loading = false;
  @Output() search = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();

  constructor(private readonly fb: FormBuilder) {}

  readonly form = this.fb.nonNullable.group({
    query: ['', [Validators.required]]
  });

  get canSearch(): boolean {
    return this.form.controls.query.value.trim().length > 0 && !this.loading;
  }

  get canClear(): boolean {
    return this.form.controls.query.value.trim().length > 0 && !this.loading;
  }

  submit(): void {
    const queryControl = this.form.controls.query;
    const query = queryControl.value.trim();
    if (!query) {
      queryControl.markAsTouched();
      return;
    }

    this.search.emit(query);
  }

  clear(): void {
    this.form.reset();
    this.clearSearch.emit();
  }
}
