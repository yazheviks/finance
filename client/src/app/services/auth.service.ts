import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  token = localStorage.getItem('auth-token') || '';
  refreshToken = '';

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    console.log('checking if authenticated');
    return !!this.token;
  }

  logout(): void {
    this.setToken('');
    localStorage.clear();
  }

  login(data: { username: string, password: string }): Observable<{ accessToken: string, refreshToken: string }> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(`/api/auth/login`, data).pipe(
      tap(({ accessToken, refreshToken }) => {
        console.log('token in service', accessToken);
        localStorage.setItem('auth-token', accessToken);
        this.setToken(accessToken);
        this.refreshToken = refreshToken;
      })
    );
  }

  register(data: { username: string, password: string }): Observable<{ username: string, password: string }> {
    return this.http.post<{ username: string, password: string }>(`/api/auth/register`, data);
  }

  async refreshTokens(): Promise<void> {
    const tokens = await this.http.post<{ accessToken: string, refreshToken: string }>('/api/auth/refresh-tokens', { refreshToken: this.refreshToken }).toPromise();
    localStorage.setItem('auth-token', tokens.accessToken);
    this.token = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }
}
