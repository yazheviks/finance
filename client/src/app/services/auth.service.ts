import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  token = '';

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken('');
    localStorage.clear();
  }

  login(data: { username: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/auth/login`, data).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  register(data: { username: string, password: string }) {
    return this.http.post<{ token: string }>(`/api/auth/register`, data);
  }
}
