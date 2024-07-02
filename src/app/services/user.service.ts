import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { FullUser, Person, User } from '../models/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  user = signal<FullUser | null>(null);

  constructor() {}

  storageUser(user: FullUser) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  extractUser(): FullUser | null {
    const user = localStorage.getItem("user")
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  getUser(email: string) {
    return this.http.get<FullUser>(`${this.baseUrl}/users/email/${email}`).pipe(
      tap((response) => {
        this.user.set(response);
      })
    );
  }

  updatePerson(id: string, person: Person) {
    return this.http.patch<Person>(`${this.baseUrl}/person/${id}`, person).pipe(
      tap((response) => {
        
      })
    );
  }
}
