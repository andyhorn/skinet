import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {
  protected error?: any;

  constructor(
    private readonly router: Router,
  ) {
    const navigationExtras = this.router.getCurrentNavigation()?.extras;
    this.error = navigationExtras?.state?.['error'];
  }


}
