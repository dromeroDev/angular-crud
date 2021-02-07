import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { SpinnerService } from '@core/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.filterValues$;
  }
}
