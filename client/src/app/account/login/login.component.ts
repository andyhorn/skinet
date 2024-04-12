import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public readonly returnUrl: string;

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const params = this.activatedRoute.snapshot.queryParams;
    this.returnUrl = params['returnUrl'] ?? '/shop';
  }

  public onSubmit(): void {
    const values = this.loginForm.value;
    this.accountService.login(values).subscribe({
      next: (_) => this.router.navigateByUrl(this.returnUrl),
    });
  }
}
