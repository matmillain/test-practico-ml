import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.status.next(true);
  }

  hideLoader() {
    this.status.next(false);
  }
}
