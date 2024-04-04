import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {
  protected baseUrl = environment.apiUrl;
  protected errors: string[] = [];

  constructor(
    private readonly http: HttpClient,
  ) { }

  public get404Error(): void {
    this.http.get(`${this.baseUrl}products/99999`).subscribe({
      next: response => console.log(response),
      error: error => console.error(error),
    });
  }

  public get500Error(): void {
    this.http.get(`${this.baseUrl}buggy/servererror`).subscribe({
      next: response => console.log(response),
      error: error => console.error(error),
    });
  }

  public get400Error(): void {
    this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe({
      next: response => console.log(response),
      error: error => console.error(error),
    });
  }

  public get400ValidationError(): void {
    this.http.get(`${this.baseUrl}products/fortytwo`).subscribe({
      next: response => console.log(response),
      error: error => {
        console.error(error);
        this.errors = error.errors;
      },
    });
  }
}
