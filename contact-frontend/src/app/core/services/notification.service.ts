import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly toastr: ToastrService) {}

  success(message: string): void {
   this.toastr.success(message);
  }

  error(message: string): void {
    this.toastr.error(message);
  }
}
