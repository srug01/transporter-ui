import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor(
        private toastr: ToastrService
    ) {}

    // convenience methods
    success(message: string, title: string) {
        this.toastr.success(message,title);
    }
    error(message: string, title: string) {
        this.toastr.error(message,title);
    }
    info(message: string, title: string) {
        this.toastr.info(message,title);
    }
    warn(message: string, title: string) {
        this.toastr.warning(message,title);
    }
}
