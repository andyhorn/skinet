import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export function authGuard(): CanActivateFn {
  return () => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    return accountService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        }

        router.navigate(['/account/login'], {
          queryParams: {
            returnUrl: router.routerState.snapshot.url,
          },
        });

        return false;
      })
    );
  };
}
