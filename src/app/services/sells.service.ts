import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Sell } from '../models/sell.model';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SellsService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private baseUrl = 'http://localhost:3000/api';

  user = this.userService.user;

  userSells = signal<Sell[]>([]);

  constructor() {
    const userId = this.user()?._id;
    if (typeof userId === 'string') {
      this.getAllSellsbyUser(userId);
    }
  }

  createSell(sell: Sell) {
    return this.http.post<Sell>(`${this.baseUrl}/sell`, sell).pipe(
      tap((response) => {
        const userId = this.user()?._id;
        if (typeof userId === 'string') {
          this.getAllSellsbyUser(userId);
        }
      })
    );
  }

  getAllSellsbyUser(userId: string) {
    return this.http.get<Sell[]>(`${this.baseUrl}/sell/user/${userId}`).pipe(
      tap((response) => {
        console.log(response);
        
        this.userSells.set(response);
      })
    );
  }

}
