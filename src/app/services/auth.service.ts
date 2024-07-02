import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserToken } from '../models/auth-response.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs/operators';
import { Person, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private baseUrl = "http://localhost:3000/api"
  private tokenService = inject(TokenService)

  constructor() { }

  login(email: string, password: string) {
    return this.http.post<UserToken>(`${this.baseUrl}/users/login`, {email, password}).pipe(tap(response => {
      this.tokenService.saveToken(response.token);
    }))
  }

  register(user: User) {
    return this.http.post<Person>(`${this.baseUrl}/person`, user).pipe(
      switchMap((person: Person) => {
        const newUser = {...user, person: person._id};
        return this.http.post<User>(`${this.baseUrl}/users`, newUser);
      })
    )
  }
}
