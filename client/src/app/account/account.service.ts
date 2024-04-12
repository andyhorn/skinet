import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly tokenKey = 'token';
  private readonly baseUrl = environment.apiUrl;
  private readonly currentUserSource = new ReplaySubject<User | null>(1);

  public readonly currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public login(values: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/login`, values).pipe(
      tap((user) => {
        this.setToken(user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  public register(values: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/register`, values).pipe(
      tap((user) => {
        this.setToken(user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  public logout(): void {
    this.deleteToken();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  public checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}account/emailexists?email=${email}`
    );
  }

  public loadCurrentUser(): Observable<User | null> {
    const token = this.getToken();

    if (!token) {
      this.currentUserSource.next(null);
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}account`, { headers }).pipe(
      tap((user) => {
        this.setToken(user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private deleteToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
